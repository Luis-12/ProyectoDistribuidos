"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const { ObjectId } = require('mongodb');
const path = require('path');
const axios = require('axios').default;
const mongodb = require('mongodb')

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;
    const db = client.db('Proyecto2');
    const id = parseInt(event.path.split("/").reverse()[0]);
    const data = JSON.parse(event.body);
    data.fileName = path.basename(data.url);

    const orgData = await db.collection('musicData').findOne({ _id: id});
    
    const file = await db.collection('Music.files').findOne({ filename: orgData.fileName });

    var bucket = new mongodb.GridFSBucket(db, { bucketName: 'Music' });

    //bucket.delete(file._id);

    const response = await axios.get(data.trailer, { responseType: 'stream' });

    await new Promise((resolve, reject) => {
      response.data.pipe(bucket.openUploadStream(data.fileName)).
        on('error', function (error) {
          reject(error);
        }).
        on('finish', function () {
          resolve();
        });
    });

    await db.collection("musicData").updateOne({ _id: id }, { $set: data });

    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};