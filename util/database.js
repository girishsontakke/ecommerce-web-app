require("dotenv").config();
const mongodb = require("mongodb");

const { MongoClient } = mongodb;

let _db;
let connected = false;
const mongoConnect = async (callback = () => {}) => {
  if (!connected) {
    console.log("connecting...");
    try {
      const client = await MongoClient.connect(process.env.MONGO_DB_URL);
      _db = client.db();
      connected = true;
      callback();
    } catch (error) {
      connected = false;
      console.error(error);
    }
  }
};

const getDb = () => {
  if (_db != undefined) return _db;
  throw Error("database is not instantiated");
};
module.exports = { mongoConnect, getDb };
