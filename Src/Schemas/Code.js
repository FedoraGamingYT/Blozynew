const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var Code = new Schema({
   code: Schema.Types.Mixed,
   duration: Number,
   redeemed: String,
   owner: String
});

var CodeSchema = Mongoose.model("Code", Code);
module.exports = CodeSchema;