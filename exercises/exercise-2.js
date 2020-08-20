const { MongoClient, Db } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise-2");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreeting = async (req, res) => {
  const _id = req.params._id;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise-2");
    db.collection("greetings").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    });
  } catch (err) {
    console.log(err.stack);
  }
};

const getGreetings = async (req, res) => {
  const _id = req.params._id;

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise-2");
  const greetings = db.collection("greetings").find().toArray();

  let start = 0;
  let limit = 25;

  if (req.query.start !== undefined) {
    start = Number(req.query.start);
  }
  if (req.query.limit !== undefined) {
    limit = Number(req.query.limit);
  }
  if (greetings.length > 0) {
    res.status(200).json({
      start: start,
      limit: limit,
      data: greetings.slice(start, start + limit),
    });
  } else {
    res.status(404).json({ data: "NOT FOUND" });
  }
  client.close();
};

const deleteGreeting = async (req, res) => {
  const _id = req.params._id;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("exercise-2");
    const r = await db.collection("greetings").deleteOne({ _id });
    assert.equal(1, r.deletedCount);
    res.status(204).json("ok");
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: err.message });
  }
  client.close();
};

module.exports = { createGreeting, getGreeting, getGreetings, deleteGreeting };
