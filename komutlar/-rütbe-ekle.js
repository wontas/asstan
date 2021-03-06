const Discord = require("discord.js");
const Database = require("../Helpers/Database");
// exports.onLoad = (client) => {};
/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {
       if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Yetkiniz Bulunmamaktadır"); //pythonic

    
    var roleId = message.mentions.roles.first(), targetInvite = Number(args[1]);
  /*  if(!message.guild.roles.cache.has(roleId)) return message.reply("no such role.");*/
    if(isNaN(targetInvite)) return message.reply("Bir Numara Gir");//pythonic

    const db = new Database("./Servers/" + message.guild.id, "Rewards");//pythonic

    var rewards = db.get("rewards") || [];//pythonic
    rewards.push({
        Id: roleId.id,
        Invite: targetInvite
    });

    db.set("rewards", rewards);
const embed = new Discord.MessageEmbed()
.setDescription(`**${roleId} Rolüne Ulaşabilmek İçin Toplam ${targetInvite} Davet Yapmaları Gerekmektedir.**`)//pythonic
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'rütbe-ekle',
  description: 'Logo Yaparsınız',
  usage: 'm-logo <yazı>'
};
