const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'status',
    description: 'Shows the premium status of the user.',
    execute(message,args){
     Code.findOne({owner: message.author.username}, function(error, docs){
         if(!docs){
          let premStatus = new Discord.RichEmbed()
          .setAuthor(BotInfo.bot_name)
          .setDescription("Premium Status: "+":small_blue_diamond: **Non-Premium** :small_blue_diamond:")
          .setColor("#36393E")
          .setFooter("[Interested In Premium? Click me!](https://discord.gg/U92vute)")
          message.channel.send(premStatus)
         } else {
           let premStatus = new Discord.RichEmbed()
           .setAuthor(BotInfo.bot_name)
           .setDescription("Premium Status: "+":small_orange_diamond: **Premium** :small_orange_diamond:")
           .setColor("#36393E")
           message.channel.send(premStatus)
         }
     });
}
}
