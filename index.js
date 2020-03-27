'use strict';

//3rd party dependencies
require('dotenv').config();
const mongoose = require('mongoose');

//My Dependencies
const NoteActionHandler = require('./lib/notes.js');
const Input = require('./lib/input.js')


mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/models`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let entry = process.argv.slice(2);

let userInput = new Input(entry);
let userNote = new NoteActionHandler(userInput.command);
