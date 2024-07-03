# form_survey

## Project Overview: Survey Application
Project Structure

This project is a full-stack web application that allows users to fill out a survey form, submit their responses, and view the collected data. It consists of a backend server built with Node.js and Express, a MongoDB database to store survey responses, and a frontend with HTML, CSS, and JavaScript.
Backend (Node.js and Express)

    Server Setup:
        Dependencies: The server uses express for handling HTTP requests and mongodb for database interactions.
        Environment Variables: Configuration is done using environment variables for the MongoDB URI and database name, with fallbacks to default values.

    Database Connection:
        The MongoClient is used to connect to the MongoDB database.
        Database name: FormSurvey
        Collection name: CollectedData

    API Endpoints:
        POST /form: Handles form submission by inserting the submitted data into the MongoDB collection.
        GET /formData: Retrieves all the form data stored in the MongoDB collection.

    Static Files:
        The server serves static files from the client directory, allowing the frontend to be loaded.

Frontend (HTML, CSS, and JavaScript)

    HTML Structure:
        Form Page (index.html): Contains the survey form where users input their personal details and preferences.
        Data Display Page (displayData.html): Displays the collected survey data in a table format.

    Form Validation and Submission:
        JavaScript is used to validate the form fields before submission, ensuring all required fields are filled out and valid.
        On successful validation, form data is collected and sent to the server using the Fetch API.

    Data Display:
        JavaScript is used to fetch the survey data from the server and dynamically populate the table in displayData.html.

    Additional Features:
        Form Validation: Ensures fields like full name, email, contact number, and date of birth are correctly filled.
        Favorite Food Selection: Allows users to select multiple favorite foods.
        Survey Rating: Users rate their agreement on various statements.
        Form Reset: After successful submission, the form fields are reset.
        Download Data: Users can download the survey data as a text file.

Additional Utility Functions

    Database Utility:
        Functions like connectDB, getTotalSurveys, and getAverageAge handle database interactions, such as connecting to MongoDB, counting the total number of surveys, and calculating the average age of respondents.

    Frontend Utility:
        Functions for form validation, calculating age, and resetting the form are implemented to enhance user experience and ensure data integrity.
