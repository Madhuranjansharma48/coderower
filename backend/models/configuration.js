const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  data: [[String]],
  remark: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Configuration', configurationSchema);
