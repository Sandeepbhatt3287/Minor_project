const express = require('express');
const path = require('path');
const port = 7000;
const db = require('./config/mongoose');
const todo = require('./models/contact');

const app = express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
app.use(express.static('assets'));