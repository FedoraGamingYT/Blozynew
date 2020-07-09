const Discord = require("discord.js");
const noblox = require("noblox.js");
const Guild = require("../Schemas/Guild");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'promote',
    description: 'Roblox promote command.',
    execute(message, args) {
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        var memberToPromote = args[0];
        if(!memberToPromote) return message.channel.send("I cannot find the username, to promote.")
        Guild.findOne({name: message.guild.name}, function(error, docs){
           if(!docs){
               return message.channel.send("I could not find your server, please use -setup.");
           } else if(docs.cookie == "none"){
               return message.channel.send("I could not find your cookie, please use -setcookie");
           } else if(docs.group == 0){
               return message.channel.send("I could not find your group, please use -setgroup");
           } else {
               noblox.cookieLogin(docs.cookie).then(a => {
                 noblox.getIdFromUsername(memberToPromote).then(id => {
                     noblox.getRankNameInGroup(docs.group, id).then(before_rank => {
                        noblox.promote(docs.group, id).then(success => {
                           noblox.getRankNameInGroup(docs.group, id).then(after_rank => {
                               var successPromotion = new Discord.RichEmbed()
                               .setAuthor(BotInfo.bot_name)
                               .setTitle("Successfully promoted "+memberToPromote+".")
                               .addField("Before Rank", before_rank, true)
                               .addField("After Rank", after_rank, true)
                               .setColor("#36393E")
                              message.channel.send(successPromotion).then(exit => {
                                noblox.clearSession(docs.cookie);
                             });
                           });
                        }).catch(error => {
                            return message.channel.send(`This error is probably from another planet. Report it now! **${error}**`);
                        });
                     });
                 });
               });
           }
        });
    }
});
    }
}
