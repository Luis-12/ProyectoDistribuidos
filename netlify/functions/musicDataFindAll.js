"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;

    const movies = await client.db("Proyecto2").collection("musicData").find({}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(movies) };
  } catch (error) {
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};