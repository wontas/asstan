 const Discord = require('discord.js');
 const db = require("quick.db")
const { MessageButton, MessageActionRow } = require("discord-buttons");

  exports.run = async (client, message, args) => {

  if (!["939899460090200064"].includes(message.author.id)) {
    return; 
  }

const buton = new MessageButton()
.setStyle("blurple")
.setEmoji("📩")
.setID("ticket")

	const embed = new Discord.MessageEmbed()
  .setColor("5865f2")
  .setAuthor("Merhaba,")
	.setDescription(`<:sagok:897509174395670599> **Destek Talebi Oluşturmak İçin Aşağıdaki Butona Tıklayabilirsin**`)
  .setFooter("Websitemiz : https://ankacode.xyz")
  
await message.channel.send('', {embed: embed, component: buton})
  }

  exports.conf = {
    aliases: [],
   }

  exports.help = {
    name: 'tt',
    description: "Ticket komutunu atar.",
   }