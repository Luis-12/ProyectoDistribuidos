"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const { ObjectId } = require('mongodb');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;
    const id = parseInt(event.path.split("/").reverse()[0]);

    const movies =
      await client.db("Proyecto2").collection("musicData").find({_id:id}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(movies[0]) };
  } catch (error) {
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};