const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var Queue = new Schema({
   group: Number,
   author: Schema.Types.Mixed,
   content: String,
   cookie: Schema.Types.Mixed,
   channel: Schema.Types.Mixed
});

var ShoutSchema = Mongoose.model("Shout", Queue);
module.exports = ShoutSchema;