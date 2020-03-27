'use strict';

const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  note: { type: String , required: true },
  categoryId: {type: String, required: false}
});

notesSchema.pre('save', function() {
  console.log('attempting to save record:');
  console.log(this);
  console.log('-----');
});

notesSchema.post('save', function() {
  console.log('successfully saved!');
  console.log('-----');
});
  
const notesModel = mongoose.model('notes',notesSchema);

module.exports = notesModel;