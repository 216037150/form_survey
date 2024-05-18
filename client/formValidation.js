document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("personalForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        const fullName = form.fullName.value.trim();
        const email = form.email.value.trim();
        const contact = form.contact.value.trim();
        const dateOfBirth = form.dateOfBirth.value.trim();
        const favoriteFood = Array.from(document.querySelectorAll('input[name="food"]:checked')).map(option => option.value);
        const moviesRating = form.movies.value;
        const radioRating = form.radio.value;
        const eatOutRating = form.eat_out.value;
        const watchTvRating = form.watch_tv.value;

        
        // Validate full name
        if (fullName === "") {
            showAlert("Please enter your full name.");
            return;
        }

        // Validate email
        if (!validateEmail(email)) {
            showAlert("Please enter a valid email address.");
            return;
        }

        // Validate date of birth
        const selectedDate = new Date(dateOfBirth);
        const age = calculateAge(selectedDate);

        if (age < 5 || age > 120) {
            showAlert("Age must be between 5 and 120.");
            return;
        }

        // Validate contact number
        if (!validatePhoneNumber(contact)) {
            showAlert("Please enter a valid contact number.");
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

        const surveyData = {
            fullName,
            email,
            contact,
            dateOfBirth,
            favoriteFoods: favoriteFood,
            movies: moviesRating,
            radio: radioRating,
            eat_out: eatOutRating,
            watch_tv: watchTvRating,
        };

        try {
            const response = await fetch("http://localhost:3002/surveys", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(surveyData),
            });

            const data = await response.json();
            alert(data.message); // Show server response
            form.reset(); // Clear form fields after successful submission
        } catch (error) {
            console.error("Error:", error);
            alert("Error saving survey");
        }
    });
});


// Validation functions
function showAlert(message, color = "red") {
    alert(message);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const phonePattern = /^0\d{9}$/;
    return phonePattern.test(phoneNumber);
}

function calculateAge(birthDate) {
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
