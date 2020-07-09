const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var Queue = new Schema({
   group: Number,
   member: String,
   new_role: Schema.Types.Mixed,
   cookie: Schema.Types.Mixed,
   channel: String
});

var RankSchema = Mongoose.model("Rank", Queue);
module.exports = PromoteSchema;