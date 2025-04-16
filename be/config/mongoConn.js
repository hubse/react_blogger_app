require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    const database = client.db("myDatabase");
    const collection = database.collection("testCollection");

    // Example: insert a document
    const result = await collection.insertOne({ name: "John Doe", age: 30 });
    console.log("Inserted:", result.insertedId);
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.close();
  }
}

run();
