require("dotenv").config();
const mongodb = require("mongodb");

const { MongoClient } = mongodb;

let _db;
const mongoConnect = (callback = () => {}) =>
  MongoClient.connect(process.env.MONGO_DB_URL)
    .then((client) => {
      callback();
      _db = client.db();
    })
    .catch(console.error);

const getDb = () => {
  if (_db != undefined) return _db;
  throw Error("database is not instantiated");
};
module.exports = { mongoConnect, getDb };
