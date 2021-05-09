// require the library
const mongoose = require('mongoose');

// connecting to the database

mongoose.connect('mongodb://localhost/TODO_list_db');

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// handling error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running then print this message

db.once('open',function()
{
    console.log('Successfully connected to the database');
});