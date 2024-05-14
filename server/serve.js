const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 3002; // Use environment variable or default port

app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/";
const db = process.env.DB_NAME || "Survey";
const collectionName = "SurveyData";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function startServer() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB");

        const database = client.db(db);
        const collection = database.collection(collectionName);

        app.post("/surveys", (req, res) => {
            const surveyData = req.body;

            collection.insertOne(surveyData, (err, result) => {
                if (err) {
                    console.error("Failed to insert data", err);
                    return res.status(500).json({ message: "Error saving survey", error: err });
                }
                console.log("Data inserted to database", result.insertedCount);
                return res.status(201).json({ message: "Survey saved successfully!" });
            });
        });

        app.listen(PORT, () => {
            console.log(`The server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

startServer();


