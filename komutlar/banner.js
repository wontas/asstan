const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let uid = user.id


    let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${client.token}`
        }
    })

    let receive = ''
    let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif'

    response.then(a => {
        if (a.status !== 404) {
            a.json().then(data => {
                receive = data['banner']
                console.log(data)

                if (receive !== null) {

                    let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${client.token}`
                        }
                    })
                    let statut = ''
                    response2.then(b => {
                        statut = b.status
                        banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                        if (statut === 415) {
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                        }

                    })
                }
            })
        }
    })

    setTimeout(() => {
        if (!receive) return message.channel.send("**Bu Kullanıcının Profil Afişi Bulunamadı..**")
        let embed = new MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
            .setColor("#5865f2")
            .setDescription(`**[[PNG]](https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024)** - **[[JPEG]](https://cdn.discordapp.com/banners/${uid}/${receive}.jpg?size=1024)** - **[[GIF]](https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024)** - **[[WEBP]](https://cdn.discordapp.com/banners/${uid}/${receive}.webp?size=1024)**`)
            .setImage(banner)
        message.channel.send(embed)
    }, 1000)

}


exports.conf = {
  aliases: ['banner']
};

exports.help = {
  name: 'Banner',
  description: 'İstediğiniz kullanıcının Bannerını verir.',
  usage: 'banner <Kullanıcı Adı>',
};