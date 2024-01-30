var express = require('express');
var app = express();
var path = require('path');
const cors = require('cors');

const port = 3001;

app.use(cors());
app.use(express.static(__dirname + '/public')); // Current directory is root

app.listen(port);
console.log(`Listening on port ${port}`);