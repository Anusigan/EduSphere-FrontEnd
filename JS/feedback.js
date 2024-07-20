// Wait for the DOM content to be fully loaded before executing the script
const feedbackForm = document.getElementById('feedback-form'); // Get the feedback form element by its ID
const previewSection = document.getElementById('preview-section');// Get the preview section element by its ID
const popup = document.getElementById('popup');// Get the popup element by its ID

feedbackForm.addEventListener('submit', function() { // Add an event listener for the form submission event
    if (validateForm()) {  // If valid, show the preview
        showPreview();
    }
});

    function validateForm() { // Function to validate the form inputs
        let isValid = true;// Initialize the validity flag
        const name = document.getElementById('name').value.trim(); // Get the name input value
        const email = document.getElementById('email').value.trim();// Get the email input value
        const age = document.getElementById('age').value;// Get the age input value
        const contentQuality = document.querySelector('input[name="content-quality"]:checked'); // Get the checked value of content quality rating
        const contentRelevance = document.querySelector('input[name="content-relevance"]:checked'); // Get the checked value of content relevance rating
        const designRating = document.querySelector('input[name="design-rating"]:checked'); // Get the checked value of design rating
        const navigationEase = document.querySelector('input[name="navigation-ease"]:checked');// Get the checked value of navigation ease rating
        const feedbackmechanism = document.querySelector('input[name="feedback-mechanism"]:checked');// Get the checked value of feedback mechanism rating
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
        
        // Validate each form field and show alerts if invalid
        if (!name) {
            isValid = false;
            alert("Please enter your name.");
        }else if (!email || !emailRegex.test(email)) {
            isValid = false;
            alert("Please enter a valid email address.");
        } else if (!age || age < 0 || age > 120) {
            isValid = false;
            alert("Please enter a valid age.");
        } else if (!contentQuality) {
            isValid = false;
            alert("Please rate the quality of the content.");
        } else if (!contentRelevance) {
            isValid = false;
            alert("Please specify if the content is relevant to your needs.");
        } else if (!designRating) {
            isValid = false;
            alert("Please rate the overall design of the website.");
        } else if (!navigationEase) {
            isValid = false;
            alert("Please rate how easy it is to navigate the website.");
        } else if (!feedbackmechanism) {
             isValid = false;
             alert("Please rate the effectiveness of our feedback mechanism.");
        }

        return isValid;// Return the validity flag
    }

     // Function to show the preview of the form data
    function showPreview() {
        const name = document.getElementById('name').value.trim();// Get the name input value
        const email = document.getElementById('email').value.trim();// Get the email input value
        const age = document.getElementById('age').value;// Get the age input value
        const visit = document.getElementById('visit').value;// Get the visit input value
        const contentQuality = document.querySelector('input[name="content-quality"]:checked').value; // Get the checked value of content quality rating
        const contentRelevance = document.querySelector('input[name="content-relevance"]:checked').value;// Get the checked value of content relevance rating
        const designRating = document.querySelector('input[name="design-rating"]:checked').value; // Get the checked value of design rating
        const navigationEase = document.querySelector('input[name="navigation-ease"]:checked').value;  // Get the checked value of navigation ease rating
        const feedbackmechanism = document.querySelector('input[name="feedback-mechanism"]:checked').value; // Get the checked value of feedback mechanism rating
        const improvementSuggestions = document.getElementById('improvement-suggestions').value.trim();  // Get the improvement suggestions input value

        // Set the preview section text content for each form field
        document.getElementById('preview-name').textContent = name;
        document.getElementById('preview-email').textContent = email;
        document.getElementById('preview-age').textContent = age;
        document.getElementById('preview-visit').textContent = visit;
        document.getElementById('preview-content-quality').textContent = contentQuality;
        document.getElementById('preview-content-relevance').textContent = contentRelevance;
        document.getElementById('preview-design-rating').textContent = designRating;
        document.getElementById('preview-navigation-ease').textContent = navigationEase;
        document.getElementById('preview-feedback-mechanism').textContent = feedbackmechanism;
        document.getElementById('preview-improvement-suggestions').textContent = improvementSuggestions;

        
        document.getElementById("fcontent").style.display = "none"; // Hide the form content
        previewSection.style.display = 'block';// Show the preview section
    }

     // Function to edit the form data
    window.editForm = function() {
        document.getElementById("fcontent").style.display = "block";// Show the form content
        previewSection.style.display = 'none'; // Hide the preview section
    }

     // Function to confirm form submission
    window.confirmSubmission = function() {
        popup.style.display = 'block';// Show the popup
        setTimeout(redirectToHome, 7000); // Redirect to home after 7 seconds
    }

    // Function to redirect to the home page
    window.redirectToHome = function() {
        window.location.href = './home.html';// Redirect to Home.html
    }
