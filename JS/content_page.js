window.addEventListener('scroll', function() {
    const scrollImage = document.getElementById('scrollImage');

    if (window.scrollY > 50) { // Change 50 to the scroll distance at which you want the color to change
        scrollImage.style.display = 'block'; // Show the image

    } else {
        scrollImage.style.display = 'none'; // Hide the image
    }   
});

document.getElementById('scrollImage').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top of the page
});


