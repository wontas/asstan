const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");
const wiodb = require("wio.db");
const ms = require("ms");
const Canvas = require("canvas"); //pythonic
const ayarlar = require("./ayarlar.json"); //pythonic
const { MessageButton, MessageActionRow } = require("discord-buttons");
require("discord-buttons")(client);
const roldb = require("quick.db");
const fetch = require("node-fetch");
require("./invite.js");
require("events").EventEmitter.prototype._maxListeners = 70;
require("events").defaultMaxListeners = 70;
process.on("warning", function(err) {
  if ("MaxListenersExceededWarning" == err.name) {
    process.exit(1);
  }
}); //pythonic
function foo() {
  return new Promise((resolve, reject) => {
    return resolve();
  });
}
async function foobar() {
  foobar();
  foo()
    .then(() => {})
    .catch(() => {});
  foobar().catch(console.error);
}

var prefix = ayarlar.prefix;
client.ayarlar = { prefix: "a!",sahip: "500683643363262506" };

Discord.Role.prototype.toString = function() {
  return `@${this.name}`;
};
const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`); //pythonic
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`); //pythonic
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name); //pythonic
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]; //pythonic
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name); //pythonic
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]; //pythonic
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

client.login(process.env.token).then(
  function() {
    console.log("[Token-Log] Token doğru bir şekilde çalışıyor.");
  },
  function(err) {
    console.log("[ERROR] Token'de bir hata oluştu: " + err);
    setInterval(function() {
      process.exit(0);
    }, 20000);
  }
);

//--------------------------------------------------- KOMUTLAR ------------------------------------------------------------\\

/////////////////////////////////
client.on("message", message => {
  let channel1 = "853166689139032064";
  let aboneRolü = "853166664521482240";
  let yetkiliRol = "853166659299442708";
  let log = "853166689139032064";

  if (message.channel.id === channel1) {
    var Staffarray = [];
    message.guild.members.cache.forEach(hm => {
      if (hm.roles.cache.has(yetkiliRol)) {
        Staffarray.push(hm.id);
      } else {
        return;
      }
    });

    if (message.author.bot) return;
    if (message.attachments.size < 1) return;

    message.react("<:onayla:933625466189910056>");
    message.react("<:reddet:933625465766301728>");
    message.reply(
      "**Attığın SS `Son Video` Değilse, `Like` ve `Yorum` Yapmadıysan, `Abone` Olmadıysan Altyapı Rolü Verilmez. Aynı Zamanda Tam Ekranda Olmak Zorunda.**\n**Eğer SS Doğru İse Rolün Kısa Süre İçinde Yetkililer Tarafından Verilir.**"
    );
    const onayFilter = (reaction, user) =>
      reaction.emoji.name === "onayla" && Staffarray.includes(user.id);

    const retFilter = (reaction, user) =>
      reaction.emoji.name === "reddet" && Staffarray.includes(user.id);

    const onayCollector = message.createReactionCollector(onayFilter);
    const retCollector = message.createReactionCollector(retFilter);

    onayCollector.on("collect", (reaction, user) => {
      message.reactions.removeAll();

      message.member.roles.add(aboneRolü);
      client.channels.cache
        .get(log)
        .send(
          `> <:onayla:933625466189910056> **${message.author} Adlı Üyeye ${user} Adlı Yetkili Tarafından Başarıyla Altyapı Rolü Verildi.**\n> **Efsane Altyapılarımıza Ve Kodlarımıza https://ankacode.xyz Adresinden Ulaşabilirsiniz.**`
        );
    });

    retCollector.on("collect", r => {
      message.reactions.removeAll();

      client.channels.cache
        .get(log)
        .send(
          `> <:reddet:933625465766301728> **${message.author} Adlı Üyeye Altyapı Rolü Verilemedi. Şartlar Eksik Lütfen <#853166692989141012> Kanalını Tekrar Okuyunuz.**`
        );
    });
  }
});

//--------------------------------------------------- KOMUTLAR ------------------------------------------------------------\\
const disbut = require('discord-buttons');
client.on('clickButton', async (button) => {

  const onybuton = new disbut.MessageButton()
    .setLabel('Onaylandı')
    .setStyle('green')
    .setID('ony')
    .setDisabled();

    const onaymsj = new Discord.MessageEmbed()
    .setAuthor('Anka Code', button.message.guild.iconURL({dynamic: true, type: 'gif', size: 1024}))
    .setDescription(`<a:tik:839244211890028594> **Başvurunuz Onaylandı ve Yetkili Rolleriniz Verildi, Tebrikler**`)
    .setColor('GREEN');



    const data = await db.get(`basvur.${button.message.id}`)
    if(!data) return;
  const basvuruGonderenID = data;

  if(button.id === 'onay'){
    button.reply.defer()
	const isimdes = client.users.cache.get(basvuruGonderenID);
    await button.message.edit(`**<@${basvuruGonderenID}> Adlı Kişinin, Başvurusu \`${button.clicker.user.tag}\` İsimli Yetkili Tarafından Kabul Edildi**`, onybuton)
    await client.channels.cache.get(ayarlar.onayred).send(`<@${basvuruGonderenID}>,`, onaymsj)
    await client.guilds.cache.get(ayarlar.sunucuid).members.cache.get(basvuruGonderenID).roles.add(ayarlar.yetkilirolid)
	isimdes.send('Selam! Ben Assistant \nYaptığın Yetkili Başvurusu Onaylandı, Öncelikle Tebrik Ederim Artık Yetkili Ekibimizdensin. <:Gift:905849939396001882> \nAncak Bazı Görevlerin Olucak Alta Bunları Anlatıcam İyi Dinle Olur Mu ? \n\n\n **1 -** <#853166689139032064> Kanalında Aktif Bir Şekilde Çalışmak <#853166692989141012> Bir Kez Daha Okumanı Tavsiye Ederim.\nAbone Rol Verme Komutu = a!a <@kullanıcı> veya Resmin Altındaki Tik Emojisi, Eğer Attığı Resim Yanlış İse Çarpıya Tıklaman Yeterli Olacaktır.\n\n**2 -** <#871764089007931454> Bildiğin Hatalar Varsa Yardım Edebilirsin.\n\n**3 -** <#853166683195310091> Kanalını Oku Kurala Bile Uymadığın Zaman Sende Üyeler Gibi Ceza Yiyebilirsin.\n\n**4 **- <#860986950742835282> Her Etiket Geldiğinde Bakman Senin İçin İyi Olabilir Arada Toplantılar Olabilir Eğer Zorunlu olan Toplantılara Gelmezsen Destek Ekibinden Atılırsın.\n\n\n **Evet Ama Hep Böyle Sıkı Yönetim Mi Var Hep Çalışmak Mı Var?**\nTabikide Hayır. Arasıra Yetkili Ekibimiz Arasında Oynadığımız Eğlenceli Vakitlerde Oluyor, Birlikte Oyunlar Oynar Şakalaşırız.\n\n **Gelelim Ektiğimizi Biçmeye**\nAktif ve Düzenli Çalışmanın Ardından Tabikide Ödüller Var Eğer Kendini Gösterirsen Sırasıyla Yetkin Yükselicek ve Daha Üst Konumlarda Görev Alıcaksın. \n O Zaman Şimdiden Kolay Gelsin :) Anka Code Yetkili Ekibine Hoş Geldin :heart:')
  }
  if(button.id === 'red'){
    button.reply.defer()


    const sorular = [
      '**Reddedilme Sebebi?** <Cevap Vermek İçin 3 Dakikan Var>'
    ]
    let sayac = 0
    
    const filter = m => m.author.id === button.clicker.user.id
    const collector = new Discord.MessageCollector(button.channel, filter, {
      max: sorular.length,
      time: 3000 * 60
    })

    button.channel.send(sorular[sayac++])
    collector.on('collect', m => {
      if(sayac < sorular.length){
        m.channel.send(sorular[sayac++])
      }
    })


    collector.on('end', collected => {
      if(!collected.size) return button.channel.send('**Süre Bitti!**');
      button.channel.send('**Başvurunuz Başarıyla Reddedildi.**');

           
    const redbuton = new disbut.MessageButton()
    .setLabel('Reddedildi')
    .setStyle('red')
    .setID('red')
    .setDisabled();

    const redmsg = new Discord.MessageEmbed()
    .setAuthor('Anka Code', button.message.guild.iconURL({dynamic: true, type: 'gif', size: 1024}))
    .setDescription(`<a:carpi:839244319197364316> **<@${basvuruGonderenID}> Başvurunuz, \`${collected.map(m => m.content).slice(0,1)}\` Nedeniyle ${button.clicker.user} Tarafından Reddedildi**`)
    .setColor('RED');

     button.message.edit(`**<@${basvuruGonderenID}> Adlı Kişinin, Başvurusu, \`${collected.map(m => m.content).slice(0,1)}\` Nedeniyle, \`${button.clicker.user.tag}\` İsimli Yetkili Tarafından Başarıyla Reddedildi**`, redbuton)
     client.channels.cache.get(ayarlar.onayred).send(`<@${basvuruGonderenID}>,`, redmsg)
          })

    
  }
  db.delete(`basvuru.${button.message.id}`)

});


//--------------------------------------------------------------------------------------------\\

client.on("message", message => {
  // İhtimaller

   if (message.content !== "a!badge" || message.author.id !== ayarlar.sahip || message.author.bot) return;
   
  let beta = new MessageButton()
    .setStyle("grey") // Rengi ayarlayabilirsiniz.
    .setLabel("BETA!") // Adını Değiştirebilirsiniz.
    .setID("beta") // Elleme Bunu
    .setEmoji("909839133696983070");
  let verified = new MessageButton()
    .setStyle("grey") // Rengi ayarlayabilirsiniz.
    .setLabel("VERİFİED!") // Adını Değiştirebilirsiniz.
    .setID("verified") // Elleme Bunu
    .setEmoji("933628712912572486");
  let early = new MessageButton()
    .setStyle("grey") // Rengi ayarlayabilirsiniz.
    .setLabel("EARLY SUPPORTER!") // Adını Değiştirebilirsiniz.
    .setID("early") // Elleme Bunu
    .setEmoji("933629305194430534");
  message.channel.send(
    `
 >  **Selam! Aşağıdaki Butonlara Tıklayarak İstediğiniz Özelliği Elde Edebilirsiniz.**
  
> <:beta:909839133696983070> **[Beta] - Beta Kullanıcı Olursunuz**
> <:verified:933628712912572486> **[Verified] - Onaylı Kullanıcı Olursunuz**
> <:erkendonem:933629305194430534> **[Early Supporter] - Erken Dönem Destekçisi Kullanıcısı Olursunuz**
  `,
    {
      buttons: [beta, verified, early]
    }
  );
});
client.on("clickButton", async function(button) {
if (button.id === "beta") {
    if (button.clicker.member.roles.cache.get("909836643475816508")) {
      await button.clicker.member.roles.remove("909836643475816508");
      await button.reply.send(
        `**Başarıyla Beta Kullanıcılıktan Çıktın!**`,
        true
      );
    } else {
      await button.clicker.member.roles.add("909836643475816508");
      await button.reply.send("**Başarıyla Beta Kullanıcı Oldun!**", true); //BURAYADA GARTİC İO
    }
  }
  if (button.id === "verified") {
    if (button.clicker.member.roles.cache.get("909836852251492362")) {
      await button.clicker.member.roles.remove("909836852251492362");
      await button.reply.send(`**Başarıyla Onaylı Kullanıcılıktan Çıktın!**`, true);
    } else {
      await button.clicker.member.roles.add("909836852251492362");
      await button.reply.send("**Başarıyla Onaylı Kullanıcı Oldun!**", true); //BURAYADA GARTİC İO
    }
  }
  if (button.id === "early") {
    if (button.clicker.member.roles.cache.get("933629764051271680")) {
      await button.clicker.member.roles.remove("933629764051271680");
      await button.reply.send(
        `**Başarıyla Erken Dönem Destekçisi Kullanıcısı Olmaktan Çıktın!**`,true);
    } else {
      await button.clicker.member.roles.add("933629764051271680");
      await button.reply.send("**Başarıyla Erken Dönem Destekçisi Kullanıcısı Oldun!**", true); //BURAYADA GARTİC İO
    }
  }
});
//------------ }------------------------- AFK Main -------------------------------------//

client.on("message", async message => {
    const parsems = require("parse-ms");
  const db = require("quick.db");

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    let süre = await db.fetch(`afk_süre_${message.author.id}`);
    let zaman = parsems(Date.now() - süre);
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.member.setNickname(db.fetch(`afktag_${message.author.id}`));
    const afk_cikis = new Discord.MessageEmbed()
      .setColor("#5865f2")
      .setDescription(
        `<@${message.author.id}>\`${zaman.hours}\` **Saat**  \`${zaman.minutes}\` **Dakika** \`${zaman.seconds}\` **Saniye** , **AFK Modundaydın!**`
      );
    message.channel.send(afk_cikis);
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.fetch(`afk_${kullanıcı.id}`);

  if (sebep) {
    let süre = await db.fetch(`afk_süre_${kullanıcı.id}`);
    let zaman = parsems(Date.now() - süre);
    const afk_uyarı = new Discord.MessageEmbed()
      .setColor("#5865f2")
      .setDescription(
        `<@${kullanıcı.id}> Adlı Kullanıcı \`${sebep}\` Sebebiyle; \`${zaman.hours}\` **Saat**  \`${zaman.minutes}\` **Dakika** \`${zaman.seconds}\` **Saniyedir AFK!**`
      );
    message.reply(afk_uyarı);
  }
});

//------------------------------------- AFK Main -------------------------------------//

client.on("message", message => {
  // İhtimaller

  if (
    message.content !== "a!buton" || message.author.id !== ayarlar.sahip || message.author.bot) return;

  // BUTONLAR
  //--------------------------------\\

  // V/K
  let Vk = new MessageButton()
    .setStyle("gray") // Rengi ayarlayabilirsiniz.
    .setLabel("JavaScript") // Adını Değiştirebilirsiniz.
    .setID("V/K") // Elleme Bunu
    .setEmoji("893560393929224234");

  // D/C
  let Dc = new MessageButton()
    .setStyle("gray") // Rengi ayarlayabilirsiniz.
    .setLabel("Html") // Adını Değiştirebilirsiniz.
    .setID("D/C")
    .setEmoji("893560394612867112"); // Elleme Bunu

  // GARTIC.IO
  let Gartic = new MessageButton()
    .setStyle("gray") // Rengi ayarlayabilirsiniz.
    .setLabel("Diğer Kodlar") // Adını Değiştirebilirsiniz.
    .setID("Gartic") // Elleme Bunu
    .setEmoji("893562248512032778");
  // V/K
  let botl = new MessageButton()
    .setStyle("gray") // Rengi ayarlayabilirsiniz.
    .setLabel("Botlist") // Adını Değiştirebilirsiniz.
    .setID("botl")
    .setEmoji("911375665272614982"); // Elleme Bunu

  //--------------------------------\\

  message.channel.send(
    `
  <:tac:871701319549874176> **Selam, Sunucumuzdaki "Kod & BotList" Rollerini Almak İçin Butonlara Tıklamanız Yeterlidir.** 
   
  **__ROLLER__;**
   
  > \`>\` <@&829771804352577587> **Sahip Olmak İçin Butona Tıkla**
  > \`>\` <@&829771817077440564> **Sahip Olmak İçin Butona Tıkla**
  > \`>\` <@&829771834601242704> **Sahip Olmak İçin Butona Tıkla**
  > \`>\` <@&829771790024310865> **Sahip Olmak İçin 3 Davet Yapmalsın **
  > \`>\` <@&829771782075580446> **Sahip Olmak İçin 7 Davet Yapmalısın **
  > \`>\` <@&853166664521482240> **Sahip Olmak İçin 10 Davet Yapmalsın **
  > \`>\` <@&829771794252169237> **Sahip Olmak İçin 17 Davet Yapmalsın **
  > \`>\` <@&853166668887752714> **Botlist Kanallarını Görmek İçin Butona Tıkla** 
  `,
    {
      buttons: [Vk, Dc, Gartic, botl]
    }
  );
});

client.on("clickButton", async function(button) {
  // V/K
  if (button.id === "V/K") {
    if (button.clicker.member.roles.cache.get("829771804352577587")) {
      await button.clicker.member.roles.remove("829771804352577587");
      await button.reply.send("**JavaScript Rolü Üzerinizden Alındı.**", true);
    } else {
      await button.clicker.member.roles.add("829771804352577587");
      await button.reply.send("**JavaScript Rolü Üzerinize Verildi.**", true); //VAMPİR KÖYLÜ ROLUNU ÜÇYEREDE GİRİYORSUNUZ BEN DAHA ÖNCE GİRDİĞİM İÇİN YAPMICAM
    }
  }

  // D/C
  if (button.id === "D/C") {
    if (button.clicker.member.roles.cache.get("829771817077440564")) {
      await button.clicker.member.roles.remove("829771817077440564");
      await button.reply.send(`**HTML Rolü Üzerinizden Alındı.**`, true);
    } else {
      await button.clicker.member.roles.add("829771817077440564");
      await button.reply.send(`**HTML Rolü Üzerinize Verildi.**`, true); //BURAYADA AYNI ŞEKİDE DOĞRULUKMU CESARETMİ ROLU
    }
  }
  // GARTIC
  if (button.id === "Gartic") {
    if (button.clicker.member.roles.cache.get("829771834601242704")) {
      await button.clicker.member.roles.remove("829771834601242704");
      await button.reply.send(
        `**Diğer Kodlar Rolü Üzerinizden Alındı.**`,
        true
      );
    } else {
      await button.clicker.member.roles.add("829771834601242704");
      await button.reply.send("**Diğer Kodlar Rolü Üzerinize Verildi.**", true); //BURAYADA GARTİC İO
    }
  }
  if (button.id === "botl") {
    if (button.clicker.member.roles.cache.get("853166668887752714")) {
      await button.clicker.member.roles.remove("853166668887752714");
      await button.reply.send(`**Botlist Rolü Üzerinizden Alındı.**`, true);
    } else {
      await button.clicker.member.roles.add("853166668887752714");
      await button.reply.send("**Botlist Rolü Üzerinize Verildi.**", true); //BURAYADA GARTİC İO
    }
  }
});

client.on("message", message => {
  // İhtimaller

   if (message.content !== "a!reg" || message.author.id !== ayarlar.sahip || message.author.bot) return;
   
  let reg = new MessageButton()
    .setStyle("grey") // Rengi ayarlayabilirsiniz.
    .setLabel("") // Adını Değiştirebilirsiniz.
    .setID("reg") // Elleme Bunu
    .setEmoji("895015136044130354");
  message.channel.send(
    `
 <a:hello:933641881580081205> **Merhaba Hoşgeldin, 
  
 Sunucumuzdaki Tüm Kanalları Görebilmek İçin Aşağıdaki Butona Tıklayarak Kayıt Olabilirsin.** 
 
 **Eğlenceli Ve Güzel Vakit Geçirmenizi Dileriz.**
 
<:staff:893557780127031319> - ***Anka Code Yönetimi***
  `,
    {
      buttons: [reg]
    }
  );
});

client.on("clickButton", async function(button) {
  if (button.id === "reg") {
    if (button.clicker.member.roles.cache.get("853166665348284466")) {
      await button.clicker.member.roles.remove("853166665348284466");
      await button.reply.send(`**Tekrar Kayıt Olunuz.**`, true);
    } else {
      await button.clicker.member.roles.add("853166665348284466");
      await button.reply.send("**Kayıt Oldunuz**", true); //BURAYADA GARTİC İO
    }
  }
});

{
const cdb = require("quick.db")
client.on("clickButton", async button => {
const { MessageButton, MessageActionRow } = require("discord-buttons");

//------------\\
const evet = new MessageButton()
.setStyle("grey")
.setLabel("Evet")
.setEmoji("933625466189910056")
.setID("Evet");
const hayır = new MessageButton()
.setStyle("grey")
.setLabel("Hayır")
.setEmoji("933625465766301728")
.setID("Hayır");
const sil = new MessageButton()
.setStyle("grey")
.setLabel("Desteği Kapat")
.setEmoji("909067444117725194")
.setID("DesteğiKapat");
 const geriyükle = new MessageButton()
.setStyle("grey")
.setLabel("Geri Yükle")
.setEmoji("909068374636630067")
.setID("GeriYükle");
const kilit = new MessageButton()
.setStyle("grey")
.setLabel("")
.setEmoji("🔒")
.setID("Kilit");
//------------\\

//------------\\
let member = button.guild.members.cache.get(button.clicker.user.id)
let kanal  = button.guild.channels.cache.get(button.channel.id)
let data   = await cdb.get(`destekkullanıcı_${member.id}`);
let data2  = await cdb.get(`destekkanal_${kanal.id}`);
let user   = button.guild.members.cache.get(data2);
let yetkirol = button.guild.roles.cache.get("853166659299442708")
let kate = "857902933991358484"
//------------\\

//------------\\
if(button.id === "ticket"){
if(data) return button.reply.send("> <:reddet:933625465766301728> `Başarasız` **Zaten Aktif Destek Talebiniz Bulunuyor.** **Kanal:** <#" + data +">", true);

button.reply.think(true).then(async a => {
setTimeout(async()=> {

button.guild.channels.create('destek-' + member.user.username , { type: 'text', reason: 'Destek '+ member.user.tag }).then(async c => {
c.setParent(kate);

await cdb.set(`destekkanal_${c.id}`, member.id);
await cdb.set(`destekkullanıcı_${member.id}`, c.id);

            let role = button.guild.roles.cache.find(a => a.name === '@everyone')      
          await  c.createOverwrite(role, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            });
          await  c.createOverwrite(yetkirol.id, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
            });
          await  c.createOverwrite(member.id, {  
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
            })

a.edit("> <:onayla:933625466189910056>  `Başarılı!` **Destek Talebiniz Oluşturuldu.** **Kanal:** <#" + c.id +">")
await c.send(`${member.user}, **Hoş Geldin Destek Ekibimiz Sizinle İlgilenecektir.** \n@everyone`, kilit)
}, 2000)
})
});

}
//------------\\

//------------\\
if(button.id === "Kilit"){
button.message.edit(`> <a:dikkat:909067019310211133> \`Dikkat!\` **Destek Talebini Kapatmak İstediğine Emin Misin?**`,{
buttons: [evet, hayır]
})

button.reply.defer()
}
//------------\\

//------------\\
if(button.id === "Evet"){

 await      kanal.createOverwrite(user, {  
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            })

await button.message.delete()
await button.channel.send("> <a:kilit:909067444117725194> \`Kapalı!\` <@" + member + `> **Tarafından Destek Talebi Kapatıldı.**`,{
buttons: [sil, geriyükle]
})

await kanal.setName("kapalı-"+ user.user.username)

button.reply.defer()
}
//------------\\

//------------\\
if(button.id === "GeriYükle"){
          await  kanal.createOverwrite(user, {  
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
            })

await button.channel.send("> <a:dikkat:909067019310211133> \`Dikkat!\`` <@" + user + `> **Destek Talebi Tekrar Açıldı.**`,{
buttons: [kilit]
})

await kanal.setName("destek-"+ user.user.username)

await button.message.delete()
button.reply.defer()
}
//------------\\

//------------\\
if(button.id === "DesteğiKapat"){
await cdb.delete(`destekkanal_${kanal.id}`);
await cdb.delete(`destekkullanıcı_${user.id}`);

button.channel.delete()
button.reply.defer()
}
//------------\\

//------------\\
if(button.id === "Hayır"){
button.message.edit("<@" + user + `> **Destek Ekibimiz Seninle İlgilenecek.**\n <@853166659299442708> `,  kilit)

button.reply.defer()
}
//------------\\

}); 

client.on("guildMemberRemove", async member => {

//------------\\
let data   = await cdb.get(`destekkullanıcı_${member.id}`);
let data2  = await cdb.get(`destekkanal_${data}`);
let kanal  = member.guild.channels.cache.get(data)
//------------\\

if(!data) return;

//------------\\
await cdb.delete(`destekkanal_${data.id}`);
await cdb.delete(`destekkullanıcı_${member.id}`);

kanal.delete()
//------------\\

})
client.on("channelDelete", async channel => {

//------------\\
let data  = await cdb.get(`destekkanal_${channel.id}`);
let data2   = await cdb.get(`destekkullanıcı_${data}`);
//------------\\

if(!data) return;

//------------\\
await cdb.delete(`destekkanal_${channel.id}`);
await cdb.delete(`destekkullanıcı_${data}`);

//------------\\

})
}
  