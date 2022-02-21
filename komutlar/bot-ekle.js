const Discord = require('discord.js');

/////FİBER CODE
exports.run = function(client, message, args) {

    let botid = args[0]
    let prefix = args[1]
  let onaylımı = args[2]
  let basvuru = "939533626725498960"// başvurunun gideceği kanal
    let kanal = "939533623600762940" // başvurunun yapılacağı kanal
  let log = "939533626725498960" // bot log kanalı
    
  if (message.channel.id !== kanal) return message.channel.send(`<:red:939534786840637460> **Bu Komutu Sadece <#${kanal}> Kanalında Kullanabilirsin.**`).then(m => m.delete({timeout: 5000}));
    if (message.channel.id == kanal) {
  if (!botid) return message.channel.send(`<:red:939534786840637460>** Botunun ID'sini yazmalısın.**`).then(m => m.delete({timeout: 5000}));
  if (!prefix) return message.channel.send(`<:red:939534786840637460> **Botunun prefixini yazmalısın.**`).then(m => m.delete({timeout: 5000}));
  if (!onaylımı) return message.channel.send(`<:red:939534786840637460>** Botunun Dbl onaylımı onu yazmalısın.**`).then(m => m.delete({timeout: 5000}));
  message.delete()
  const basvuruuu = new Discord.MessageEmbed()
  .setColor("#5865f2")
  .setDescription(`> <:discord:939534787050360833>** ${message.author} Adlı Kullanıcı <@${botid}> Adlı Botu İle Başvuruda Bulundu. Botu İncelenmeyi ve Onaylanmayı Bekliyor.**`)
  const embed = new Discord.MessageEmbed()
  .setColor("#5865f2")
  .setDescription(`
●▬▬▬▬▬▬▬▬[Sahip Bilgiler]▬▬▬▬▬▬▬▬●

> **Bot Sahibi** - \`${message.author.tag}\`
> **Bot Sahibi ID** - \`${message.author.id}\`

●▬▬▬▬▬▬▬▬▬[Bot Bilgiler]▬▬▬▬▬▬▬▬▬●

> **Bot ID** - \`${botid}\`
> **Bot Prefix** - \`${prefix}\`
> **Bot Onaylımı?** - \`${onaylımı}\`
> **Bot Davet Linki** - ${`https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0`}
`);
  client.channels.cache.get(basvuru).send(embed)
  client.channels.cache.get(log).send(basvuruuu)
  message.channel.send(` <:onayland:939534786555441253>** Bot Başvuru İsteğiniz Alındı.**`).then(m => m.delete({timeout: 5000}));
  }
};
////FİBER CODE
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-ekle'],
  permLevel: 0
};

exports.help = {
  name: 'botekle', 
  description: "Sunucuya bot eklemenizi sağlar.",
  usage: 'botekle <botid> <prefix>'
};