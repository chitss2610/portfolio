const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  partnerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
});

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
