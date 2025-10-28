const { MongoClient } = require('mongodb');

async function testDB() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");

    const database = client.db('kimia-realty');
    const collections = await database.listCollections().toArray();
    console.log("Available collections:", collections);

    // Test blogs collection
    const blogs = database.collection('blogs');
    const blogCount = await blogs.countDocuments();
    console.log("Number of blogs:", blogCount);

    // Test properties collection
    const properties = database.collection('properties');
    const propertyCount = await properties.countDocuments();
    console.log("Number of properties:", propertyCount);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

testDB().catch(console.error);