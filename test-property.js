const { MongoClient, ObjectId } = require('mongodb');

async function testProperty() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db('kimia-realty');
    const properties = database.collection('properties');

    // Test 1: Find all properties
    const allProperties = await properties.find({}).toArray();
    console.log("All properties:", allProperties);

    // Test 2: Try to find the specific property
    const propertyId = "68ffa61160d5803bf94ff5cf";
    console.log("Looking for property with ID:", propertyId);
    
    // Try with ObjectId
    try {
      const propertyById = await properties.findOne({ _id: new ObjectId(propertyId) });
      console.log("Found with ObjectId:", propertyById);
    } catch (error) {
      console.log("Failed to find with ObjectId:", error.message);
    }
    
    // Try with string ID
    try {
      const propertyByStringId = await properties.findOne({ _id: propertyId });
      console.log("Found with string ID:", propertyByStringId);
    } catch (error) {
      console.log("Failed to find with string ID:", error.message);
    }

  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

testProperty().catch(console.error);