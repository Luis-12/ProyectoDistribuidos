"use strict";

const { MongoClient } = require('mongodb');

let db;

MongoClient.connect('mongodb+srv://protect2SD:root1234@cluster0.fd1ri.mongodb.net/Proyecto2?retryWrites=true&w=majority', {useUnifiedTopology: true}, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }
  db = client.db('Proyecto2');
  console.log('DB is connected')
});

const getConnection = () => {
  return db;
};

module.exports = {
  getConnection
};