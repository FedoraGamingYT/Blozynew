const Discord = require("discord.js");
const BotInfo = require("../Storage.json");
const Code = require("../Schemas/Code");
module.exports = {
    name: 'suggest',
    description: 'Gives a suggestion on something',
    execute(message, args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        var suggestion = args.join(" ");
        if(!suggestion) return message.channel.send("Please give a suggestion with the command. -suggest suggestion_here")
        let suggestEmbed = new Discord.RichEmbed()
        .setAuthor("DisBlox Suggestion")
        .setDescription(suggestion)
        .setColor("#36393E")
        message.channel.send(suggestEmbed).then(a => {
           a.react("❎")
           a.react("✅")
        });
    } 
});
}
}