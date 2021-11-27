"use strict"

const rabbitPromise = require('./rabbitMQ');

const headers = require('./headersCORS');
const axios = require('axios').default;

const url = 'https://confident-bartik-aba02f.netlify.app/.netlify/functions/'

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const channel = await rabbitPromise();
    let message = await channel.get("musicstore",{'noAck':true});
    while (message) {
      const request = JSON.parse(message.content.toString());
      console.log(request.method);
      switch (request.method) {
        case "DELETE":
          await axios.put(url+'categoriasDeleteBatch/'+request.id, JSON.stringify(request.body)); f
          break;
        case "UPDATE":
          await axios.put(url+'categoriasUpdateBatch'+request.id, JSON.stringify(request.body));
          break;
        case "INSERT":
          console.log(JSON.stringify(request.body));
          await axios.post(url+'categoriasInsertBatch', JSON.stringify(request.body));
          break;
      }
      message = await channel.get("musicstore",{'noAck':true});
    }
    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};