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
// Zenzkey & Lolkey
global.zenzkey = "Your Key";
global.lolkey = "Your Key";

// Start Suplier
//======>DIGIFLAZZ<======//
global.usernamekey = "Your Key";
global.productionkey = "Your Key";
//======>APIGAMES<======//
global.merchantapigames = "Your Key";
global.secretapigames = "Your Key";
global.signatureapigames = "Your Key";
//======>VIPRESELLER<======//
global.reselerkey = "Your Key";
global.reseleridkey = "Your Key",
//======>ATLANTIC<======//
global.atlantickey = "Your Key",
// End Suplier

global.tanggalserver = `${moment.tz('Asia/Jakarta').format('DD/MM/YY')}`;
global.waktuserver = `${moment.tz('Asia/Jakarta').format('HH:mm:ss')}`; 

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })

// Setting Limit
global.limitrate = "1"; // Pengurangan Satu Limit Setiap Trx
global.hargalimit = "200"; // Harga 1 Limit Rp
global.profit = `${global.hargalimit} / ${global.limitrate}`;   
// End Setting Limit 

// Set Minimal
global.minimaldepo = "10000";
global.minimallimit = "100";
// End Minimal

global.owner = ["6285742632270"];
global.packname = "Whats Payment";
global.author = "RezaDevv";
global.versionscript = "1.3.0";
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
