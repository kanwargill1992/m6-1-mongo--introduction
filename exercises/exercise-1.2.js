const { MongoClient, Db } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (dbName) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db(dbName);
  console.log("connected");

  const data = await db.collection("users").find().toArray();

  const users = await data;
  console.log(users);
  client.close();
  console.log("disconnected");
};
getCollection("exercise_1");
