const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const dbName = "survey-data";

async function runAggregation() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db(dbName);
        const collection = database.collection("Survey");

        // Run aggregation pipeline
        const result = await collection.aggregate([
            { $group: { _id: null, totalSurveys: { $sum: 1 }, averageAge: { $avg: "$age" }, maxAge: { $max: "$age" }, minAge: { $min: "$age" }, pizzaLovers: { $sum: { $cond: [{ $eq: ["$food", "pizza"] }, 1, 0] } }, eatOutLovers: { $sum: { $cond: [{ $eq: ["$eat_out", "yes"] }, 1, 0] } } } },
            { $project: { _id: 0, totalSurveys: 1, averageAge: { $round: ["$averageAge", 1] }, maxAge: 1, minAge: 1, pizzaPercentage: { $round: [{ $multiply: [{ $divide: ["$pizzaLovers", "$totalSurveys"] }, 100] }, 1] }, eatOutPercentage: { $round: [{ $multiply: [{ $divide: ["$eatOutLovers", "$totalSurveys"] }, 100] }, 1] } } }
        ]).toArray();

        console.log("Aggregation result:");
        console.log(result);
    } catch (error) {
        console.error("Error running aggregation:", error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

runAggregation();

