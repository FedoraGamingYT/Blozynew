const Discord = require("discord.js")
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'info',
    description: 'Shows the bots information.',
    execute(message, args){
        Code.findOne({owner: message.author.username}, function(error, docs){
            if(!docs){
                var notPremiumEmbed = new Discord.RichEmbed()
                .setAuthor(BotInfo.bot_name)
                .setColor("#36393E")
                .setDescription("Premium Status: "+"You cannot perform this action, you are: :small_blue_diamond: **Non-Premium** :small_blue_diamond:")
                return message.channel.send(notPremiumEmbed);
            } else {
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`
        }
        var infoSection = new Discord.RichEmbed()
        .setAuthor(BotInfo.bot_name)
        .addField("Version", "2.0.0", true)
        .addField("Library", "discord.js", true)
        .addField("Creator", "Lebyy_Dev#9380", true)
        .addField("Servers", message.client.guilds.size, true)
        .addField("Users",    message.client.users.size, true)
        .addField("Clients", "Coming Soon", true)
        .addField("Invite", "Coming Soon", true)
        .addField("Discord", "Coming Soon", true)
        .addField("Donate", "Coming Soon", true)
        .setColor("#36393E")
        .setFooter(`Uptime ${duration(message.client.uptime)}`)
        message.channel.send(infoSection)
    }
});
    },
};