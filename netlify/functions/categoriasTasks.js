"use strict"

const rabbitPromise = require('./rabbitMQ');

const headers = require('./headersCORS');

const url = 'https://confident-bartik-aba02f.netlify.app/.netlify/functions/'

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const channel = await rabbitPromise();
    let message = await channel.get("musicstore",{'noAck':true});
    while (message) {
      const request = JSON.parse(JSON.stringify(message.content));
      console.log(request.method);
      switch (request.method) {
        case "DELETE":
          await fetch(url+'categoriasDeleteBatch/'+request.id, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}});
          break;
        case "UPDATE":
          await fetch(url+'categoriasUpdateBatch/'+request.id, {
            headers: {"Content-type": "application/json"},
            method: "PUT", body: JSON.stringify(request.body)});
          break;
        case "INSERT":
          console.log(JSON.stringify(request.body));
          await fetch(url+'categoriasInsertBatch', {
            headers: {"Content-type": "application/json"},
            method: "POST",body: JSON.stringify(request.body)});
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