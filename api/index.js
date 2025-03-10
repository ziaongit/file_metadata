'use strict';
require('dotenv').config();

var express = require('express');
var cors = require('cors');
const path = require('path');

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    res.json({
      "name": req.file.originalname,
      "type": req.file.mimetype,
      "size": req.file.size
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
