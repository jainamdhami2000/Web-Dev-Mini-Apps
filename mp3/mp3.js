// Static
var http = require('http'),
    url = require('url'),
    fs   = require('fs'),
    filePath = '/home/jainam/Desktop/closer.mp3',
    stat = fs.statSync(filePath);

http.createServer(function(request, response) {
    var queryData = url.parse(request.url, true ).query;
    const skip = typeof(queryData.skip) == 'undefined' ? 0 : queryData.skip;
    const startByte = stat.size * skip;

    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size - startByte
    });

    fs.createReadStream(filePath, {start:startByte}).pipe(response);
})
.listen(2000);
 // /home/jainam/Desktop/TowerOfGod.mp3


/**
 * NPM Module dependencies.
 */
// const express = require('express');
// const trackRoute = express.Router();
// const multer = require('multer');
// const mongodb = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
// const {Readable} = require('stream');
// const app = express();
//
// app.use('/tracks', trackRoute);
// let db;
// MongoClient.connect('mongodb://localhost/trackDB', (err, database) => {
//   if (err) {
//     console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
//     process.exit(1);
//   }
//   db = database;
// });
// trackRoute.get('/:trackID', (req, res) => {
//   try {
//     var trackID = new ObjectID(req.params.trackID);
//   } catch (err) {
//     return res.status(400).json({message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters"});
//   }
//   res.set('content-type', 'audio/mp3');
//   res.set('accept-ranges', 'bytes');
//   let bucket = new mongodb.GridFSBucket(db, {bucketName: 'tracks'});
//   let downloadStream = bucket.openDownloadStream(trackID);
//   downloadStream.on('data', (chunk) => {
//     res.write(chunk);
//   });
//   downloadStream.on('error', () => {
//     res.sendStatus(404);
//   });
//   downloadStream.on('end', () => {
//     res.end();
//   });
// });
//
// trackRoute.post('/', (req, res) => {
//   const storage = multer.memoryStorage()
//   const upload = multer({
//     storage: storage,
//     limits: {
//       fields: 1,
//       fileSize: 6000000,
//       files: 1,
//       parts: 2
//     }
//   });
//   upload.single('track')(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({message: "Upload Request Validation Failed"});
//     } else if (!req.body.name) {
//       return res.status(400).json({message: "No track name in request body"});
//     }
//
//     let trackName = req.body.name;
//
//     // Covert buffer to Readable Stream
//     const readableTrackStream = new Readable();
//     readableTrackStream.push(req.file.buffer);
//     readableTrackStream.push(null);
//
//     let bucket = new mongodb.GridFSBucket(db, {bucketName: 'tracks'});
//
//     let uploadStream = bucket.openUploadStream(trackName);
//     let id = uploadStream.id;
//     readableTrackStream.pipe(uploadStream);
//
//     uploadStream.on('error', () => {
//       return res.status(500).json({message: "Error uploading file"});
//     });
//
//     uploadStream.on('finish', () => {
//       console.log(id)
//       return res.status(201).json({
//         message: "File uploaded successfully, stored under Mongo ObjectID: " + id
//       });
//     });
//   });
// });
//
// app.listen(3005, () => {
//   console.log("App listening on port 3005!");
// });
