const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));   no FE yet

app.use(require('./routes'));

// Tell Mongoose which DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-api', {
  //useNewParser: true,
  useUnifiedTopology: true
});

// Mongoose log Queries
mongoose.set('debug', true);

// Set to listen:
app.listen(PORT, () => console.log(
  `
  ////////////////////////
  Connected on port: ${PORT}
  /////////////////////////
  
  `
));

