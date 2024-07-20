//Handles the click events on the images in the gallery to show a popup
document.querySelectorAll('.gallery_container .image_box img').forEach(image => {

    //Attaching a click event handler to each image
    image.onclick = () => {

        //Getting the reference to the elements inside the popup panel
        const popup = document.querySelector('.popup-image');
        const popupImage = popup.querySelector('img');
        const description = popup.querySelector('.description');
        const colorPicker = popup.querySelector('.color-picker');
        const fontStylePicker = popup.querySelector('.font-style-picker');
        
        //Displaying the popup image in flex
        popup.style.display = 'flex';

        //Setting the image source for the popup
        popupImage.src = image.src;

        //Setting the description text by getting it from the data-description attribute of the respective clicked image
        description.textContent = image.getAttribute('data-description');

        // Showing the  color picker and font style picker
        colorPicker.style.display = 'block';
        fontStylePicker.style.display = 'block';
    }
});

// Closing the popup when the close button is being clicked
document.querySelector('.popup-image span').onclick = () => {
    document.querySelector('.popup-image').style.display = 'none';
};

// Handling the click events on the colour options
document.querySelectorAll('.color-option').forEach(option => {
    option.onclick = () => {

        //Getting the main popup content container
        const popupContent = document.querySelector('.popup-content');

        //Setting the background colour of the popup content based on the colour option being clicked
        popupContent.style.backgroundColor = option.style.backgroundColor;
    };
});

// Font style options
document.querySelectorAll('.font-style-option').forEach(option => {
    option.onclick = () => {

        //getting the respective description element inside the popup
        const description = document.querySelector('.description');

        //Setting the font family of the description based on the "data-font-style" attribute of the clicked option
        description.style.fontFamily = option.getAttribute('data-font-style');
    };
});


//Showing or hiding the footer based on scroll position
window.addEventListener('scroll', function() {

    //getting the footer element
    var footer = document.getElementById('myFooter');

    //getting the current scroll position
    var scrollPosition = window.scrollY;

    //getting the dimensions of the window and document 
    var windowHeight = window.innerHeight;
    var documentHeight = Math.max(
        document.documentElement.scrollHeight, 
        document.body.scrollHeight,
        document.documentElement.clientHeight
    );

    //Calculatig the distance to the bottom of the page
    var distanceToBottom = documentHeight - (scrollPosition + windowHeight);

    //Threshold to show the footer
    var threshold = 100;


    if (distanceToBottom <= threshold) {
        //Showing the footer if scrolled is close to the bottom
        footer.style.display = 'block'; 
    } else {
        //Hiding the footer if the scrolled is not closer to the bottom
        footer.style.display = 'none'; 
    }
});

// Wait for the page to be fully loaded before executing the code
window.addEventListener('load', function() {
    // Scroll a bit to trigger the scroll event and hide the footer initially
    window.scrollBy(0, 1);
}); 




