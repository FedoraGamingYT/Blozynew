const Discord = require("discord.js");
const Code = require("../Schemas/Code")
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'commands',
    description: 'Displays the commands',
    execute(message, args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        var cmdsSection = new Discord.RichEmbed()
        .setAuthor(BotInfo.bot_name)
        .addField("Roblox", "❯Promote\n❯Demote\n❯Fire\n❯SetRank\n❯Exile\n❯Shout", true)
        .addField("Mod", "❯Warn\n❯Purge\n❯Ban\n❯Warnings\n❯Kick", true)
        .addField("Config", "❯Setup\n❯SetCookie\n❯SetGroup", true)
        .addField("Misc", "❯Redeem\n❯Suggest\n❯Verify", true)
        .addField("Info", "❯Help\n❯Commands\n❯Invite", true)
        .addField("Other", "❯Meme\n❯Status\n❯Info", true)
        .setColor("#36393E")
        message.channel.send(cmdsSection)
            }  
    });
    }
}