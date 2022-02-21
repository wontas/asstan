const Discord = require('discord.js');


exports.run = function(client, message, args) {
  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`❌ Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
    let botisim = args[0]
  let sahip = args[1]
  let sebep = args.slice(2).join(" ");
  
  
  
    let log = "939533626725498960" // bot log kanalı
  const red = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`> <:red:939534786840637460> **<@${sahip}> Adlı Kullanıcının <@${botisim}> Adlı Botu İncelendi ve Reddedildi. Sebep :** **${sebep}**\n **Reddeden Yetkili: ${message.author}**`)
    
    if (!botisim) return message.channel.send(`<:red:939534786840637460> **Botun idsini yazmalısın.**`).then(m => m.delete({timeout: 5000}));
  if (!sebep) return message.channel.send(`<:red:939534786840637460> **Botu neden onaylamadığını yazmalısın.**`).then(m => m.delete({timeout: 5000}));
    if (!sahip) return message.channel.send(`<:red:939534786840637460> ** Bot Sahibi id yazman lazım.**`).then(m => m.delete({timeout: 5000}));
  message.delete()
        client.channels.cache.get(log).send(red);
        message.channel.send(`<:red:939534786840637460> **Botu Reddettiniz.**`).then(m => m.delete({timeout: 5000}));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-reddet', 'reddet'],
  permLevel: 3
};

exports.help = {
  name: 'botreddet', 
  description: "Sunucuya eklenen botu reddeder.",
  usage: 'botreddet <bot ismi> - <sebep>'
};
