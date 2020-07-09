const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");

module.exports = {
	name: 'ban',
	description: 'Bans a specific member',
	execute(message, args) {
		if(message.member.hasPermission("BAN_MEMBERS")){
		Code.findOne({owner: message.author.username}, function(error, docs){
       if(docs > 0){
				if(!message.member.hasPermission("BAN_MEMBERS")){
          return message.channel.send("You do not have the correct permissions to perform this action.")
	  } else {
		let banMember = message.mentions.members.first();
		if(!banMember) return message.channel.send("The user mentioned is invalid or possibly not inside the guild, try again if neither are correct.");
		if(banMember.hasPermission("ADMINISTRATOR")){
          message.channel.send("This person cannot be banned (Exceeded Permissions)");
		} else {
			message.guild.ban(banMember.user.id).then(a => {
			   var finishedBan = new Discord.RichEmbed()
			   .setAuthor(BotInfo.bot_name)
			   .setDescription("Successfully banned "+banMember+", from this guild.")
			   .setColor("#36393E")
			   message.channel.send(finishedBan);
			});
		}
	  }
			 } else {
				var notPremiumEmbed = new Discord.RichEmbed()
				.setAuthor(BotInfo.bot_name)
				.setColor("#36393E")
				.setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
				return message.channel.send(notPremiumEmbed);
			 }
		});
	} else {
		return message.channel.send("You do not have the permissions to ban this member.");
	}
	}
};