const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var Warn = new Schema({
   name: String,
   reason: String
});

var WarnSchema = Mongoose.model("Warn", Warn);
module.exports = WarnSchema;