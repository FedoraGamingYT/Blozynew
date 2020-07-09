const Discord = require("discord.js");
const Guild = require("../Schemas/Guild");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'setcookie',
    description: 'Sets a new cookie to the guild.',
    execute(message,args){
        if(!args[0]){
            return message.channel.send('Gotta provide args, buddy.');
        }
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        if(!args[0].includes("_|WARNING:")){
            return message.channel.send("I don't see a valid cookie partner to eat partner! Don't remember the command? -setcookie cookie")
        }
        Guild.updateOne({name: message.guild.name}, {cookie: args[0], $set: {redeem: "yes"}}, function(error){
            if(error) return message.channel.send("There was no record found on this guild, use -setup to continue.");
            message.delete();
            let successSave = new Discord.RichEmbed()
            .setAuthor(BotInfo.bot_name)
            .setDescription("Successful save, congratulations robloxian ninja. \n Remember saves aren't permanent, made a mistake no worries!")
            .setColor("#36393E")
            message.channel.send(successSave)
        });
    } 
});
    }
}