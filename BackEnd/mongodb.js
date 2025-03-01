// Import the MongoClient class from the MongoDB driver
const { MongoClient } = require('mongodb');

// Replace with your actual connection string
const uri = process.env.MONGODB_CONNECTION_STRING;

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");

    // Example: Insert a document into a collection
    const database = client.db('yourDatabase');
    const collection = database.collection('yourCollection');
    const doc = { name: "Alice", age: 30 };
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // Example: Find the document
    const findResult = await collection.findOne({ name: "Alice" });
    console.log("Found a document:", findResult);
  } catch (err) {
    console.error(err);
  } finally {
    // Ensure the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.error);
