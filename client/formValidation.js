document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn").addEventListener("click", validateForm);
    document.getElementById("downloadBtn").addEventListener("click", downloadData);

});

function validateForm(event) {
    event.preventDefault(); // Prevent form submission if validation fails

    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value; 
    var contact = document.getElementById("contact").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
    var favoriteFood = document.querySelectorAll('input[name="food"]:checked');
    var moviesRating = document.querySelector('input[name="movies"]:checked');
    var radioRating = document.querySelector('input[name="radio"]:checked');
    var eatOutRating = document.querySelector('input[name="eat_out"]:checked');
    var watchTvRating = document.querySelector('input[name="watch_tv"]:checked');

    // Validate full name
    if (fullName.trim() === "") {
        showAlert("Please enter your full name.");
        return;
    }

    // Validate email
    if (!validateEmail(email) || email.trim() === "") {
        showAlert("Please enter a valid email address.");
        return;
    }

    // Validate contact number
    if (!validatePhoneNumber(contact)) {
        showAlert("Please enter a valid contact number.");
        return;
    }

    // Prevent form submission
    if (dateOfBirth === '') {
        showAlert("Please enter your date of birth.");
        return false;
    }

    // Validate date of birth
    var selectedDate = new Date(dateOfBirth);
    var currentDate = new Date();
    var age = calculateAge(selectedDate);

    if (age < 5 || age > 120) {
        showAlert("Age must be between 5 and 120.");
        return;
    }

    // Validate favorite food selection
    if (favoriteFood.length === 0) {
        showAlert("Please select at least one favorite food.");
        return;
    }

    // Validate ratings selection
    if (!moviesRating || !radioRating || !eatOutRating || !watchTvRating) {
        showAlert("Please rate all items.");
        return;
    }

    showAlert("Form submitted successfully!", "green");
    resetForm(); // Clear form data
}

function showAlert(message, color = "red") {
    alert(message); 
}

function validateEmail(email) {
    // Regular expression for email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhoneNumber(phoneNumber) {
   // Regular expression for phone number validation with leading zero
   var phonePattern = /^0\d{9}$/;
    return phonePattern.test(phoneNumber);
}

function calculateAge(birthDate) {
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

 // clear  all form fields after submission
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("dateOfBirth").value = "";
    var favoriteFoodOptions = document.querySelectorAll('input[name="food"]');
    favoriteFoodOptions.forEach(function (option) {
        option.checked = false;
    });
    var ratingOptions = document.querySelectorAll('input[type="radio"]');
    ratingOptions.forEach(function (option) {
        option.checked = false;
    });
}
function downloadData() {
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
    var contact = document.getElementById("contact").value;
    var favoriteFoodInputs = document.querySelectorAll('input[name="food"]:checked');
    var favoriteFoods = Array.from(favoriteFoodInputs).map(input => input.value).join(', ');
    var moviesRating = document.querySelector('input[name="movies"]:checked').value;
    var radioRating = document.querySelector('input[name="radio"]:checked').value;
    var eatOutRating = document.querySelector('input[name="eat_out"]:checked').value;
    var watchTvRating = document.querySelector('input[name="watch_tv"]:checked').value;

    // Create a text string with the data
    var dataString = `Full Name: ${fullName}\nEmail: ${email}\nDate of Birth: ${dateOfBirth}\nContact Number: ${contact}\nFavorite Foods: ${favoriteFoods}\nMovies Rating: ${moviesRating}\nRadio Rating: ${radioRating}\nEat Out Rating: ${eatOutRating}\nWatch TV Rating: ${watchTvRating}`;

    // Create a Blob object with the data
    var blob = new Blob([dataString], { type: "text/plain;charset=utf-8" });

    // Create a temporary URL for the Blob
    var url = URL.createObjectURL(blob);

    // Create a temporary link element
    var link = document.createElement("a");
    link.href = url;
    link.download = "survey_data.txt"; // Filename for the downloaded file

    // Append the link to the DOM and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up: remove the temporary link and URL object
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}