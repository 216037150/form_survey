const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://username:password@clustername.mongodb.net/Survey?retryWrites=true&w=majority";
const dbName = "Survey";

async function connectToDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectToDB;
