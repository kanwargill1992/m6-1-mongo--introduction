const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("exercise_1");

  const users = await db.collection("users").insertOne({ users }).toArray();
  console.log("users", users);
  client.close();

  users.length > 0
    ? res.status(201).json(users)
    : res.status(404).json("User not added ");
};

module.exports = { addUser };
