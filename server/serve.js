const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const PORT = 3001;

const uri = "mongodb+srv://siyabonga95:Siyabonga@100@cluster0.mongodb.net/Survey?retryWrites=true&w=majority";
const db = "Survey";

MongoClient.connect(uri, (err, client) => {
    if (err) {
        console.error("Failed to connect to MongoDB", err);
        return;
    }
    console.log("Successfully connected to MongoDB");

    const databaseConnect = client.db(db);
    const collection = databaseConnect.collection("Survey");

    const arrayObject = [
        { name: "Amanda", email: "siyabongazungu95@gmail.com" },
        { name: "Amanda", email: "siyabongazungu95@gmail.com" }
    ];

    collection.insertMany(arrayObject, (err, result) => {
        if (err) {
            console.error("Failed to insert data", err);
            return;
        }
        console.log("Data inserted to database", result.insertedCount);
        client.close(); 
    });
});

app.get("/", (req, res) => {
    res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
