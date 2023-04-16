/**
 * Source Code By Reza
 * Don't Forget Smile
 * Thank You :)
*/

const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment-timezone");
const axios = require("axios");

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
global.reseleridkey = "Your Key";
//======>ATLANTIC<======//
global.atlantickey = "Your Key";
// End Suplier

// Buyer_Sku_Code PASCABAYAR
global.skucodepln = "Your Sku Code";
global.skucodebpjs = "Your Sku Code";
global.skucodepdam = "Your Sku Code";

global.tanggalserver = `${moment.tz('Asia/Jakarta').format('DD/MM/YY')}`;
global.waktuserver = `${moment.tz('Asia/Jakarta').format('HH:mm:ss')}`; 

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })
// Berfungsi Untuk Hit Api & Mengirim Data Headers
const fetchJson = async (url, options = {}) => {
  try {
      const res = await axios({
          method: 'GET',
          url: url,
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
          },
          ...options
      })
      return res.data
  } catch (err) {
      return err
  }
}

(async () => {
  let fetch = await fetchJson(`https://www.tohastore09.com/index.json`)
  global.versionscript = fetch.version
  global.pesannya = fetch.message
})();

// Setting Limit
global.limitrate = "1"; // Pengurangan Satu Limit Setiap Trx
global.hargalimit = "200"; // Harga 1 Limit Rp
global.profit = `${global.hargalimit} / ${global.limitrate}`;   
// End Setting Limit 

// Set Minimal
global.minimaldepo = "10000";
global.minimallimit = "100";
// End Minimal

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
