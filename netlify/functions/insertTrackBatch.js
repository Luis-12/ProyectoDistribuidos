"use strict"

const headers = require('./headersCORS');
const { GridFSBucket } = require("mongodb");
const clientPromise = require('./mongoDB');
const axios = require('axios').default;
const path = require('path');


exports.handler = async (event, context) => {


    if (event.httpMethod == "OPTIONS") {
        return { statusCode: 200, headers, body: "OK" };
    }

    try {

      const client = await clientPromise;
      const db = client.db('Proyecto2');
      const data = JSON.parse(event.body);
      data.fileName = path.basename(data.url);

      const mp3 = await db.collection('Music.files').findOne({ filename: data.fileName });

      if (video) {
        return { statusCode: 422, headers, body: "The mp3 file exists." };
      }

      let bucket = new GridFSBucket(db, {
        bucketName: 'Music'
      });

      const response = await axios.get(data.url, { responseType: 'stream' });

      await new Promise((resolve, reject) => {
        response.data.pipe(bucket.openUploadStream(data.fileName)).
          on('error', function (error) {
            reject(error);
          }).
          on('finish', function () {
            resolve();
          });
      });

      await db.collection("musicData").insertOne(data);
        return { statusCode: 200, headers, body: 'OK'};
      } catch (error) {
        console.log(error);
        return { statusCode: 422, headers, body: JSON.stringify(error) };
      }
};