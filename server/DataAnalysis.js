const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/";
const dbName = "Survey";
const collectionName = "SurveyData";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

async function getTotalSurveys() {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const totalSurveys = await collection.countDocuments();
        return totalSurveys;
    } catch (error) {
        console.error("Error getting total surveys:", error);
        throw error;
    }
}

async function getAverageAge() {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const averageAgeResult = await collection.aggregate([
            { $group: { _id: null, avgAge: { $avg: "$age" } } }
        ]).toArray();
        const averageAge = averageAgeResult[0]?.avgAge || 0;
        return averageAge;
    } catch (error) {
        console.error("Error calculating average age:", error);
        throw error;
    }
}


module.exports = {
    connectDB,
    getTotalSurveys,
    getAverageAge,

};
