const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var Queue = new Schema({
   group: Number,
   member: String,
   cookie: Schema.Types.Mixed,
   channel: Schema.Types.Mixed
});

var ExileSchema = Mongoose.model("Exile", Queue);
module.exports = ExileSchema;