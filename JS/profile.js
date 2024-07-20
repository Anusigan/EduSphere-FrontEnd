document.addEventListener('DOMContentLoaded', () => {
    // Select elements needed for the profile form functionality
    const steps = document.querySelectorAll('.step');  // Select all elements with the class 'step'
    const progress = document.querySelector('.progress');  // Select the progress bar element
    const progressLabel = document.getElementById('progress-label');  // Select the progress label element
    const outputContent = document.getElementById('output-content');  // Select the output content element
    const modal = document.getElementById('confirmation-modal');  // Select the confirmation modal element
    const confirmBtn = document.getElementById('confirm-btn');  // Select the confirm button in the modal
    const backBtn = document.getElementById('back-btn');  // Select the back button in the modal
    const nextBtns = document.querySelectorAll('.next-btn');  // Select all elements with the class 'next-btn'
    const prevBtns = document.querySelectorAll('.prev-btn');  // Select all elements with the class 'prev-btn'
    const skipBtns = document.querySelectorAll('.skip-btn');  // Select all elements with the class 'skip-btn'
    const finishBtn = document.querySelector('.finish-btn');  // Select the element with the class 'finish-btn'

    // Constants
    const totalSteps = steps.length;  //Total number of steps
    const totalQuestions = 12;  //Total number of questions
    const requiredFields = [
        'prompt-1-1', 
        'prompt-1-2', 
        'prompt-1-3', 
        'prompt-1-4', 
        'prompt-2-1', 
        'prompt-3-1', 
        'prompt-3-4'
    ];  //Array of required fields
    const questionTexts = {
        'prompt-1-1': 'Your Name',
        'prompt-1-2': 'Your Preferred Username',
        'prompt-1-3': 'Your Age',
        'prompt-1-4': 'Your Gender',
        'prompt-2-1': 'Your Current School/University',
        'prompt-2-2': 'Field of Study',
        'prompt-2-3': 'Your Degree',
        'prompt-2-4': 'Year of Graduation',
        'prompt-3-1': 'Your Email',
        'prompt-3-2': 'Your Contact Number',
        'prompt-3-3': 'Hours Available for Study Per Week',
        'prompt-3-4': 'Preferred Study Method'
    };  //Object mapping question IDs to their text descriptions

    // Variables to track current step and question, and store profile data
    let currentStep = 0;  //Current step index
    let currentQuestion = 1;  //Current question index
    let profileData = {};  //Object to store user input data
    let handledQuestions = new Set();  //Set to track handled questions

    // Function to update the progress bar
    const updateProgress = () => {
        const progressPercent = (handledQuestions.size / totalQuestions) * 100;  //Calculate progress percentage
        progress.style.width = `${progressPercent}%`;  //Update the width of the progress bar
        progressLabel.textContent = `Profile completed: ${Math.round(progressPercent)}%`;  //Update the progres lable
    };

    // Function to show the current step
    const showStep = (index) => {
        steps.forEach(step => step.style.display = 'none');  //Hide all the steps
        steps[index].style.display = 'block';  //Display the current step
        updateProgress();  //Update the progress bar
    };

    // Function to show the current question within the step
    const showQuestion = (step, question) => {
        const prompts = steps[step].querySelectorAll('.prompt');  //Select all prompts in the current step
        prompts.forEach(prompt => prompt.style.display = 'none');  //Hide all the prompt
        document.getElementById(`prompt-${step + 1}-${question}`).style.display = 'block';  //Display thr current prompt
    };

    // Function to collect data from the input fields
    const collectData = (step, question, skipped = false) => {
        const input = document.getElementById(`prompt-${step + 1}-${question}`).querySelector('.prompt-input');  //Select the input field of the current prompt
        const questionKey = `prompt-${step + 1}-${question}`;  //Create a key for the current prompt
        profileData[questionKey] = skipped ? "" : input.value;  //Store the input value or an empty string if skipped
        handledQuestions.add(questionKey);  // Add the current prompt to the set of handled questions
    };

    // Function to display the collected data in the output section
    const displayOutput = () => {
        outputContent.innerHTML = '';  //Clear the output content
        Object.entries(profileData).forEach(([key, value]) => {
            const p = document.createElement('p');  //Create a new paragraph element
            p.textContent = `${questionTexts[key]}: ${value}`;  //Set the text content of the paragraph
            outputContent.appendChild(p);  //Append the paragraph to the output content
        });
    };

    // Function to validate the input based on its type
    const validateInput = (input, type) => {
        const patterns = {
            name: /^[a-zA-Z\s]+$/,
            username: /^[a-zA-Z0-9]+$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            contact: /^\d{10}$/,
            age: /^[1-9]\d*$/
        };  // Regular expressions for different input types
        const pattern = patterns[type];  // Select the pattern based on the input type
        
        if (pattern && !pattern.test(input.value)) {
            input.style.border = '2px solid red';  //Set the border color to red if the input is invalid
            return false;
        }
        input.style.border = '';  //Reset the border color if the input is valid
        return true;
    };

    // Function to handle navigation between steps and questions
    const handleNavigation = (step, question, isNext = true, isSkip = false) => {
        const questionKey = `prompt-${step + 1}-${question}`;
        const input = document.getElementById(`prompt-${step + 1}-${question}`).querySelector('.prompt-input');

        // Validate required fields
        if ((isNext || isSkip) && requiredFields.includes(questionKey) && !input.value) {
            input.style.border = '2px solid red';
            return;
        }

        // Validate input format
        const inputTypes = {
            'name': 'name',
            'username': 'username',
            'email': 'email',
            'contact': 'contact',
            'age': 'age',
            'gender': 'name',
            'study-method': 'name'
        };

        if (isNext || isSkip) {
            const inputType = inputTypes[input.id];
            if (inputType && !validateInput(input, inputType)) return;
            collectData(step, question, isSkip);
        }

        // Update current step and question
        if (isNext) {
            currentQuestion++;
            if (currentQuestion > 4) {
                currentStep++;
                currentQuestion = 1;
            }
        } 
        else {
            currentQuestion--;
            if (currentQuestion < 1) {
                currentStep--;
                currentQuestion = 4;
            }
        }

        // Show the current step and question
        if (currentStep < totalSteps) {
            showStep(currentStep);
            showQuestion(currentStep, currentQuestion);
        } 
        else {
            updateProgress();
        }
        displayOutput();
    };

    // Event listeners for the navigation buttons
    nextBtns.forEach(btn => btn.addEventListener('click', event => {
        event.preventDefault();
        const step = parseInt(btn.getAttribute('data-step'));
        const question = parseInt(btn.getAttribute('data-question'));
        handleNavigation(step - 1, question, true, false);
    }));


    prevBtns.forEach(btn => btn.addEventListener('click', event => {
        event.preventDefault();
        const step = parseInt(btn.getAttribute('data-step'));
        const question = parseInt(btn.getAttribute('data-question'));
        handleNavigation(step - 1, question, false, false);
    }));


    skipBtns.forEach(btn => btn.addEventListener('click', event => {
        event.preventDefault();
        const step = parseInt(btn.getAttribute('data-step'));
        const question = parseInt(btn.getAttribute('data-question'));
        handleNavigation(step - 1, question, true, true);
    }));

    // Event listener for the finish button
    finishBtn.addEventListener('click', event => {
        event.preventDefault();
        const step = parseInt(finishBtn.getAttribute('data-step'));
        const question = parseInt(finishBtn.getAttribute('data-question'));
        const questionKey = `prompt-${step}-${question}`;
        const input = document.getElementById(`prompt-${step}-${question}`).querySelector('.prompt-input');

        // Validate required fields
        if (requiredFields.includes(questionKey) && !input.value) {
            input.style.border = '2px solid red';
            return;
        }

        // Validate input format
        const inputType = {
            'name': 'name',
            'username': 'username',
            'email': 'email',
            'contact': 'contact',
            'age': 'age',
            'gender': 'name',
            'study-method': 'name'
        }[input.id];

        if (inputType && !validateInput(input, inputType)) return;

        collectData(step - 1, question);
        updateProgress();
        displayOutput();
        modal.style.display = 'flex';
    });

    // Event listener for the confirm button in the modal
    confirmBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        alert("Profile created successfully!");
    });

    // Event listener for the back button in the modal
    backBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Initialize the first step and first question
    showStep(currentStep);
    showQuestion(currentStep, currentQuestion);
});
