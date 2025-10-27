const { MongoClient, ObjectId } = require('mongodb');

async function deleteProperty() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db('kimia-realty');
    const properties = database.collection('properties');

    // Delete the property with the invalid image URL
    const propertyId = "68ff9dd12c6e0b0ad3a012d9";
    
    const result = await properties.deleteOne({ _id: new ObjectId(propertyId) });
    
    if (result.deletedCount === 1) {
      console.log("Property deleted successfully");
    } else {
      console.log("Property not found or already deleted");
    }
  } catch (error) {
    console.error("Error deleting property:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

deleteProperty().catch(console.error);