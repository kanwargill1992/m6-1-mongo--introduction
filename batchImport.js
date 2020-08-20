const fs = require("file-system");
const assert = require("assert");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise-2");
    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
    console.log("status:200");
    client.close();
  } catch (err) {
    console.log("status:500");
    console.log(err.stack);
  }
};

batchImport();
