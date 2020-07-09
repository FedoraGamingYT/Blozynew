const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'invite',
    description: 'Shows an invite to the support server.',
    execute(message, args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
         let inviteEmbed = new Discord.RichEmbed()
         .setAuthor(BotInfo.bot_name)
         .addField("(High Performance) Paid Roblox Moderation Client", "[Click Here For Further Details](https://discord.gg/AMJx2fs)")
         .setColor("#36393E")
         message.channel.send(inviteEmbed)
            }
             
            });
    }
}