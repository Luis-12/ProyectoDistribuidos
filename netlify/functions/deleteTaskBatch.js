"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const { ObjectId } = require('mongodb');
const mongodb = require('mongodb');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;
    const db = client.db('Proyecto2');
    const id = parseInt(event.path.split("/").reverse()[0]);
    console.log(id);
    
    const orgData = await db.collection('musicData').findOne({ _id:id});

    console.log(orgData.fileName);

    const file = await db.collection('Music.files').findOne({ filename: orgData.fileName });

    console.log(file._id);

    var bucket = new mongodb.GridFSBucket(db, { bucketName: 'Music' });

    bucket.delete(file._id);

    await client.db("Proyecto2").collection("musicData").deleteOne({_id:id});


    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};