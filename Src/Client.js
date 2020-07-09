const Discord = require("discord.js");
const FileSystem = require("fs");
const Client = new Discord.Client();
const Token = require("./Storage.json")
const Mongoose = require("mongoose");
const DemoteQueue = require('./Schemas/DemoteQueue');
const PromoteQueue = require('./Schemas/PromoteQueue');
const ExileQueue = require('./Schemas/ExileQueue');
const ShoutQueue = require('./Schemas/ShoutQueue');
const FireQueue = require('./Schemas/FireQueue');
const setRankQueue = require('./Schemas/SetRankQueue');
const Noblox = require("noblox.js");
const Code = require("./Schemas/Code");
const prefix = "-";
Client.Commands = new Discord.Collection();

// Load up express

setInterval(function(){
     DemoteQueue.findOne({}, function(error, docs){
        if(error) return console.log(error);
      if(!docs){
         return null;
     } else {
        Noblox.cookieLogin(docs.cookie).then(success => {
            Noblox.getIdFromUsername(docs.member).then(success_id => {
               Noblox.getRankNameInGroup(docs.group, success_id).then(before_rank => {
                 Noblox.demote(docs.group, success_id).then(success_demote => {
                    Noblox.getRankNameInGroup(docs.group, success_id).then(after_rank => {
                     var successDemotion = new Discord.RichEmbed()
                     .setAuthor("DisBlox")
                     .setTitle("Successfully demoted "+docs.member+".")
                     .addField("Before Rank", before_rank, true)
                     .addField("After Rank", after_rank, true)
                     .setColor("#36393E")
                     Noblox.clearSession(docs.cookie);
                        Client.channels.get(docs.channel).send(successDemotion);
                           DemoteQueue.findOneAndDelete({member: docs.member}, function(error, docs1){
                              if(error) return console.log(error);
                           });
                    });
                 });
               });
            }).catch(error => {
                return console.log(error);
            });
        }).catch(error => {
          return console.log(error);
        });
      }
     });
}, 2500);

setInterval(function(){
    PromoteQueue.findOne({}, function(error, docs){
      if(error) return console.log(error);
      if(!docs){
         return null;
     } else {
      Noblox.cookieLogin(docs.cookie).then(success => {
         Noblox.getIdFromUsername(docs.member).then(success_id => {
            Noblox.getRankNameInGroup(docs.group, success_id).then(before_rank => {
              Noblox.promote(docs.group, success_id).then(success_promote => {
                 Noblox.getRankNameInGroup(docs.group, success_id).then(after_rank => {
                  var successPromotion = new Discord.RichEmbed()
                  .setAuthor("DisBlox")
                  .setTitle("Successfully promoted "+docs.member+".")
                  .addField("Before Rank", before_rank, true)
                  .addField("After Rank", after_rank, true)
                  .setColor("#36393E")
                  Noblox.clearSession(docs.cookie);
                     Client.channels.get(docs.channel).send(successPromotion);
                        PromoteQueue.findOneAndDelete({member: docs.member}, function(error, docs1){
                           if(error) return console.log(error);
                        });
                 });
              });
            });
         }).catch(error => {
             return console.log(error);
         });
     }).catch(error => {
       return console.log(error);
     });
     }
    });
}, 2500)

setInterval(function(){
     ExileQueue.findOne({}, function(error, docs){
        if(!docs){
           return null;
        } else {
         Noblox.cookieLogin(docs.cookie).then(success => {
            Noblox.getIdFromUsername(docs.member).then(success_id => {
               Noblox.getRankNameInGroup(docs.group, success_id).then(before_rank => {
                 Noblox.exile(docs.group, success_id).then(success_exile => {
                     var successExile = new Discord.RichEmbed()
                     .setAuthor("DisBlox")
                     .setTitle("Successfully exiled "+docs.member+".")
                     .setColor("#36393E")
                     Noblox.clearSession(docs.cookie);
                        Client.channels.get(docs.channel).send(successExile);
                           ExileQueue.findOneAndDelete({member: docs.member}, function(error, docs1){
                              if(error) return console.log(error);
                           });
                 });
               });
            }).catch(error => {
                return console.log(error);
            });
        }).catch(error => {
          return console.log(error);
        });
        }
     });
}, 2500)

setInterval(function(){
   ShoutQueue.findOne({}, function(error, docs){
       if(!docs){
          return null;
       } else {
          Noblox.cookieLogin(docs.cookie).then(success => {
            Noblox.shout(docs.group, docs.content).then(finished => {
               var successShout= new Discord.RichEmbed()
               .setAuthor("DisBlox")
               .setTitle("Successfully shouted "+docs.content+".")
               .setColor("#36393E")
               Noblox.clearSession(docs.cookie);
               Client.channels.get(docs.channel).send(successShout);
                  ShoutQueue.findOneAndDelete({content: docs.content}, function(error, docs1){
                     if(error) return console.log(error);
                  });
            });
          });
       }
   });
}, 2500)

setInterval(function(){
    FireQueue.findOne({}, function(error, docs){
       if(!docs){
          return null;
       } else {
          Noblox.cookieLogin(docs.cookie).then(success => {
            Noblox.getIdFromUsername(docs.member).then(success_id => {
               Noblox.getRankNameInGroup(docs.group, success_id, before_fire => {
                Noblox.setRank(docs.group, success_id, 1).then(success => {
                   Noblox.getRankNameInGroup(docs.group, success_id,after_fire => {
                     var successFire= new Discord.RichEmbed()
                     .setAuthor("DisBlox")
                     .setTitle("Successfully fired "+docs.member+".")
                     .setColor("#36393E")
                     Noblox.clearSession(docs.cookie);
                     Client.channels.get(docs.channel).send(successFire);
                       FireQueue.findOneAndDelete({member: docs.member}, function(error, docs1){
                            if(error) return console.log(error);
                       });
                   });
                });
               });
            });
          });
       }
    });
}, 2500);

setInterval(function(){
    setRankQueue.findOne({}, function(error, docs){
       if(!docs){
          return null;
       } else {
          Noblox.cookieLogin(docs.cookie, success => {
            Noblox.getIdFromUsername(docs.member).then(success_id => {
              Noblox.getRankNameInGroup(docs.group, success_id, before_setrank => {
                Noblox.setRank(docs.group, success_id, docs.new_role).then(successful => {
                 Noblox.getRankNameInGroup(docs.group, success_id).then(after_rank => {
                  var successSetRank= new Discord.RichEmbed()
                  .setAuthor("DisBlox")
                  .setTitle("Successfully set rank "+docs.content+".")
                  .setColor("#36393E")
                  Noblox.clearSession(docs.google);
                  Client.channels.get(docs.channel).send(successSetRank);
                  setRankQueue.findOneAndDelete({member: docs.member}, function(error, docs){
                     if(error) return console.log(error);
                  });
                 });
                });
              });
            });
          });
       }
    });
}, 2500)

const express = require("express");
var httpserver = express();

//

Mongoose.connect("mongodb://localhost:27017/guilds", {useNewUrlParser: true});
Mongoose.connection.once("open", function(){
   console.log("Mongo connection open, lets make fireworks!")
});

const Commands = FileSystem.readdirSync(__dirname+"/Commands").filter(CommandFile=>CommandFile.endsWith(".js"));

for(let CommandFile of Commands){
   let Command = require(__dirname+"/Commands/"+CommandFile);
   Client.Commands.set(Command.name, Command)
}

Client.on("message", (message)=>{
   const args = message.content.slice(prefix.length).split(' ');
   const Command = args.shift().toLowerCase();
   if(message.author.bot || !message.content.startsWith(prefix)) return null;
   if(!Client.Commands.has(Command)) return null;
   try{Client.Commands.get(Command).execute(message,args,Client)}catch(error){message.channel.send("There were difficulties performing this command, please try again another time.");console.log(error)}
});
Client.on("ready", ()=>{console.log("The bot is ready, lets make fireworks!")});
Client.login(Token.token)

module.exports = function getCommand(cmd){
   if(!Client.Commands.has(cmd)) return message.channel.send("I could not find this command.");
   let tempCmd = Client.Commands.get(cmd);
   message.channel.send(tempCmd.description);
}

// Make express listen

var listener = httpserver.listen(17481, () => {
   console.log(`Expressjs HTTP server listening on port ${listener.address().port}!`);
});