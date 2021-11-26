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
    let message = await channel.get("musicstore");
    /*while (message) {
      const request = message.content;
      switch (request.method) {
        case "INSERT":
          await fetch(url+'insertTrackBatch', {
            headers: {"Content-type": "multipart/form-data"},
            method: "POST",body: request.body});
          break;
      }
      //message = await channel.get("musicstore",{'noAck':true});
    }*/
    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};