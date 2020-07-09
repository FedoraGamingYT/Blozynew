const noblox = require("noblox.js");
const faker = require("faker");
const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'verify',
    description: 'Verifies your account is valid.',
    execute(message, args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        let securityQuestion = faker.random.words(10);
        var securityQuestionEmbed = new Discord.RichEmbed()
        .setAuthor(BotInfo.bot_name)
        .setTitle("Set this verification message inside of your roblox description/bio.")
        .addField("Reminder", "Please say finished when you are done.", true)
        .setDescription(securityQuestion)
        .setColor("#36393E")
        message.channel.send(securityQuestionEmbed).then(a => {
           message.channel.awaitMessages(msg => {
              if(msg.content.toLowerCase() == "finished" && msg.author.id == message.author.id){
                  var successVerificationMessage = new Discord.RichEmbed()
                  .setAuthor(BotInfo.bot_name)
                  .setDescription("Please repeat your roblox username, so our ninja robloxians can check.")
                  .setColor("#36393E")
                  message.channel.send(successVerificationMessage).then(b => {
                    const FilterUser = m => m.author.id === message.author.id
                    const Collect = message.channel.createMessageCollector(FilterUser, { max: "1", time: "200000" });
                    Collect.on("collect", msg => {
                        if(msg.content.toLowerCase() == "cancel"){
                            var cancelRequest = new Discord.RichEmbed()
                            .setAuthor(BotInfo.bot_name)
                            .setDescription("Successfully canceled request.")
                            .setColor("#36393E")
                            message.channel.send(cancelRequest)
                        } else {
                          noblox.getIdFromUsername(msg.content).then(c => {
                             noblox.getBlurb(c).then(b => {
                               if(b.includes(securityQuestion)){
                                   message.channel.send("Successfully verified")
                               } else {
                                   message.channel.send("Unsuccessful attempt on verifying roblox-to-discord")
                               }
                             });
                          });  
                        }
                    });
                  });
              }
           });
        });
    } 
});
    }
}