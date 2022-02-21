const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
module.exports = client => {
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
client.user.setStatus("dnd");
var oyun = [
"a!yardım | a!başvur",
"a!avatar | a!banner",
"a!davetlerim"

];
setInterval(function() {

var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

client.user.setActivity(oyun[random], "htttps://twitch.com");
}, 2 * 2500);

}