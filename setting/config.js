/**
 * Source Code By Reza
 * Don't Forget Smile
 * Thank You :)
*/

const fs = require("fs");
const chalk = require("chalk");
const moment = require('moment-timezone');

function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
}

// Website Api
global.APIs = {
  zenz: "https://api.zahwazein.xyz",
  lol: "https://api.lolhuman.xyz",
};

// Apikey Website Api
global.APIKeys = {
  "https://api.zahwazein.xyz": "Your Key",
  "https://api.lolhuman.xyz": "Your Key",
};

// Start suplier digiflazz
global.username = "Your Key";
global.production = "Your Key";
// End digiflazz

//Start api games
global.merchantapigames = "Your Key";
global.secretapigames = "Your Key";
global.signatureapigames = "Your Key";
// End games

// Start Vip Reseler
global.reselerkey = "Your Key";
global.reseleridkey = "Your Key",
// End Reseler

global.zenzkey = "Your Key";
global.lolkey = "Your Key";

global.tanggalserver = `${moment.tz('Asia/Jakarta').format('DD/MM/YY')}`;
global.waktuserver = `${moment.tz('Asia/Jakarta').format('HH:mm:ss')}`;

  let md5 = require('md5')
  let sign = md5(global.reseleridkey + global.reselerkey)
  let axios = require('axios')
  axios('https://vip-reseller.co.id/api/profile',{method: 'POST',data: new URLSearchParams(Object.entries({key: global.reselerkey,sign: sign}))}).then((res) => {
    global.resellersaldo = `${formatmoney(res.data.data.balance)}`;
})   

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })

global.owner = ["6285742632270"];
global.packname = "Whats Payment";
global.author = "RezaDevv";
global.session = "whats-payment";
global.mess = {
  wait: "Loading...",
  owner: "Fitur Khusus Owner Bot",
  waitdata: "Melihat Data Terkini...",
  admin: "Fitur Khusus Admin Group!",
  group: "Fitur Digunakan Hanya Untuk Group!",
  private: 'Fitur Digunakan Hanya Untuk Private Chat!',
  botAdmin: "Bot Harus Menjadi Admin Terlebih Dahulu!",
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
