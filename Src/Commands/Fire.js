const Discord = require("discord.js");
const noblox = require("noblox.js");
const Guild = require("../Schemas/Guild");
const Code = require("../Schemas/Code");
const FireQueue = require('../Schemas/FireQueue');
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'fire',
    description: 'Roblox fire command.',
    execute(message, args) {
      if(!args[0]){
        return null;
      } else if(isNaN(args[0])){

      } else {
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
            FireQueue.findOne({member: args[0]}, function(error, docs){
               if(!docs){
                Guild.findOne({name: message.guild.name}, function(error, docs1){
                    if(!docs1 || docs1.cookie == "none" || docs1.group == 0){
                        return message.channel.send("I could not find some data, did you make sure you did -setup or -setcookie, and or -setgroup?");
                    } else {
                        var newQueue = new FireQueue({
                          group: docs1.group,
                          member: args[0],
                          cookie: docs1.cookie,
                          channel: message.guild.id
                        });
                        newQueue.save()
                    }
                });
               } else {
                   return message.channel.send("Please wait until the first request is done.");
               }
            });
          }
        });
//         Code.findOne({owner: message.author.username}, function(error, docs){
//             if(!docs){
//                 var notPremiumEmbed = new Discord.RichEmbed()
//                 .setAuthor(BotInfo.bot_name)
//                 .setColor("#36393E")
//                 .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
//                 return message.channel.send(notPremiumEmbed);
//             } else {
//         var memberToFire = args[0];
//         if(!memberToFire) return message.channel.send("I cannot find the username, to fire.")
//         Guild.findOne({name: message.guild.name}, function(error, docs){
//            if(!docs){
//                return message.channel.send("I could not find your server, please use -setup.");
//            } else if(docs.cookie == "none"){
//                return message.channel.send("I could not find your cookie, please use -setcookie");
//            } else if(docs.group == 0){
//                return message.channel.send("I could not find your group, please use -setgroup");
//            } else {
//                noblox.cookieLogin(docs.cookie).then(a => {
//                  noblox.getIdFromUsername(memberToFire).then(id => {
//                      noblox.getRankNameInGroup(docs.group, id).then(before_rank => {
//                         noblox.changeRank(docs.group, id, 1).then(success => {
//                            noblox.getRankNameInGroup(docs.group, id).then(after_rank => {
//                                var successFire = new Discord.RichEmbed()
//                                .setAuthor(BotInfo.bot_name)
//                                .setTitle("Successfully fired "+memberToFire+".")
//                                .addField("Before Rank", before_rank, true)
//                                .addField("After Rank", after_rank, true)
//                                .setColor("#36393E")
//                               message.channel.send(successFire).then(exit => {
//                                  noblox.clearSession(docs.cookie);
//                               });
//                            });
//                         }).catch(error => {
//                             return null;
//                         });
//                      });
//                  });
//                });
//            }
//         });
//     }
// });
    }
}