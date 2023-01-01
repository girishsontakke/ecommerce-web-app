require("dotenv").config();
const mongodb = require("mongodb");

const { MongoClient } = mongodb;

let _db;
let connected = false;
const mongoConnect = (callback = () => {}) => {
  if (!connected) {
    return MongoClient.connect(process.env.MONGO_DB_URL)
      .then((client) => {
        callback();
        _db = client.db();
      })
      .catch(console.error);
  }
  callback();
};

const getDb = () => {
  if (_db != undefined) return _db;
  throw Error("database is not instantiated");
};
module.exports = { mongoConnect, getDb };
