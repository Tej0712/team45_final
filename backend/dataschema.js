// dataschema.js
const mongoose = require('mongoose');

// Define the schema before using it
const ReactFormDataSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  image: { type: String },
}, {
  collection: "iPhones"
});

const Product = mongoose.model("Product", ReactFormDataSchema);

const AboutInfoSchema = new mongoose.Schema({
  name: String,
  netId: String,
  teamNumber: String,
  courseNumber: String,
  courseName: String,
  date: String,
  professorName: String,
  studentInfo: String,
  image: String
}, {
  collection: "about_info"
});

const AboutInfo = mongoose.model("AboutInfo", AboutInfoSchema);

module.exports = { Product, AboutInfo };
