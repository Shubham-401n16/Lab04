'use strict';

const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
  name: { type: 'string' , required: true },
});
  


const categoriesModel = mongoose.model('categories',categoriesSchema);

module.exports = categoriesModel;