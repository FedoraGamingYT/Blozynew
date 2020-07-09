const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'purge',
    description: 'Purges an amount of messages inside of a channel',
    execute(message, args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.channel.send("You do not have the correct permissions.")
        } else {
        if(!args[0]) return message.channel.send("Please specify an amount to purge from this channel.")
        if(isNaN(args[0])) return message.channel.send("This is not a valid number, please try again.");
        message.delete();
        if(args[0] > 100 || args[0] < 2) return message.channel.send("Woah there partner! Give me a number between [2-100]");
        message.channel.bulkDelete(args[0])
         .catch(error => message.channel.send("No can do partner! Our wildest horse purgers are out on lunch."))
        }
    }
});
}
}