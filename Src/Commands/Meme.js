const request = require("request");
const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'meme',
    description: 'Generates a meme',
    execute(message, args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        request("https://api-to.get-a.life/meme", function(error, response, body){
            if(error) return message.channel.send('Something went wrong, our team of hamsters are fixing it!')
         let content = JSON.parse(body);
        var memeSection = new Discord.RichEmbed()
        .setAuthor(BotInfo.bot_name)
        .setImage(content.url)
        .setColor("#36393E")
        message.channel.send(memeSection)
        });
    } 
});
    }
}