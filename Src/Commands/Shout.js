const Discord = require("discord.js");
const noblox = require("noblox.js");
const Guild = require("../Schemas/Guild");
const Code = require("../Schemas/Code");
const ShoutQueue = require('../Schemas/ShoutQueue');
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'shout',
    description: 'Roblox shout command.',
    execute(message, args) {
        if(!args[0]){
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
                Guild.findOne({name: message.guild.name}, function(error, docs1){
                    if(!docs1 || docs1.cookie == "none" || docs1.group == 0){
                        return message.channel.send("I could not find some data, did you make sure you did -setup or -setcookie, and or -setgroup?");
                    }
                  else {
                    var newShout = new ShoutQueue({
                        group: docs1.group,
                        author: message.author.username,
                        content: args.join(" "),
                        cookie: docs1.cookie,
                        channel: message.channel.id
                    });
                    newShout.save()
                  }
                });
            }
        });
//         var ShoutContent= args.join(" ")
//         if(!ShoutContent) return message.channel.send("I cannot find the shout content.");
//         Guild.findOne({name: message.guild.name}, function(error, docs){
//             if(!docs){
//                 return message.channel.send("I could not find your server, please use -setup.");
//             } else if(docs.cookie == "none"){
//                 return message.channel.send("I could not find your cookie, please use -setcookie");
//             } else if(docs.group == 0){
//                 return message.channel.send("I could not find your group, please use -setgroup");
//             } else {
//                 noblox.cookieLogin(docs.cookie).then(a => {
//                     if(ShoutContent.toLowerCase() == "clear"){
//                       noblox.shout(docs.group,"                  ").then(finished => {
//                         let shoutFinish = new Discord.RichEmbed()
//                         .setAuthor(BotInfo.bot_name)
//                         .setDescription("Successfully cleared the shout.")
//                         .setColor("#36393E")
//                         message.channel.send(shoutFinish).then(exit => {
//                             noblox.clearSession(docs.cookie);
//                          });
//                       });
//                     } else {
//                   //    try{
//                        noblox.shout(docs.group,ShoutContent).then(finished => {
//                          let shoutFinish = new Discord.RichEmbed()
//                          .setAuthor(BotInfo.bot_name)
//                          .setDescription("Successfully completed the shout: "+ShoutContent)
//                          .setColor("#36393E")
//                          message.channel.send(shoutFinish).then(exit => {
//                             noblox.clearSession(docs.cookie);
//                          });
//                        });
//                      //}//.catch(error=>{return message.channel.send(`Another weird error. **${error}**`);})
//                 }
//               }).catch(error => {return message.channel.send(`Another weird error. **${error}**`);});
//             }
//          });
//     }
// });
    }
}
