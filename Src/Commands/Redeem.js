const Discord = require("discord.js");
const Code = require("../Schemas/Code");
const BotInfo = require("../Storage.json");
module.exports = {
    name: 'redeem',
    description: 'Redeems a code if valid.',
    execute(message,args){
        message.delete();
        if(!args[0]) return message.channel.send("Did you forget how to use this command already? -redeem code");
        Code.findOne({owner: message.author.username}, function(error, docs){
             if(docs){
               return message.channel.send("You are already a premium member.")
             } else {
              Code.findOne({code: args[0]}, function(error, docs){
                if(docs.redeemed == "no"){
                    Code.updateOne({code: args[0]}, {$set: {redeemed: "yes", owner: message.author.username}}, function(error){
                        if(error) return null;
                        message.channel.send("Welcome partner to the robloxian wild west of DisBlox. \n Code successfully redeemed.")
                    }).catch(error=> {
                      return message.channel.send(error);
                    });
                } else {
                    return message.channel.send("Woah there partner, this code is already used you sneaky ninja.")
                }
              });    
             }
        });
    }
}