const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var Guild = new Schema({
   name: String,
   group: Number,
   cookie: Schema.Types.Mixed,
   redeem: String
});

var GuildSchema = Mongoose.model("Guild", Guild);
module.exports = GuildSchema;