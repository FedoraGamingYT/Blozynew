const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports  = {
    name: 'kick',
    description: 'Kicks a member from the guild',
    execute(message, args){
      Code.findOne({owner: message.author.username}, function(error, docs){
        if(!docs){
            var notPremiumEmbed = new Discord.RichEmbed()
            .setAuthor(BotInfo.bot_name)
            .setColor("#36393E")
            .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
            return message.channel.send(notPremiumEmbed);
        } else {
        if(!message.member.hasPermission("KICK_MEMBERS")){
            return message.channel.send("You do not have the correct permissions to perform this action.")
        } else {
          let kickMember = message.mentions.members.first();
          if(!kickMember) return message.channel.send("The user mentioned is invalid or possibly not inside the guild, try again if neither are correct.");
          if(kickMember.hasPermission("ADMINISTRATOR")){
            message.channel.send("This person cannot be banned (Exceeded Permissions)");
          } else {
              message.guild.kick(kickMember.user.id).then(a => {
                 var finishedKick = new Discord.RichEmbed()
                 .setAuthor(BotInfo.bot_name)
                 .setDescription("Successfully kicked "+banMember+", from this guild.")
                 .setColor("#36393E")
                 message.channel.send(finishedKick);
              });
          }
        }
    } 
  });
}
}