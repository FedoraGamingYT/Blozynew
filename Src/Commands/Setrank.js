const Discord = require("discord.js");
const noblox = require("noblox.js");
const Guild = require("../Schemas/Guild");
const Code = require("../Schemas/Code");
const setRankQueue = require('../Schemas/SetRankQueue');
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'setrank',
    description: 'Roblox setrank command.',
    execute(message, args) {
       if(!args[0] || args[1]){
           return null;
       } 
       Code.findOne({owner: message.author.username}, function(error, docs){
        if(!docs){
            var notPremiumEmbed = new Discord.RichEmbed()
            .setAuthor(BotInfo.bot_name)
            .setColor("#36393E")
            .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
            return message.channel.send(notPremiumEmbed);
        } else {
          setRankQueue.findOne({member: args[0]}, function(error, docs){
            if(!docs){
                Guild.findOne({name: message.guild.name}, function(error, docs1){
                    if(!docs1 || docs1.cookie == "none" || docs1.group == 0){
                        return message.channel.send("I could not find some data, did you make sure you did -setup or -setcookie, and or -setgroup?");
                    } else {
                        var newQueue = new setRankQueue({
                            group: docs1.group,
                            member: args[0],
                            new_role: args[1],
                            cookie: docs1.cookie,
                            channel: message.channel.id
                         });
                         newQueue.save();
                    }
                });
            } else {
                return message.channel.send("Please wait until the previous request on this user has went through successfully.")
            }
          });
        }
    });
    }
}