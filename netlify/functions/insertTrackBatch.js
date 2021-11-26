"use strict"

const headers = require('./headersCORS');
const { ObjectID, GridFSBucket } = require("mongodb");
const { getConnection } = require("../database");
const { Readable } = require('stream');
const multer = require('multer');


exports.handler = async (event, context) => {

    if (event.httpMethod == "OPTIONS") {
        return { statusCode: 200, headers, body: "OK" };
    }

    try {

      const storage = multer.memoryStorage();
      const upload = multer({storage, limits: {
        fields: 1, // 1 non-file field
        fileSize: 9000000, // 9mb maximum size
        files: 1, // maximum 1 file
        parts: 2 // files + fields
      }})

      upload.single('track')(event, (err) => {
        if (err) {
          console.log(err);
          // return res.status(400).json({message: 'Upload Request Validation Failed'});
          return { statusCode: 400, headers, body: err.message};
        } else if (!event.body.name) {
          return res.status(400).json({message: 'No track name in request body'});
        }
    
        let trackName = event.body.name;
    
        // convert buffer to readable stream
        const readableTrackStream = new Readable();
        readableTrackStream.push(event.file.buffer);
        readableTrackStream.push(null);
    
        const db = getConnection();
        let bucket = new GridFSBucket(db, {
          bucketName: 'Music'
        });
    
        let uploadStream = bucket.openUploadStream(trackName);
        let id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);
    
        uploadStream.on('error', () => {
          return { statusCode: 500, headers, body: 'Error uploading file'};
        });
    
        uploadStream.on('finish', () => {
          return { statusCode: 200, headers, body: "File uploaded successfully, stored under Mongo ObjectID: " + id};
        });
    
      })

        return { statusCode: 200, headers, body: 'OK'};
      } catch (error) {
        console.log(error);
        return { statusCode: 422, headers, body: JSON.stringify(error) };
      }




};