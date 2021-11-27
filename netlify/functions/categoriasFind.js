"use strict"

const mongoPromise = require('./mongoDB');

const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
     return { statusCode: 200, headers, body: "OK" };
  }
	
  try {
    const client = await mongoPromise;
    const id = parseInt(event.path.split("/").reverse()[0]);

    const categorias = 
	  await client.db("Proyecto2").collection("categorias").find({_id:id}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(categorias)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};