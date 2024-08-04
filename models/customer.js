const mongoose = require('mongoose');

const CRMSchema = new mongoose.Schema({
    name: String,
    age: Number ,
  });

const Customer = mongoose.model('CRM', CRMSchema);

module.exports = Customer;