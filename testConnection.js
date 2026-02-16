require('dotenv').config();
const { MongoClient } = require('mongodb');

async function run() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    
    // This checks if we can talk to the database
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Success! You are connected to MongoDB Atlas.");
    
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await client.close();
  }
}

run();