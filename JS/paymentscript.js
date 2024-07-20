// Function to validate the payment form
function validateForm() {
    let fullName = document.forms["paymentForm"]["fullName"].value;
    if (!validateText(fullName, "full name", "Please enter a valid full name (minimum 2 characters, only letters, spaces, or hyphens allowed)"))
        return false;

    let email = document.forms["paymentForm"]["email"].value;
    if (!validateEmail(email, "email", "Please enter a valid email address")) return false;

    let address = document.forms["paymentForm"]["address"].value;
    if (!validateaddress(address, "address", "Please enter a valid address")) return false;

    let city = document.forms["paymentForm"]["city"].value;
    if (!validateText(city, "city", "Please enter a valid city name")) return false;

    let district = document.forms["paymentForm"]["district"].value;
    if (!validateText(district, "district", "Please enter a valid district name")) return false;

    let postCode = document.forms["paymentForm"]["postCode"].value;
    if (!validateDigits(postCode, "postal code", "Please enter a valid postal code (only digits allowed)")) return false;

    let cardName = document.forms["paymentForm"]["cardName"].value;
    if (!validateText(cardName, "card name", "Please enter a valid name on the card")) return false;

    let cardNo = document.forms["paymentForm"]["cardNo"].value;
    if (!validateDigits(cardNo, "card number", "Please enter a valid card number (only digits allowed)")) return false;

    let expMonth = document.forms["paymentForm"]["expMonth"].value;
    if (!validateMonth(expMonth, "expiration month", "Please enter a valid expiration month (January to December)")) return false;

    let expYear = document.forms["paymentForm"]["expYear"].value;
    if (!validateDigits(expYear, "expiration year", "Please enter a valid expiration year (only digits allowed)")) return false;

    let cvv = document.forms["paymentForm"]["cvv"].value;
    if (!validateDigits(cvv, "CVV", "Please enter a valid CVV (only digits allowed)")) return false;

    const formContainer = document.querySelector('.Eduform-container');
    formContainer.style.display = 'hidden';

    showConfirmationMessage();

    return false;
}

// Function to show confirmation message
function showConfirmationMessage() {
    const confirmationMessage = document.querySelector('.Educonfirmation-message');
    confirmationMessage.style.display = 'block';
}

// Function to validate text input
function validateText(input, fieldName, errorMessage) {
    let regex = /^[a-zA-Z\s-]{2,}$/;
    if (input === "" || !regex.test(input)) {
        alert(errorMessage);
        return false;
    }
    return true;
}

// Function to validate address
function validateaddress(input, fieldName, errorMessage) {
    let addressRegex = /^[a-zA-Z0-9\s,\/]{2,}$/;
    if (input === "" || !addressRegex.test(input)) {
        alert(errorMessage);
        return false;
    }
    return true;
}

// Function to validate digits input
function validateDigits(input, fieldName, errorMessage) {
    let regex = /^\d+$/;
    if (input === "" || !regex.test(input)) {
        alert(errorMessage);
        return false;
    }
    return true;
}

// Function to validate email input
function validateEmail(input, fieldName, errorMessage) {
    let email = input.trim();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !regex.test(email)) {
        alert(errorMessage);
        return false;
    }
    return true;
}

// Function to validate month input
function validateMonth(input, fieldName, errorMessage) {
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const inputLowerCase = input.trim().toLowerCase(); // Convert input to lowercase and trim whitespace

    if (!months.includes(inputLowerCase)) {
        alert(errorMessage);
        return false;
    }
    return true;
}


