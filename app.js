const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const mongoose = require('mongoose');


const app = express();

//Port Number

const port = 80;

//Optimize Response Body

app.use(compression());

//Cors Middleware

app.use(cors());

//Set Static Folder

app.use("/", express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

//Passport Middleware

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

//Start server

app.listen( port, () => {
	console.log('Server started on port' +port);
});

