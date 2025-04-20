const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "docu-mate-db";

const collections = [
  "functions",
  "parameters",
  "examples",
  "developers",
  "tags",
  "function_tags",
  "libraries"
];

async function clearAllCollections() {
  try {
    await client.connect();
    const db = client.db(dbName);

    for (const name of collections) {
      await db.collection(name).deleteMany({});
      console.log(`Cleared collection: ${name}`);
    }
  } catch (error) {
    console.error("Error clearing collections:", error);
  } finally {
    await client.close();
  }
}

async function insertAllData(jsonData) {
  try {
    await client.connect();
    const db = client.db(dbName);

    for (const name of collections) {
      if (jsonData[name] && Array.isArray(jsonData[name])) {
        await db.collection(name).insertMany(jsonData[name]);
        console.log(`Inserted ${jsonData[name].length} records into ${name}`);
      }
    }
  } catch (error) {
    console.error("MongoDB Insert Error:", error);
  } finally {
    await client.close();
  }
}

module.exports = {
  clearAllCollections,
  insertAllData
};
