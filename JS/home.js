// Add an event listener for the 'scroll' event on the window
window.addEventListener('scroll', function() {
    const scrollImage = document.getElementById('scrollImage'); // Get the element with the ID 'scrollImage'

    // Check if the page has been scrolled down more than 50 pixels
    if (window.scrollY > 50) { // Change 50 to the scroll distance at which you want the color to change
        scrollImage.style.display = 'block'; // Show the image

    } else {
        scrollImage.style.display = 'none'; // Hide the image
    }
});

//Add an event listener for the 'click' event on the element with the ID 'scrollImage'
document.getElementById('scrollImage').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top of the page
});


