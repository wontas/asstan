const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
exports.run = async (client, message, args) => {
  const anasayfaembed = new Discord.MessageEmbed()
  .setAuthor(`Merhaba, ${message.author.username}!`, message.author.avatarURL())
  .setDescription("**Efsane Altyapılarımıza Ve Kodlarımıza Sitemizden Ulaşabilirsin. Siteye Gitmek İçin Aşağıdaki Butona Tıklaman Yeterli**")
.setColor("#5865f2")//// embed örnektir siz kendinize göre düzenleyin
  let button3 = new MessageButton()
  .setStyle('url')
  .setLabel('Siteye Gitmek İçin Tıkla')
  .setURL('https://ankacode.xyz')
    
  let row = new MessageActionRow()

.addComponent(button3)
        await message.channel.send('', {embed: anasayfaembed, component: row})
  
  client.on('clickButton', async (button) => {
      
      
      if(button.id === "yardımpatlat"){
        message.channel.messages.fetch({ around: button.message.id, limit: 1 }).then(messages => {
            messages.first().delete()
      })
      await button.reply.send('Davet menüsü mesajı silindi.', true);
      }
    if(button.id === "anasayfa"){
          message.channel.messages.fetch({ around: button.message.id, limit: 1 }).then(messages => {
              messages.first().edit('', {embed: anasayfaembed, component: row})
        })
        await button.reply.send('Ana sayfaya geçildi.', true);
        }
    
    
})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sitemiz"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'site',
    description: 'site',
    usage: 'site'
  }