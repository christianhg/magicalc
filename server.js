const express = require('express');
const port = 1337;

let app = express();
let server = app.listen(port);
app.use(express.static(__dirname + '/dist'));
