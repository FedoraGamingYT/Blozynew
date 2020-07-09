const Discord = require("discord.js");
module.exports = {
    name: 'eval',
    description: 'Only for founders',
    execute(message,args,client){
      let embed = new Discord.RichEmbed()
      .setTitle("Evaluation")
      .setDescription("Sorry, the `eval` command can only be executed by the Developer.")
      .setColor("#cdf785");
      if(message.author.id === '289463060178010123' || message.author.id === '510666587209203752'){ //return message.channel.send(embed);
      function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }try {
          const code = args.join(" ");
          let evaled = eval(code);
          let rawEvaled = evaled;
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

      let embed = new Discord.RichEmbed()
          .setTitle(`Evaluated in ${Math.round(client.ping)}ms`)
          .addField(":inbox_tray: Input", `\`\`\`js\n${code}\n\`\`\``)
          .addField(":outbox_tray: Output", `\`\`\`js\n${clean(evaled).replace(client.token, "No no no")}\n\`\`\``)
          .addField('Type', `\`\`\`xl\n${(typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1)}\n\`\`\``)
          .setColor(functions.rcol());
          message.channel.send({embed});
        } catch (err) {

          message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
        }
    }else{
      return message.channel.send(`You do not have permission to do this!`);
    }
}
}
var functions = {
    rcol: () => {
      return Math.round(Math.random() * 16777215);
    },// Random color
    ec: (string) => {
      if (typeof(string) === "string")
        return string.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return string;
    },
      mtc: (ms) => {
      let x = ms / 1000;
      let s = Math.floor(x % 60);
      x /= 60;
      let m = Math.floor(x % 60);
      x /= 60;
      let h = Math.floor(x % 24);
      return `${h > 0 ? h + ":" : ""}${h > 0 ? (m > 9 ? m : "0" + m) : m}:${s > 9 ? s : "0" + s}`
    },// Turns milliseconds into time
    mtrl: (milliseconds) => {
      let x = milliseconds / 1000;
      let s = Math.floor(x % 60);
      x /= 60;
      let m = Math.floor(x % 60);
      x /= 60;
      let h = Math.floor(x % 24);
      x /= 24;
      let d = Math.floor(x);

      //Shortens the time message by clearing unnecessary things
      let timeStuff = "";
      if (d > 0){
        timeStuff += `${d} day${(d > 1 ? "s" : "") + ((h > 0 || m > 0 || s > 0) ? ", " : "")}, `;
      }
      if (h > 0){
        timeStuff += `${h} hour${(h > 1 ? "s" : "") + ((m > 0 || s > 0) ? ", " : "")}`;
      }
      if (m > 0){
        timeStuff += `${m} minute${(m > 1 ? "s" : "")  + (s > 0 ? ", " : "")}`;
      }
      if (s > 0) {
        timeStuff += `${(d > 0 || h > 0 || m > 0) ? "and " : ""}${s} second${s > 1 ? "s" : ""}`;
      }
      return timeStuff;
    },
    sti: (string) => {
      return string.replace(/[^0-9]/g, "");
    },
}
