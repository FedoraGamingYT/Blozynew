const md5 = require('md5');
const Discord = require("discord.js");
const Code = require("../Schemas/Code")
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'generatecode',
    description: 'Generates a code',
    execute(message, args){
       if(message.author.id )
        if(!args) return message.channel.send("I do not recognize a day inside of the command, please try again.");
        if(isNaN(args[0])) return message.channel.send("This is not a valid number, please try again.");
        // if(message.author.id === "510666587209203752" || message.author.id === '289463060178010123'){
          let generate_code = md5(Math.random(Math.floor()*592726+9-23/5+472*7+386).toString(32));
          let daytominutes = args[0]*1440;
          var codeSection = new Discord.RichEmbed()
          .setAuthor(BotInfo.bot_name)
          .setDescription("Successfully generated a code: "+generate_code+", for "+args[0]+"d")
          .setColor("#36393E")
          message.channel.send(codeSection)
          var newCode = new Code({
            code: generate_code,
            duration: daytominutes,
            redeemed: "no",
            owner: "none"
          });
          Code.findOne({code: generate_code}, function(error, doc){
             if(doc < 1){
                newCode.save();
             } else {
                return message.channel.send("Thats weird, this code already exists in the database, try again.");
             }
          });
      // }else{
      //   return message.channel.send(`Eh what? Why even try?`);
      // }
  }
}
