const Discord = require('discord.js');

///FİBER CODE
exports.run = function(client, message, args) {
  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`❌ Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
    let botisim = args[0]
  let sahip = args[1]
  
    let log = "939533626725498960" // bot log kanalı
  let guild1 = "843738287982247956"//DEVELOPER ROLÜ VERİLCEK SUNUCU İD
  let devrole = "939533460933066762"//DEVELOPER ROLÜ İD 
  const onay = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(`> <:onayland:939534786555441253> **<@${sahip}> Adlı Kullanıcının <@${botisim}> Adlı Botu İncelendi ve Onaylandı.**\n **Onaylayan Yetkili: ${message.author}**`)
    
    if (!botisim) return message.channel.send(`**<:red:939534786840637460> Botun İdsini Yazmalısın.**`).then(m => m.delete({timeout: 5000}));
  message.delete()
        client.channels.cache.get(log).send(onay)      
  message.channel.send(`<:onayland:939534786555441253> **Botu Onayladınız.**`).then(m => m.delete({timeout: 5000}));
  client.guilds.cache.get(guild1).members.cache.get(sahip).roles.add(devrole); // ONAYLANINCA OTOMATİK DEVELOPER ROLÜ VERİYOR
 
};
/////FİBER CODE
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-onayla', 'onayla'],
  permLevel: 3
};

exports.help = {
  name: 'botonayla', 
  description: "Sunucuya eklenen botu onaylar.",
  usage: 'botonayla <bot ismi>'
};