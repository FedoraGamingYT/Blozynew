const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'help',
    description: 'Shows how commands are executed',
    execute(message,args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
       let helpEmbed = new Discord.RichEmbed()
       .setAuthor(BotInfo.bot_name)
       .addField("Roblox", "❯Promote (User) (Reason)\n❯Demote (User) (Reason)\n❯Fire (User) (Reason)\n❯SetRank (User) (New_Role)\n❯Exile (User Reason)\n❯Shout (Message) or (clear)", true)
       .addField("Mod", "❯Warn (@User) (Reason)\n❯Purge (Amount)\n❯Ban (@User)\n❯Warnings (@User)\n❯Kick (@User)", true)
       .addField("Config", "❯Setup (No Arguments)\n❯SetCookie (Cookie)\n❯SetGroup (Group_Name)", true)
       .addField("Misc", "❯Redeem (Code)\n❯Suggest (Suggestion)\n❯Verify (Tutorial/Execute Cmd)", true)
       .addField("Info", "❯Help (No Arguments)\n❯Commands (No Arguments)\n❯Invite (No Arguments)", true)
       .addField("Other", "❯Meme (No Arguments)\n❯Status (No Arguments)\n❯Info (No Arguments)", true)
       .setColor("#36393E")
       message.channel.send(helpEmbed)
            } 
        });
    }
}