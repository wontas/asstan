const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const a = require("../ayarlar.json");

exports.run = async (client, message, args) => {
var kullanıcı = message.author;
  var sebep = args.slice(0).join("  ");
if(!sebep) return message.channel.send(new Discord.MessageEmbed()
.setTitle(`Uyarı`)
.setColor("#5865f2")
.setDescription(`<:red:939534786840637460> **AFK Moduna Geçmek İçin Bir Sebep Belirtmelisin!** `))
  let dcs15 = new Discord.MessageEmbed()
    .setTitle(`Uyarı! `)
    .setTimestamp()
    .setFooter(client.user.username)
    .setThumbnail(message.author.avatarURL)
   .setDescription(`**AFK Moduna Girmek İçin Onay Veriyor Musun ?**`)
    .setColor("#5865f2");

  message.channel.send(dcs15).then(sunucu => {
    sunucu.react("<:onayland:939534786555441253>").then(() => sunucu.react("<:red:939534786840637460>"));

    let yesFilter = (reaction, user) =>
      reaction.emoji.name === "onayland" && user.id === message.author.id;
    let noFilter = (reaction, user) =>
      reaction.emoji.name === "red" && user.id === message.author.id;

    let yes = sunucu.createReactionCollector(yesFilter, { time: 0 });
    let no = sunucu.createReactionCollector(noFilter, { time: 0 });

    yes.on("collect", r => {
      message.member.setNickname(`[AFK] ${message.member.displayName}`)
      db.set(`afktag_${message.author.id}`, message.member.displayName)
      let dcs16 = new Discord.MessageEmbed()
        .setTitle(`<:onayland:939534786555441253>** İşlem Başarılı!**`)
        .setDescription(`**AFK Moduna Girdiniz!**`)
        .setColor("#5865f2")
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setFooter(message.guild.name);
      message.channel.send(dcs16).then(x => {
        x.delete(5000);
      });
      
    });
    db.set(`afk_${kullanıcı.id}`, sebep);
    db.set(`afk_süre_${kullanıcı.id}`, Date.now());
    no.on("collect", r => {
    db.delete(`afk_${kullanıcı.id}`, sebep);
    db.delete(`afk_süre_${kullanıcı.id}`, Date.now());
      message.channel.send(`**İptal Edildi!**`)
    });
  });
    };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
    name: "afk",
  };