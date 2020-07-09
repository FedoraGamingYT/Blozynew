const Discord = require("discord.js");
const noblox = require("noblox.js");
const Guild = require("../Schemas/Guild");
const Code = require("../Schemas/Code");
const DemoteQueue = require('../Schemas/DemoteQueue');
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'demote',
    description: 'Roblox demote command.',
    execute(message, args) {
        if(!args[0]){
            return null;
        }
        if(isNaN(args[0])){
            
        } else {
            return message.channel.send("You have to give me a members name, not their id.")
        }
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                 .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                 .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                 return message.channel.send(notPremiumEmbed);
             } else {
                DemoteQueue.findOne({member: args[0]}, function(error, docs){
                    if(!docs){
                     Guild.findOne({name: message.guild.name}, function(error, docs1){
                        if(!docs1 || docs1.cookie == "none" || docs1.group == 0){
                            return message.channel.send("I could not find some data, did you make sure you did -setup or -setcookie, and or -setgroup?");
                        }
                      else {
                         var newQueue = new DemoteQueue({
                               group: docs1.group,
                               member: args[0],
                               cookie: docs1.cookie,
                               channel: message.channel.id
                            });
                            newQueue.save();
                        }
                     });
                    } else {
                        return message.channel.send("Please wait until the first request on this user is done.");
                    }
                });

            }
        });
    }
}