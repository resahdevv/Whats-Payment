/**
 * Source Code By Reza
 * Don't Forget Smile
 * Thank You :)
*/

const fs = require("fs");
const chalk = require("chalk");
const moment = require('moment-timezone');

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
global.usernamekey = "Your Key";
global.productionkey = "Your Key";
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

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })

global.owner = ["6285742632270"];
global.packname = "Whats Payment";
global.author = "RezaDevv";
global.versionscript = "1.1.0";
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
