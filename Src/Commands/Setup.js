const Discord = require("discord.js");
const Guild = require("../Schemas/Guild");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'setup',
    description: 'Sets up a new record for the current guild.',
    execute(message,args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
       var newGuild = new Guild({
           name: message.guild.name,
           group: 0,
           cookie: "none",
           redeem: "no"
       });
       Guild.findOne({name: message.guild.name}, function(error, docs){
         if(error) return null;
         if(docs < 1){
            newGuild.save().then(a => {
                message.channel.send("Successfully created record.")
               });
         } else {
            return message.channel.send("A record already exists from this guild.")
         }
       }).catch(error=>{return null})
    }
});
    }
}