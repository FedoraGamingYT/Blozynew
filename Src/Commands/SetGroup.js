const Discord = require("discord.js");
const Guild = require("../Schemas/Guild");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'setgroup',
    description: 'Sets a group for this guild.',
    execute(message,args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        if(!args[0]) return message.channel.send("Please try again, don't remember the correct way? -setgroup group_name")
        Guild.updateOne({name: message.guild.name}, {group: args[0]}, function(error){
            if(error) {
                console.log(error)
                return message.channel.send("Hmm.. that's weird, did you setup a record for your guild before trying this?");
        }
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