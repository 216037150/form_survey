// index.js
const express = require("express");
const connectToDB = require("./db"); // Import the database connection module

const app = express();
const PORT = 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// Example route to test MongoDB connection
app.get("/", async (req, res) => {
    try {
        const db = await connectToDB();
        const collection = db.collection("Survey");

        // Perform database operations here

        res.send("Connected to MongoDB and performed operations.");
    } catch (error) {
        res.status(500).send("Error connecting to MongoDB.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
