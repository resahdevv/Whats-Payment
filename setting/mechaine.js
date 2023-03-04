/**
 * Source Code By Reza
 * Don't Forget Smile
 * Thank You :)
*/

require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
// new module
const axios = require('axios');
const os = require('os');
const { exec } = require("child_process");
const speed = require('performance-now');
const { sizeFormatter } = require('human-readable');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const md5 = require('md5');
const moment = require('moment-timezone');
// end

//code by rezadevv
let money = JSON.parse(fs.readFileSync('./src/balance.json'))
let signup = JSON.parse(fs.readFileSync('./src/user.json'))
const ban = JSON.parse(fs.readFileSync('./src/banned.json'))
const isBanned = JSON.parse(fs.readFileSync('./src/banned.json'))
const PathAuto = "./src/depo/"
// end code

var profit = 100; // Keuntungan
    global.untung = `${profit}`;

let ptricelist = {
  ff: {
    UPF5: {
      nama: "5 Diamond",
      hargaid: 1000,
      harga: "Rp1.000",
    },
    UPF12: {
      nama: "12 Diamond",
      hargaid: 1800,
      harga: "Rp1.800",
    },
    UPF50: {
      nama: "50 Diamond",
      hargaid: 2700,
      harga: "Rp2.000",
    },
    UPF70: {
      nama: "70 Diamond",
      hargaid: 10000,
      harga: "Rp10.000",
    },
    UPF140: {
      nama: "140 Diamond",
      hargaid: 20.000,
      harga: "Rp20.000",
    },
    UPF355: {
      nama: "355 Diamond",
      hargaid: 50000,
      harga: "Rp50.000",
    },
    UPF720: {
      nama: "720 Diamond",
      hargaid: 100000,
      harga: "Rp100.000",
    },
  },
};
let pricelistml  = {
  "ml": {
    "ZIDMBL17": {
    "nama": "17 Diamond",
    "hargaid": 5000,
    "harga":"Rp5000",
    },
    "ZIDMBL34": {
    "nama": "34 Diamond",
    "hargaid": 9500,
    "harga":"Rp9.500",
    },
    "ZIDMBL50": {
    "nama": "50 Diamond",
    "hargaid": 14000,
    "harga":"Rp14.000",
    },
    "ZIDMBL66": {
    "nama": "66 Diamond",
    "hargaid": 18500,
    "harga":"Rp18.500",
    },
    "ZIDMBL74": {
    "nama": "74 Diamond",
    "hargaid": 20500,
    "harga":"Rp20.500",
    },
    "ZIDMBL83": {
    "nama": "83 Diamond",
    "hargaid": 23000,
    "harga":"Rp23.000",
    },
    "ZIDMBL184": {
    "nama": "184 Diamond",
    "hargaid": 50500,
    "harga":"Rp50.500",
    },
    "ZIDMBL366": {
    "nama": "366 Diamond",
    "hargaid": 100500,
    "harga":"Rp100.500",
    },
    "ZIDMBL758": {
    "nama": "758 Diamond",
    "hargaid": 201000,
    "harga":"Rp201.000",
    },
 },
}


// is function
const formatp = sizeFormatter({
  std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const jsonformat = (string) => {
  return JSON.stringify(string, null, 2)
}

const getGroupAdmins = (participants) => {
  let admins = []
  for (let i of participants) {
      i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
  }
  return admins || []
}

// Berfungsi Untuk Hit Api & Mengirim Data Headers
const fetchJson = async (url, options) => {
  try {
      options ? options : {}
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

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const runtime = function(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
}

function acakindong(min, max = null) {
  if (max !== null) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
  return Math.floor(Math.random() * min) + 1
  }
}

module.exports = reza = async (client, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
  
    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isBanned = ban.includes(m.sender)    
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const fatkuns = (m.quoted || m)
    const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const qmsg = (quoted.msg || quoted)
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];


    const cUrl = (url, method, payload = {}) => {
      let axios = require('axios')
      return axios(url, {
        method: method,
        data: new URLSearchParams(Object.entries(payload))
      })
      .then(({data}) => {
        if (payload.type_mess == 'buy') {
          if (data.result) {
            moneyAdd(m.sender, data.data.price + profit)
      messn = `*── 「 TRX PULSA SUKSES 」 ──*\n\n_📌 Harga : Rp${data.data.price + profit}_\n_📌 Nomor : ${data.data.data.includes('.') ? data.data.data.split('.')[1] : data.data.data}_\n_📌 Nama Item : ${data.data.service}_\n_📌 Trx Id : ${data.data.trxid}_\n\n*_Item Akan Segera Masuk Secara Otomatis Silahkan Melakukan Pengecekan Secara Berkala!._*\n\nNote: *_Jika Ada Kesalahan Nomor Bukan Tanggung Jawab Owner Dan Silahkan Tunggu 5 Menit Untuk Melakukan Transaksi Selanjutnya!.._*`
    let buttons = [
    { buttonId: `${prefix}cek ${data.data.trxid}`, buttonText: { displayText: 'Cek Trx' }, type: 1 },
    ]
    client.sendButtonText(from, buttons, `${messn}`,`@RezaDevv`, m)
    fs.unlinkSync(`./src/depo/${sender}1.json`)
          } else {
            if (data.message == 'Saldo Anda tidak cukup untuk melakukan pemesanan ini.') {
              reply('*_Maaf Saldo Server Whats Payment Belum Terisi, Silahkan Tunggu Jam Reset Saldo Server Mulai 12.00/18.00_*')
              fs.unlinkSync(`./src/depo/${sender}1.json`)
            } else {
              reply(`_pembelian gagal_\n_reason: ${data.message}_`)
              fs.unlinkSync(`./src/depo/${sender}1.json`)
            }
          }
        } else if (payload.type_mess == 'cek') {
          if (data.result) {
            let note = data.data[0].note
            let wosk = `*── 「 STATUS TRX KAMU 」 ──*\n\n_📌 Harga : Rp${data.data[0].price + profit}_\n_📌 Nomor : ${data.data[0].data.includes('.') ? data.data[0].data.split('.')[1] : data.data[0].data}_\n_📌 Nama Item : ${data.data[0].service}_\n_📌 Trx Id : ${data.data[0].trxid}_\n_📌 Serial : ${note.replace("Transaksi Gagal ", "Transaksi Gagal")}_\n\n*_Item Akan Segera Masuk Secara Otomatis Silahkan Melakukan Pengecekan Secara Berkala!._*\n\nNote: *_Jika Ada Kesalahan Nomor Bukan Tanggung Jawab Owner!._*`
            let buttons = [
    { buttonId: `${prefix}cek ${data.data[0].trxid}`, buttonText: { displayText: 'Cek Trx' }, type: 1 },
    ]
    client.sendButtonText(from, buttons, `${wosk}`, `@RezaDevv`, m)
          } else {
            reply(data.message)
          }
        }
      })
    }
    
    const pulsabuy = (data = {}) => {
      let base_url = 'https://vip-reseller.co.id/api/prepaid'
      let api_key = reselerkey
      let api_id = reseleridkey
      let sign = md5(api_id + api_key)
      
      if (['buy','cek'].includes(data.type) == false) return reply('*_harap masukan orang yang benar_*')
    
      let ceng = cUrl(base_url,
        'POST',
        {
          key: api_key,
          sign: sign,
          type: (data.type == 'buy') ? 'order': 'status',
          service: data.id_service,
          data_no: data.target,
          type_mess: data.type,
          trxid: data.trxid
        })
      return ceng
    }
    
    const updatepl = (prov) => {
      let base_url = 'https://vip-reseller.co.id/api/prepaid'
      let api_key = reselerkey // get on config.js
      let api_id = reseleridkey // get on config.js
      let sign = md5(api_id + api_key) // signature cuyyy
      // import md5 nya cuyy
      let payload = {
        key: api_key,
        sign: sign,
        type: 'services',
        filter_type: 'brand',
        filter_value: prov.id
      }
      return new Promise((resolve, reject) => {
        let axios = require('axios')
        axios(`${base_url}`, {method: 'POST', data: new URLSearchParams(Object.entries(payload))}).then((data) => {
      
          let daftar = []
          for (let i of data.data.data) {
            if (i.type == 'pulsa-reguler' && i.status == 'available') {
              daftar.push({id: i.code, price: i.price.basic + 100,name: i.name})
            }
          }
          fs.writeFileSync(prov.file, JSON.stringify(daftar, null, 2))
          resolve({
            status: true,
            list: daftar
          })
        }).catch(reject)
      })
    }

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);

      client.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    };

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isGroup = m.isGroup
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isUser = signup.includes(sender)

    const addMonUser = (sender, amount) => {
      let position = false
      Object.keys(money).forEach((i) => {
        if (money[i].id === sender) {
          position = i
        }
      })
      if (position !== false) {
        money[position].money += amount
        fs.writeFileSync('./src/balance.json', JSON.stringify(money))
      }
    }
    
    const moneyAdd = (sender, amount) => {
      let position = false
      Object.keys(money).forEach((i) => {
        if (money[i].id == sender) {
          position = i
        }
      })
      if (position !== false) {
        money[position].money -= amount
        fs.writeFileSync('./src/balance.json', JSON.stringify(money))
      }
    }
    const getMonUser = (sender) => {
        let fiendh = false
      for (let potonlmt of money) {
        if (potonlmt.id === sender) {
           global.userPoton = potonlmt.money
          fiendh = true
          return global.userPoton
        }
      }
      //function adven
      if (fiendh === false) {
        let obj = { id: sender, money: 0 }
        money.push(obj)
        fs.writeFileSync('./src/balance.json', JSON.stringify(money))
      }
      }

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    // Jika ada user
    if (isCmd2 && !isUser) {
      signup.push(sender)
      fs.writeFileSync('./src/user.json', JSON.stringify(signup, null, 2))
    }

    if (isCmd2 && !m.isGroup) {
      console.log(chalk.black(chalk.bgGreen("[ PESAN ]")), color(argsLog, "turquoise"), chalk.magenta("Dari"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "@s.whatsapp.net")} ]`));
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgGreen("[ PESAN ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("Dari"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "@s.whatsapp.net")} ]`),
        chalk.blueBright("Group"),
        chalk.green(groupName)
      );
    }

    if (command === 'pulsa') {
      if (!fs.existsSync(PathAuto + `${sender}1` + ".json")) {
      var deposit_object = {
      ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
      session: "bilang_angkanya",
      sender: q,
      data: {
      text_nya: "",
      code: ""
      }
      }
      fs.writeFileSync(PathAuto + `${sender}1` + ".json", JSON.stringify(deposit_object, null, 2))
      } else {
      reply(`*_Silahkan Ketik .cancelpulsa Untuk Melakukan Pembelian Kembali_*`)
      }
      }
      if (fs.existsSync(PathAuto + `${sender}1` + ".json")) {
        let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}1` + ".json"))
        if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
        let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}1` + ".json"))
        if (data_deposit.session === "bilang_angkanya") {;
        if (isNaN(chath)) return reply("*_Masukkan Nomor Tujuan_*")
        data_deposit.data.text_nya = `${chath.replace('628','08')}`
        data_deposit.data.code = data_deposit.data.text_nya.substring(0,4)
        data_deposit.session = "text_nya_cuy";
        fs.writeFileSync(PathAuto + `${sender}1` + ".json", JSON.stringify(data_deposit, null, 3));
        nomer = data_deposit.data.text_nya
        code = data_deposit.data.code
          const data = [
            {'name': 'Telkomsel', 'code': ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853'], 'list': './src/list-telkomsel.json'},
            {'name': 'By.U', 'code': ['0851'], 'list': './src/list-bayu.json'},
            {'name': 'Indosat', 'code': ['0814', '0815', '0816', '0855', '0856', '0857', '0858'], 'list': './src/list-indosat.json'},
            {'name': 'XL', 'code': ['0817', '0818', '0819', '0859', '0877', '0878', '0879'], 'list': './src/list-xl.json'},
            {'name': 'Axis', 'code': ['0831', '0832', '0833', '0838'], 'list': './src/list-axis.json'},
            {'name': 'Smartfren', 'code': ['0881', '0882', '0883', '0887', '0888', '0889'], 'list': './src/list-smart.json'},
            {'name': 'Tri', 'code': ['0895', '0896', '0897', '0898', '0899'], 'list': './src/list-tri.json'}
          ]
          let result = {name: 'unknown', file: null}
          for (let i of data) {
            i.code.includes(code) ? result = {name: i.name, file: i.list} : ''
          }
          if (result.name != 'unknown'){
            let list = []
            for (let i of JSON.parse(fs.readFileSync(result.file))) {
              list.push({
                title: i.name,
                rowId: `${prefix}konfirmasipulsa ${nomer}|${i.id}|${i.price}`,
                description: `${formatmoney(i.price + profit)}`
              })
            }
        
          let api_key = reselerkey
          let api_id = reseleridkey
          let sign = md5(api_id + api_key)
          let axios = require('axios')
          axios('https://vip-reseller.co.id/api/profile',{method: 'POST',data: new URLSearchParams(Object.entries({key: api_key,sign: sign}))}).then((res) => {
            const listMessage = {
              text: `*_Pilih layanan sesuai dengan yang anda inginkan, Berikut adalah list yang bisa anda pilih, silahkan!_*\n\n_Server Balance: ${formatmoney(res.data.data.balance)}_\n_Your Balance: ${formatmoney(getMonUser(sender))}_\n\nNote: *_Jika Saldo Server Kurang Dari Harga Pembelian Yang Anda Inginkan Silahkan Tunggu Jam Reset Saldo Server Pada 12.00/18.00 Terimakasih Telah Memilih Kami_*!.`,
              footer: "©Whats Payment",
              buttonText: "Select One Option",
              sections: [{
                title: "Pulsa Reguler",
                rows: list
              }],
              listType: 1
            }
            client.sendMessage(m.chat, listMessage)
            })
          } else {
            reply('maaf provider dari nomor anda tidak terdaftar')
           fs.unlinkSync(`./src/depo/${sender}1.json`)
          }
        }
      }
        }
    if (command === 'emoney') {
      if (!fs.existsSync(PathAuto + `${sender}2` + ".json")) {
      var deposit_object = {
      ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
      session: "bilang_angkanya",
      sender: q,
      data: {
      text_nya: "",
      ref: ""
      }
      }
      fs.writeFileSync(PathAuto + `${sender}2` + ".json", JSON.stringify(deposit_object, null, 2))
      } else {
      reply(`*_Silahkan Ketik .cancelemoney Untuk Melakukan Pembelian Kembali_*`)
      }
      }
      
      if (fs.existsSync(PathAuto + `${sender}2` + ".json")) {
      let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}2` + ".json"))
      if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
      let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}2` + ".json"))
      if (data_deposit.session === "bilang_angkanya") {;
      if (isNaN(chath)) return reply("*_Masukkan Nomor Tujuan_*")
      data_deposit.data.text_nya = `${chath.replace('628','08')}`
      data_deposit.data.code = data_deposit.data.text_nya.substring(0,4)
      data_deposit.session = "text_nya_cuy";
      fs.writeFileSync(PathAuto + `${sender}2` + ".json", JSON.stringify(data_deposit, null, 3));
      nomer = data_deposit.data.text_nya
      code = data_deposit.data.code
        let provv = [
        {'id':'shopee pay','nama':'SHOPEE PAY','file':'./src/list-shopee.json'},
        {'id':'ovo','nama':'OVO','file':'./src/list-ovo.json'},
        {'id':'dana','nama':'DANA','file':'./src/list-dana.json'},
        {'id':'bri brizzi','nama':'BRI BRIZZI','file':'./src/list-bri.json'},
        {'id':'go pay','nama':'GOPAY','file':'./src/list-gpay.json'},
        {'id':'doku','nama':'DOKU','file':'./src/list-doku.json'},
        {'id':'linkaja','nama':'LINKAJA','file':'./src/list-linkaja.json'},
        {'id':'grab','nama':'GRAB','file':'./src/list-grab.json'},
        {'id':'mandiri e-toll','nama':'MANDIRI E-TOLL','file':'./src/list-mandiri.json'},
        {'id':'tapcash bni','nama':'TAPCASH BNI','file':'./src/list-bni.json'},
        {'id':'tix id','nama':'TIX ID','file':'./src/list-tix.json'}
      ]
      let list = []
          for (let i of provv) {
            list.push({
              title: i.nama,
              rowId: `${prefix}konfirmasiemoney ${nomer}|${i.id}`,
              description: 'Available'
            })
          }
          
         
          const listMessage = {
            text: `*_Pilih Layanan E-Money Yang Anda Inginkan, Berikut Adalah Daftar E-Money Yang Tersedia Dalam Menu Kami!_*`,
            footer: "By @RezaDevv",
            buttonText: "Select One Option",
            sections: [{
              title: "Saldo Emoney",
              rows: list
            }],
            listType: 1
          }
          client.sendMessage(m.chat, listMessage)
          
          }
        }
      }
      if (command === 'tokenpln') {
        if (!fs.existsSync(PathAuto + `${sender}3` + ".json")) {
        var deposit_object = {
        ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
        session: "bilang_angkanya",
        sender: q,
        data: {
        text_nya: "",
        ref: ""
        }
        }
        fs.writeFileSync(PathAuto + `${sender}3` + ".json", JSON.stringify(deposit_object, null, 2))
        } else {
        reply(`*_Silahkan Ketik .cancelpln Untuk Melakukan Pembelian Kembali_*`)
        }
        }  
        if (fs.existsSync(PathAuto + `${sender}3` + ".json")) {
        let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}3` + ".json"))
        if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
        let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}3` + ".json"))
        if (data_deposit.session === "bilang_angkanya") {;
        if (isNaN(chath)) return reply("*_Masukkan Id Pelanggan_*")
        data_deposit.data.text_nya = `${Number(chath)}`
        data_deposit.session = "text_nya_cuy";
        fs.writeFileSync(PathAuto + `${sender}3` + ".json", JSON.stringify(data_deposit, null, 3));
        let nmrs = data_deposit.data.text_nya
        let axios = require('axios')
        let md5 = require('md5')
        let api_key = reselerkey
        let api_id = reseleridkey
        let sign = md5(api_id + api_key)
        axios('https://vip-reseller.co.id/api/prepaid',{
        method: 'POST',
        data: new URLSearchParams(Object.entries({
        key: api_key,
        sign: sign,
        type: 'services',
        filter_type: 'brand',
        filter_value: 'PLN'
        }))}).then((res) => {
          let result = res.data.data.sort((i,j) => {
            return i.price.basic - j.price.basic
          })
        let list = []
            for (let i of result) {
              list.push({
                title: i.name,
                rowId: `${prefix}konfirmasipln ${nmrs}|${i.code}|${i.price.basic}`,
                description: `${formatmoney(i.price.basic + 100)}`
              })
            }
            
          let api_key = reselerkey
          let api_id = reseleridkey
          let sign = md5(api_id + api_key)
          axios('https://vip-reseller.co.id/api/profile',{method: 'POST',data: new URLSearchParams(Object.entries({key: api_key,sign: sign}))}).then((res) => {
            const listMessage = {
              text: `*_Pilih layanan sesuai dengan yang anda inginkan, Berikut adalah list yang bisa anda pilih, silahkan!_*\n\n_Server Balance: ${formatmoney(res.data.data.balance)}_\n_Your Balance: ${formatmoney(getMonUser(sender))}_\n\nNote: *_Jika Saldo Server Kurang Dari Harga Pembelian Yang Anda Inginkan Silahkan Tunggu Jam Reset Saldo Server Pada 12.00/18.00 Terimakasih Telah Memilih Kami_*`,
              footer: "©Whats Payment",
              buttonText: "Select One Option",
              sections: [{
                title: "Token Pln Fast",
                rows: list
              }],
              listType: 1
            }
            
            client.sendMessage(m.chat, listMessage)
        })
            })
        }
      }
    }
    
    if (isCmd2) {
      switch (command) {
        case "help": case "menu":
          if (isBanned) return m.reply(`*You Have Been Banned*`)
            anu = `*Whats Payment Versi 1.0.0*\n\n➤ _Name: ${m.pushName}_\n➤ _Balance: ${formatmoney(getMonUser(sender) ? getMonUser(sender) : "Rp 0,00")}_\n➤ _Uid: ${sender.replace("@s.whatsapp.net", "")}_\n➤ _Runtime: ${runtime(process.uptime())}_\n➤ _User Length: ${signup.length}_\n\n⭓ *List Menu*\n📍 ${prefix}topup\n📍 ${prefix}depomanual\n📍 ${prefix}pulsamenu\n📍 ${prefix}plnmenu\n📍 ${prefix}emoneymenu\n\n*_📅 Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}_*\n*_🕒 Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}_*`
            client.sendText(m.chat, anu, m)   
        break;
        case "topup": {
          if (isBanned) return m.reply(`*You Have Been Banned*`)
          if (isGroup) throw mess.private
        const sections = [
          {
        title: `Example: ${prefix}topupff id|jumlah`,
        rows: [
            {title: "Price List Diamond Free Fire 🔥", rowId: `${prefix}listdmff`}
        ]
          },
          {
        title: `Example: ${prefix}topupml id|server|jumlah`,
        rows: [
            {title: "Price List Diamond Mobile Legends 🔥", rowId: `${prefix}listdmml`}
        ]
          },
      ]
      let isian = `_*User Profile Account*_\n_📍 Name : ${pushname}_\n_📍 Balance : ${formatmoney(getMonUser(sender) ? getMonUser(sender) : "Rp 0,00")}_\n_📍 Uid : ${sender.replace("@s.whatsapp.net", "")}_\n\nNote: *Saldo Hanya Digunakan Untuk Top Up Saja, Tidak Bisa Withdraw😉!.*`
      const listMessage = {
        text: isian,
        footer: "By @RezaDevv",
        title: "━━[ List Top Up Whats Payment ]━━",
        buttonText: "Select One Option",
        sections
      }
      client.sendMessage(from, listMessage)
      break;
    }
    case "pulsamenu" : {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (isGroup) throw mess.private
	  list = []
      listmenu = [`pulsa ${sender}`,`${prefix}cancelpulsa ${sender}`,]
      listmenuu = [`Beli Pulsa 🔥`,`Membatalkan 🔥`]
      listmenuuu = [`Format: Masukan Nomor Tujuan`,`Pembatalan Pembelian Pulsa`]
        nombor = 1
        startnum = 0
        nor = 1
        mor = 0
      for (let x of listmenu) {
      const yy = {
      title: `${listmenuu[startnum++]}`,
      description: `${listmenuuu[mor++]}`,
      rowId: `${x}`
 }
      list.push(yy)
}

const listMessage = {
  text: `*_Pilih Menu Yang Anda Inginkan & Jangan Lupa Selalu Sesuaikan Dengan Kebutuhan_*`,
  footer: "By @RezaDevv",
  buttonText: "Select One Option",
  sections: [{
    title: "Whats Payment",
    rows: list
  }],
  listType: 1
}

client.sendMessage(m.chat, listMessage)
}
break;
case "plnmenu" : {
if (isBanned) return m.reply(`*You Have Been Banned*`)
if (isGroup) throw mess.private
list = []
      listmenu = [`tokenpln ${sender}`,`${prefix}cancelpln ${sender}`]
      listmenuu = [`Isi Token Listrik 📍`,`Cancel Pembelian 📍`]
      listmenuuu = [`Format: Masukkan Id Pelanggan`,`Melakukan Pembatalan Trx`]
      nombor = 1
      startnum = 0
      nor = 1
      mor = 0
      for (let x of listmenu) {
      const yy = {
        title: `${listmenuu[startnum++]}`,
        description: `${listmenuuu[mor++]}`,
        rowId: `${x}`
      }
        list.push(yy)
           }
           
      const listMessage = {
      text: `*_Pilih Menu Yang Anda Inginkan & Jangan Lupa Selalu Sesuaikan Dengan Kebutuhan_*`,
      footer: "By @RezaDevv",
      buttonText: "Select One Option",
      sections: [{
        title: "Whats Payment",
        rows: list
      }],
      listType: 1
    }
    
    client.sendMessage(m.chat, listMessage)
    }
    break;
    case "emoneymenu" :{
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (isGroup) throw mess.private
      list = []
      listmenu = [`emoney ${sender}`,`${prefix}cancelemoney ${sender}`]
      listmenuu = [`Isi Saldo E-Money 💸`,`Cancel Transaksi 😥`]
      listmenuuu = [`Format: Masukkan Nomor Tujuan`,`Melakukan Pembatalan Trx`]
      nombor = 1
      startnum = 0
      nor = 1
      mor = 0
      for (let x of listmenu) {
      const yy = {
      title: `${listmenuu[startnum++]}`,
      description: `${listmenuuu[mor++]}`,
      rowId: `${x}`
   }
    list.push(yy)
      }
      const listMessage = {
      text: `*_Emoney Menu Gunakan Untuk Mempermudah Kegiatan Anda Terimakasih_*`,
      footer: "By @RezaDevv",
      buttonText: "Select One Option",
      sections: [{
        title: "Whats Payment",
        rows: list
      }],
      listType: 1
    }
    
    client.sendMessage(m.chat, listMessage)
    }
// Start Cancel group
break;
case "cancelpulsa" :
if(!fs.existsSync(`./src/depo/${sender}1.json`)) return reply('*_Silahkan Lakukan Pembelian Pulsa Terlebih Dahulu_*')
fs.unlinkSync(`./src/depo/${sender}1.json`)
reply('*_Sukses Cancel Pulsa_*')
break;
case "cancelpln" :
if(!fs.existsSync(`./src/depo/${sender}3.json`)) return reply('*_Anda Tidak Melakukan Transaksi Token Pln_*')
fs.unlinkSync(`./src/depo/${sender}3.json`)
reply('*_Sukses Cancel Pln_*')
break;
case "cancelemoney" :
if(!fs.existsSync(`./src/depo/${sender}2.json`)) return reply('*_Kamu tidak melakukan pengisian saldo e-money_*')
fs.unlinkSync(`./src/depo/${sender}2.json`)
reply('*_Sukses Cancel Emoney_*')
break;
// End Cancel group
// Start Konfirmasi group
case "konfirmasipulsa" : {
  if (isBanned) return m.reply(`*You Have Been Banned*`)
if(!fs.existsSync(`./src/depo/${sender}1.json`)) return reply('*_Expired: Silahkan Lakukan Pembelian Pulsa Kembali_*')
let hrg = text.split("|")[2]
if (getMonUser(sender) < hrg) {
 reply('*_Saldo User Anda Kurang!. Silahkan Lakukan Deposit Saldo_*')
 fs.unlinkSync(`./src/depo/${sender}1.json`)
 }
if (getMonUser(sender) > hrg) {
let nomr = text.split("|")[0]
let idn = text.split("|")[1]
let nmorr = nomr.includes('.') ? nomr.split('.')[1] : nomr
pulsabuy({
    type: 'buy',
    id_service: idn,
    target: nmorr
  })
  }
}
break;
case "konfirmasipln" : {
if (isBanned) return m.reply(`*You Have Been Banned*`)
if(!fs.existsSync(`./src/depo/${sender}3.json`)) return reply('*_Expired: Silahkan Lakukan Pembelian Token Listrik Kembali_*')
let hrg = text.split("|")[2]
if (getMonUser(sender) < hrg) {
 reply('*_Saldo User Anda Kurang!. Silahkan Lakukan Deposit Saldo_*')
 fs.unlinkSync(`./src/depo/${sender}3.json`)
 }
 if (getMonUser(sender) > hrg) {
let nomr = text.split("|")[0]
let idn = text.split("|")[1]
let axios = require('axios')
let md5 = require('md5')
let api_key = reselerkey
  let api_id = reseleridkey
let sign = md5(api_id + api_key)
axios('https://vip-reseller.co.id/api/prepaid',{
method: 'POST',
data: new URLSearchParams(Object.entries({
key: api_key,
sign: sign,
type: 'order',
service: idn,
data_no: nomr
}))}).then((res) => {
if (res.data.message == 'Saldo Anda tidak cukup untuk melakukan pemesanan ini.') {
  reply('*_Maaf Saldo Server Whats Payment Belum Terisi, Silahkan Tunggu Jam Reset Saldo Server Mulai 12.00/18.00_*')
  fs.unlinkSync(`./src/depo/${sender}3.json`)
  }
if (res.data.message == 'Pesanan berhasil, pesanan akan diproses.') {
  let liatharga = res.data.data.price + profit
  let nomor = res.data.data.data
  let trxid = res.data.data.trxid
  let namaitem = res.data.data.service
	moneyAdd(m.sender, liatharga)
	messn = `*── 「 TRX TOKEN SUKSES 」 ──*\n\n_📌 Harga : Rp${liatharga}_\n_📌 Nomor : ${nomor}_\n_📌 Nama Item : ${namaitem}_\n_📌 Trx Id : ${trxid}_\n\n*_Item Akan Segera Masuk Secara Otomatis Silahkan Melakukan Pengecekan Secara Berkala!._*\n\nNote: *_Jika Ada Kesalahan Nomor Bukan Tanggung Jawab Owner Dan Silahkan Tunggu 5 Menit Untuk Melakukan Transaksi Selanjutnya!.._*`
let buttons = [
{ buttonId: prefix+`cek ${trxid}`, buttonText: { displayText: 'Cek Trx' }, type: 1 },
]
client.sendButtonText(from, buttons, `${messn}`, `@RezaDevv`, m)
fs.unlinkSync(`./src/depo/${sender}3.json`)
}
})
}
}
break;
case "konfirmasiemoney" : {
if(!fs.existsSync(`./src/depo/${sender}2.json`)) return reply('*_Expired: Silahkan Lakukan Pembelian E-Money Kembali_*')
let nomr = text.split("|")[0]
let idn = text.split("|")[1]
 let axios = require('axios')
let md5 = require('md5')
let api_key = reselerkey
let api_id = reseleridkey
let sign = md5(api_id + api_key)
axios('https://vip-reseller.co.id/api/prepaid',{
method: 'POST',
data: new URLSearchParams(Object.entries({
key: api_key,
sign: sign,
type: 'services',
filter_type: 'brand',
filter_value: idn
}))}).then((res) => {
  let result = res.data.data.sort((i,j) => {
    return i.price.basic - j.price.basic
  })
let list = []
    for (let i of result) {
      list.push({
        title: i.name,
        rowId: `${prefix}konfirmasiemoneyfix ${nomr}|${i.code}|${i.price.basic}`,
        description: `${formatmoney(i.price.basic + 100)} - ${i.status}`
      })
    }
  let api_key = reselerkey
  let api_id = reseleridkey
  let sign = md5(api_id + api_key)
  axios('https://vip-reseller.co.id/api/profile',{method: 'POST',data: new URLSearchParams(Object.entries({key: api_key,sign: sign}))}).then((res) => {
    const listMessage = {
      text: `*_Pilih layanan sesuai dengan yang anda inginkan, Berikut adalah list yang bisa anda pilih, silahkan!_*\n\n_Server Balance: ${formatmoney(res.data.data.balance)}_\n_You Balance: ${formatmoney(getMonUser(sender))}_\n\nNote: *_Jika Saldo Server Kurang Dari Harga Pembelian Yang Anda Inginkan Silahkan Tunggu Jam Reset Saldo Server Pada 12.00/18.00! Terimakasih Telah Memilih Kami_.*`,
      footer: "By @RezaDevv",
      buttonText: "Select One Option",
      sections: [{
        title: "Whats Payment",
        rows: list
      }],
      listType: 1
    }
    
    client.sendMessage(m.chat, listMessage)
    })
})
}
break;
case "konfirmasiemoneyfix" : {
if (isBanned) return m.reply(`*You Have Been Banned*`)
if(!fs.existsSync(`./src/depo/${sender}2.json`)) return reply('*_Expired: Silahkan Lakukan Pembelian E-Money Kembali_*')
let hrg = text.split("|")[2]
if (getMonUser(sender) < hrg) {
 reply('*_Saldo User Anda Kurang!. Silahkan Lakukan Deposit Saldo_*')
 fs.unlinkSync(`./src/depo/${sender}2.json`)
 }
 if (getMonUser(sender) > hrg) {
let nomr = text.split("|")[0]
let idn = text.split("|")[1]
let axios = require('axios')
let md5 = require('md5')
let api_key = reselerkey
let api_id = reseleridkey
let sign = md5(api_id + api_key)
axios('https://vip-reseller.co.id/api/prepaid',{
method: 'POST',
data: new URLSearchParams(Object.entries({
key: api_key,
sign: sign,
type: 'order',
service: idn,
data_no: nomr
}))}).then((res) => {
if (res.data.message == 'Saldo Anda tidak cukup untuk melakukan pemesanan ini.') {
  reply('*_Maaf Saldo Server Whats Payment Belum Terisi, Silahkan Tunggu Jam Reset Saldo Server Mulai 12.00/18.00_*')
  fs.unlinkSync(`./src/depo/${sender}2.json`)
  }
if (res.data.message == 'Pesanan berhasil, pesanan akan diproses.') {
  let liatharga = res.data.data.price + profit
  let nomor = res.data.data.data
  let trxid = res.data.data.trxid
  let namaitem = res.data.data.service
	moneyAdd(m.sender, liatharga)
	messn = `*── 「 TRX E-MONEY SUKSES 」 ──*\n\n_🔥 Harga : Rp${liatharga}_\n_🔥 Nomor : ${nomor}_\n_🔥 Nama Item : ${namaitem}_\n_🔥 Trx Id : ${trxid}_\n\n*_Item Akan Segera Masuk Secara Otomatis Silahkan Melakukan Pengecekan Secara Berkala._*\n\nNote: *_Jika Ada Kesalahan Nomor Bukan Tanggung Jawab Owner Dan Silahkan Tunggu 5 Menit Untuk Melakukan Transaksi Selanjutnya!.._*`
let buttons = [
{ buttonId: prefix+`cek ${trxid}`, buttonText: { displayText: 'Cek Trx' }, type: 1 },
]
client.sendButtonText(from, buttons, `${messn}`, `@RezaDevv`, m)
fs.unlinkSync(`./src/depo/${sender}2.json`)
}
})
}
}
break;
// End Group Konfirmasi
case "cek" : {
pulsabuy({
  type: 'cek',
  trxid: q
})
}
break;
case "updatelayanan" : {
  if (!isCreator) throw mes.owner
  let prov = [
    {'id':'telkomsel','file':'./src/list-telkomsel.json'},
    {'id':'by.u','file':'./src/list-bayu.json'},
    {'id':'indosat','file':'./src/list-indosat.json'},
    {'id':'xl','file':'./src/list-xl.json'},
    {'id':'axis','file':'./src/list-axis.json'},
    {'id':'smart','file':'./src/list-smart.json'},
    {'id':'tri','file':'./src/list-tri.json'}
  ]
  for(i of prov) {
    if (!fs.existsSync(i.file)) {
      fs.unlinkSync(i.file)
    }
    updatepl(i)
    reply(`*_update layanan sukses ${i.id}_*`)
  }
}
    break;
    case "depomanual"  :
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      let ezaaja = `*─ 「 CARA DEPOSIT MANUAL」 ─*\n*_Berikut Adalah Cara Deposit Manual User!._*\n\n_For Your Information, Whats Payment Hanya Mendukung Deposit Melalui Ovo, Shopeepay, Dana, Qris Saja._\n\n_💸 Ovo : 085742632270_\n_💸 Shopeepay : 085742632270_\n_💸 Dana : 085742632270_\n_💸 Qris : wa.me/+6285742632270_\n\n*_Jika Sudah Melakukan Transfer Harap Kirim Bukti Dengan Cara Mengirim Screenshot Dengan Caption, Contoh:_*\n\n${prefix}bukti JUMLAH|CATATAN\n\n_Contoh:_\n${prefix}bukti 10000|Cepet Yaa 6285737134572\n\n*_Saldo Akan Masuk Ketika Owner Mengklik Tombol Setuju Yang Dikirim Bot!._*`
      reply(ezaaja)
    break;
    case "bukti" :
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      let depo = text.split("|")[0]
      let catatnya = text.split("|")[1]
      let depos = `${formatmoney(depo)}`
      if (isNaN(parseInt(depo))) return reply('Deposit Harus Berupa Angka!')
      let bukti = `*─ 「 DEPOSIT USER 」 ─*\n*_User Deposite Request_*\n_📍 Balance Before : ${formatmoney(getMonUser(sender) ? getMonUser(sender) : "Rp 0,00")}_\n_📍 Deposit : ${depos}_\n_📍 Uid : ${sender.replace("@s.whatsapp.net", "")}_\n_📍 Catatan : ${catatnya}_\n\n*_Identifikasi Bukti Dengan Cermat Agar Tidak Terjadi Penipuan!._*`
      if (/image/.test(mime)) {
        let media = await quoted.download()
        client.sendImage(`${owner}@s.whatsapp.net`, media, `Request From: ${sender.replace("@s.whatsapp.net", "")}`, m)
        let buttons = [
          { buttonId: prefix+`deposetuju ${depo}|${m.sender}`, buttonText: { displayText: 'Setuju' }, type: 1 },
          { buttonId: prefix+`depotidak ${m.sender}`, buttonText: { displayText: 'Tidak Setuju' }, type: 1 }
          ]
          client.sendButtonText(owner+`@s.whatsapp.net`, buttons, `${bukti}`, `@RezaDevv`, m)
          }
      break
      case "deposetuju" :
      if (!isCreator) return reply(mess.owner)
      let jumbelah = text.split("|")[0] * 1
      let siapah = text.split("|")[1]
      addMonUser(siapah, jumbelah)
      reply('*_Sukses Deposit_*')
      let buttons = [
      { buttonId: prefix+`menu`, buttonText: { displayText: 'Dashboard' }, type: 1 },
      { buttonId: prefix+`topup`, buttonText: { displayText: 'Top Up' }, type: 1 }
      ]
      client.sendButtonText(`${siapah}`, buttons, `*_Topup Anda Berhasil Di Setujui, Silahkan Melakukan TopUp Dengan Mudah Hanya Di Whats Payment!_*`, `@RezaDevv`, m)
      break
      case "depotidak" :
      if (!isCreator) return reply(mess.owner)
      reply('*_Deposit Tidak Akan Dilanjutkan_*')
      client.sendMessage(`${text}`, {text: `*_Topup Anda Ditolak!, Mungkin Anda Melakukan Fake Topup Atau Kekeliruan Lain, Silahkan Chat Owner Jika Ada Masalah!._*` })
      break;
    case "listdmff" : 
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (isGroup) throw mess.private
    lisnya = `*── 「 DIAMOND FREE FIRE 」 ──*

_📍 ${ptricelist.ff.UPF5.nama} : ${ptricelist.ff.UPF5.harga}_
_📍 ${ptricelist.ff.UPF12.nama} : ${ptricelist.ff.UPF12.harga}_
_📍 ${ptricelist.ff.UPF50.nama} : ${ptricelist.ff.UPF50.harga}_
_📍 ${ptricelist.ff.UPF70.nama} : ${ptricelist.ff.UPF70.harga}_
_📍 ${ptricelist.ff.UPF140.nama} : ${ptricelist.ff.UPF140.harga}_
_📍 ${ptricelist.ff.UPF355.nama} : ${ptricelist.ff.UPF355.harga}_
_📍 ${ptricelist.ff.UPF720.nama} : ${ptricelist.ff.UPF720.harga}_

Cara Pembelian:
${prefix}topupff ID|JUMLAH_DIAMOND\n
Example:
${prefix}topupff 123456789|1450

Note: *Transaksi akan diproses otomatis oleh sistem tunggu 3-5 menit atau cek secara berkala.*`
reply(lisnya)
  break;
  case "listdmml" :
  if (isBanned) return m.reply(`*You Have Been Banned*`)
  if (isGroup) throw mess.private
  lisya = `*── 「 DIAMOND MOBILE LEGENDS 」 ──*

_📍 ${pricelistml .ml.ZIDMBL17.nama} : ${pricelistml .ml.ZIDMBL17.harga}_
_📍 ${pricelistml .ml.ZIDMBL34.nama} : ${pricelistml .ml.ZIDMBL34.harga}_
_📍 ${pricelistml .ml.ZIDMBL50.nama} : ${pricelistml .ml.ZIDMBL50.harga}_
_📍 ${pricelistml .ml.ZIDMBL66.nama} : ${pricelistml .ml.ZIDMBL66.harga}_
_📍 ${pricelistml .ml.ZIDMBL74.nama} : ${pricelistml .ml.ZIDMBL74.harga}_
_📍 ${pricelistml .ml.ZIDMBL83.nama} : ${pricelistml .ml.ZIDMBL83.harga}_
_📍 ${pricelistml .ml.ZIDMBL184.nama} : ${pricelistml .ml.ZIDMBL184.harga}_
_📍 ${pricelistml .ml.ZIDMBL366.nama} : ${pricelistml .ml.ZIDMBL366.harga}_
_📍 ${pricelistml .ml.ZIDMBL758.nama} : ${pricelistml .ml.ZIDMBL758.harga}_

Cara Pembelian:
${prefix}topupml ID|SERVER|JUMLAH_DIAMOND\n
Contoh:
${prefix}topupml 123456789|1450|74

Note: *Transaksi akan diproses otomatis oleh sistem tunggu 3-5 menit atau cek secara berkala.*`
reply(lisya)
    break;
        case 'owner': case 'creator': {
          if (isBanned) return m.reply(`*You Have Been Banned*`)
          client.sendContact(m.chat, global.owner, m)
      }
      break;
      case 'topupff': {
      if (isGroup) throw mess.private
      let idff = text.split("|")[0]
      let produkid = text.split("|")[1]
      if (!idff) throw `Example : ${prefix + command} ID|JUMLAH_DM`
      if (!produkid) throw `Example : ${prefix + command} ID|JUMLAH_DM`
      if (isNaN(parseInt(idff))) return reply('Id Harus Berupa Angka!')
      if (isNaN(parseInt(produkid))) return reply('Jumlah Harus Berupa Angka!')
      let idharga = `UPF${produkid}`
      if (idharga == "UPF5"){
      global.hargadmff = 1000
      }
      if (idharga == "UPF12"){
      global.hargadmff = 2000
      }
      if (idharga == "UPF50"){
      global.hargadmff = 8000
      }
      if (idharga == "UPF70"){
      global.hargadmff = 10000
      }
      if (idharga == "UPF140"){
      global.hargadmff = 20000
      }
      if (idharga == "UPF355"){
      global.hargadmff = 50000
      }
      if (idharga == "UPF720"){
      global.hargadmff = 100000
      }
      if (getMonUser(sender) < global.hargadmff) {
       reply('*_Saldo User Anda Kurang!. Lakukan Deposit Terlebih Dahulu Untuk Melakukan Transaksi!_*')
       } else if(getMonUser(sender) > global.hargadmff) {
      var axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://v1.apigames.id/merchant/${merchantapigames}/cek-username/freefire?user_id=${idff}&signature=${signatureapigames}`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
      let buttons = [
      { buttonId: prefix+`konfirmasiff ${idff}|${produkid}`, buttonText: { displayText: 'Konfirmasi' }, type: 1 },
      ]
      if (response.data.error_msg) {
      reply('*Invalid Id*')
      } else if(response.data.message) {
      client.sendButtonText(m.chat, buttons, `*── 「 CHECKING ACCOUNT GAME 」 ──*\n\n_Details Produk Before Confirm:_\n_📌 Id Game : ${idff}_\n_📌 NickName : ${response.data.data.username}_\n_📌 Nama Item : ${produkid} Diamond ( FreeFire )_\n\n*_Klik konfirmasi Untuk Melanjutkan Transaksi Tunggu 3-5 Menit Atau Cek Secara Berkala_*`, `@RezaDevv`, m)
      } 
      })
      .catch(function (error) {
        console.log(error);
      });
      }
      break
      }
      case 'konfirmasiff':{
      if (isGroup) mess.private
      let idff = text.split("|")[0]
      let produkid = text.split("|")[1]
      let trxid = acakindong(001, 1000)
      let refid = `${trxid}`
      let idharga = `UPF${produkid}`
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `https://v1.apigames.id/transaksi/http-get-v1?merchant=${merchantapigames}&secret=${secretapigames}&produk=${idharga}&tujuan=${idff}&ref=TRX${refid}`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
      let idharga = `UPF${produkid}`
      if (idharga == "UPF5"){
      global.hargadmff = 1000
      }
      if (idharga == "UPF12"){
      global.hargadmff = 2000
      }
      if (idharga == "UPF50"){
      global.hargadmff = 8000
      }
      if (idharga == "UPF70"){
      global.hargadmff = 10000
      }
      if (idharga == "UPF140"){
      global.hargadmff = 20000
      }
      if (idharga == "UPF355"){
      global.hargadmff = 50000
      }
      if (idharga == "UPF720"){
      global.hargadmff = 100000
      }
      let workid = `*── 「 TRANSAKSI SUKSES 」 ──*\n\n📌 _Harga : Rp${global.hargadmff}_\n_📌 Serial Num : ${response.data.data.sn}_\n_📌 Nama Item : ${produkid} Diamond ( FreeFire )_\n_📌 Trx Id : ${response.data.data.trx_id}_\n\n*_Item Akan Segera Masuk Secara Otomatis Silahkan Melakukan Pengecekan Secara Berkala Pada Game Anda._*\n\nNote: *_Jika Ada Kesalahan Id Atau NickName Bukan Tanggung Jawab Owner!._*`
      let workd = `*── 「 TRANSAKSI GAGAL 」 ──*\n\n*_Transaksi Anda Gagal, Saldo Sistem Belum terisi Saldo User Anda Tidak Akan Dipotong, Harap Tumggu Saldo Sistem Reset Setiap 6 Jam Sekali!._*`
      if(response.data.data.status == "Sukses"){
      if (idharga == "UPF5"){
      moneyAdd(m.sender, 1000)
      reply(workid)
      }
      if (idharga == "UPF12"){
      moneyAdd(m.sender, 2000)
      reply(workid)
      }
      if (idharga == "UPF50"){
      moneyAdd(m.sender, 8000)
      reply(workid)
      }
      if (idharga == "UPF70"){
      moneyAdd(m.sender, 10000)
      reply(workid)
      }
      if (idharga == "UPF140"){
      moneyAdd(m.sender, 20000)
      reply(workid)
      }
      if (idharga == "UPF355"){
      moneyAdd(m.sender, 50000)
      reply(workid)
      }
      if (idharga == "UPF720"){
      moneyAdd(m.sender, 100000)
      reply(workid)
      }
      } else if(response.data.data.status == "Gagal"){
      reply(workd)
      }
      })
      break;
      }
      case 'topupml': {
      if (isGroup) throw mess.private
      let idml1 = text.split("|")[0]
      let idml2 = text.split("|")[1]
      let idml = `${idml1}${idml2}`
      let produkid = text.split("|")[2]
      if (isNaN(parseInt(produkid))) return reply('Jumlah Harus Berupa Angka!')
      if (isNaN(parseInt(idml1))) return reply('Id Harus Berupa Angka!')
      if (isNaN(parseInt(idml2))) return reply('Server Harus Berupa Angka!')
      let idharga = `ZIDMBL${produkid}`
      if (idharga == "ZIDMBL17"){
      global.hargadmml = 5000
      }
      if (idharga == "ZIDMBL34"){
      global.hargadmml = 9500
      }
      if (idharga == "ZIDMBL50"){
      global.hargadmml = 14000
      }
      if (idharga == "ZIDMBL66"){
      global.hargadmml = 18500
      }
      if (idharga == "ZIDMBL74"){
      global.hargadmml = 20500
      }
      if (idharga == "ZIDMBL83"){
      global.hargadmml = 23000
      }
      if (idharga == "ZIDMBL184"){
      global.hargadmml = 50500
          }
      if (idharga == "ZIDMBL366"){
      global.hargadmml = 100500
          }
      if (idharga == "ZIDMBL758"){
      global.hargadmml = 201000
      }
          
      if (getMonUser(sender) < global.hargadmml) {
        reply('*_Saldo User Anda Kurang!. Lakukan Deposit Terlebih Dahulu Untuk Melakukan Transaksi!_*')
       } else if(getMonUser(sender) > global.hargadmml) {
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `https://v1.apigames.id/merchant/${merchantapigames}/cek-username/mobilelegend?user_id=${idml}&signature=${signatureapigames}`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
      let buttons = [
      { buttonId: prefix+`konfirmasiml ${idml1}|${idml2}|${produkid}`, buttonText: { displayText: 'Konfirmasi' }, type: 1 },
      ]
      if (response.data.error_msg) {
      reply('*Invalid Id Or Zone*')
      }else if (response.data.message) {
      client.sendButtonText(m.chat, buttons, `*── 「 CHECKING ACCOUNT GAME 」 ──*\n\n_Details Produk Before Confirm:_\n_📌 Id Game : ${idml1} (${idml2})_\n_📌 NickName : ${response.data.data.username}_\n_📌 Nama Item : ${produkid} Diamond ( Mlbb )_\n\n*_Klik konfirmasi Untuk Melanjutkan Transaksi Tunggu 3-5 Menit Atau Cek Secara Berkala_*`, `@RezaDevv`, m)
    
      } 
      })
      .catch(function (error) {
        reply(error);
      });
      }
      }
      break
      case 'konfirmasiml':{
      if (isGroup) throw mess.private
      let idml1 = text.split("|")[0]
      let idml2 = text.split("|")[1]
      let idml =`${idml1}${idml2}`
      let produkid = `${text.split("|")[2]}`
      let refdi = acakindong(001, 1000)
      let refid = `${refdi}`
      let idharga = `ZIDMBL${produkid}`
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `https://v1.apigames.id/transaksi/http-get-v1?merchant=${merchantapigames}&secret=${secretapigames}&produk=${idharga}&tujuan=${idml}&ref=TRX${refid}`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
      if (idharga == "ZIDMBL17"){
      global.hargadmml = 5000
      }
      if (idharga == "ZIDMBL34"){
      global.hargadmml = 9500
      }
      if (idharga == "ZIDMBL50"){
      global.hargadmml = 14000
      }
      if (idharga == "ZIDMBL66"){
      global.hargadmml = 18500
      }
      if (idharga == "ZIDMBL74"){
      global.hargadmml = 20500
      }
      if (idharga == "ZIDMBL83"){
      global.hargadmml = 23000
      }
      if (idharga == "ZIDMBL184"){
      global.hargadmml = 50500
      }
      if (idharga == "ZIDMBL366"){
      global.hargadmml = 100500
          }
      if (idharga == "ZIDMBL758"){
      global.hargadmml = 201000
      }
      let workid = `*── 「 TRANSAKSI SUKSES 」 ──*\n\n📌 _Harga : Rp${global.hargadmml}_\n_📌 Serial Num : ${response.data.data.sn}_\n_📌 Nama Item : ${produkid} Diamond ( Mlbb )_\n_📌 Trx Id : ${response.data.data.trx_id}_\n\n*_Item Akan Segera Masuk Secara Otomatis Silahkan Melakukan Pengecekan Secara Berkala Pada Game Anda._*\n\nNote: *_Jika Ada Kesalahan Id Atau NickName Bukan Tanggung Jawab Owner!._*`
      let workd = `*── 「 TRANSAKSI GAGAL 」 ──*\n\n*_Transaksi Anda Gagal, Saldo Sistem Belum terisi Saldo User Anda Tidak Akan Dipotong, Harap Tumggu Saldo Sistem Reset Setiap 6 Jam Sekali!._*`
      if(response.data.data.status == "Sukses"){
      if (idharga == "ZIDMBL17"){
      moneyAdd(m.sender, 5000)
      reply(workid)
      }
      if (idharga == "ZIDMBL34"){
      moneyAdd(m.sender, 9500)
      reply(workid)
      }
      if (idharga == "ZIDMBL50"){
      moneyAdd(m.sender, 14000)
      reply(workid)
      }
      if (idharga == "ZIDMBL66"){
      moneyAdd(m.sender, 18500)
      reply(workid)
      }
      if (idharga == "ZIDMBL74"){
      moneyAdd(m.sender, 20500)
      reply(workid)
      }
      if (idharga == "ZIDMBL83"){
      moneyAdd(m.sender, 23000)
      reply(workid)
      }
      if (idharga == "ZIDMBL184"){
      moneyAdd(m.sender, 50500)
      reply(workid)
      }
      if (idharga == "ZIDMBL366"){
      moneyAdd(m.sender, 100500)
      reply(workid)
      }
      if (idharga == "ZIDMBL758"){
      moneyAdd(m.sender, 201000)
      reply(workid)
      }
      } else if(response.data.data.status == "Gagal"){
      reply(workd)
      }
      })
      break;
      }
      case 'restart' :
      if (!isCreator) return m.reply(mess.owner)
      await m.reply(`_Restarting ${packname}_`)
      try{
        await client.sendMessage(from, {text: "*_Succes_*"})
        await sleep(3000)
        exec(`npm start`)
      } catch (err) {
        exec(`node index.js`)
        await sleep(4000)
        m.reply('*_Sukses_*')
      }
      break;
      case 'whoisip': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        if (!text) throw `Example : ${prefix + command} 192.168.152.24`
        m.reply(mess.wait)
        let anu = await fetchJson(api('lol', '/api/ipaddress/'+text, {}, 'apikey'))
        client.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/94b5d3acb51c1eea47b22.png' }, caption: `⭔ Country : ${anu.result.country}\n⭔ Country Code : ${anu.result.countryCode}\n⭔ Region : ${anu.result.region}\n⭔ Region Name : ${anu.result.regionName}\n⭔ City : ${anu.result.city}\n⭔ Zip : ${anu.result.zip}\n⭔ Lat : ${anu.result.lat}\n⭔ Lon : ${anu.result.lon}\n⭔ Time Zone : ${anu.result.timezone}\n⭔ Isp : ${anu.result.isp}\n⭔ Org : ${anu.result.org}\n⭔ As : ${anu.result.as}\n⭔ Query : ${anu.result.query}`}, { quoted: m })
    }
      break;
      case 'listonline': case 'liston': {
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        client.sendText(m.chat, 'List Online:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
 }
      break;
      case 'tourl': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        m.reply(mess.wait)
        let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./uploader')
        let media = await client.downloadAndSaveMediaMessage(qmsg)
        if (/image/.test(mime)) {
            let anu = await TelegraPh(media)
            m.reply(util.format(anu))
        } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media)
            m.reply(util.format(anu))
        }
        await fs.
        unlinkSync(media)
    }
    break;
    case 'toaudio': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!text) throw `Example : ${prefix + command} Hallo semua`
      m.reply(mess.wait)
        client.sendMessage(m.chat, {audio: { url: `https://api.lolhuman.xyz/api/gtts/id?apikey=${lolkey}&text=${text}` }, mimetype: 'audio/mpeg'}, { quoted : m })

    }

    break;
    case 'alquran': {
      if (!args[0]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
      if (!args[1]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
      let res = await fetchJson(`https://api.zahwazein.xyz/islami/quran/${args[0]}/${args[1]}?apikey=${zenzkey}`)
      if (res.status == false) return m.reply(res.result.message)
      let txt = `*Arab* : ${res.result.text.arab}\n\n*English* : ${res.result.translation.en}\n\n*Indonesia* : ${res.result.translation.id}\n\n( Q.S ${res.result.surah.name.transliteration.id} : ${res.result.number.inSurah} )`
      m.reply(txt)
      client.sendMessage(m.chat, {audio: { url: res.result.audio.primary }, mimetype: 'audio/mpeg'}, { quoted : m })
      }
      break;
      case 'ayatkursi': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        m.reply(mess.wait)
        let eza = await fetchJson(`https://saipulanuar.ga/api/muslim/ayatkursi`)
        client.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/94b5d3acb51c1eea47b22.png' }, caption: `⭔ Nama : *Ayat Kursi*\n\n⭔ Arab : ${eza.result.arabic}\n\n⭔ Latin : ${eza.result.latin}\n\n⭔ Artinya : ${eza.result.translation}`}, { quoted: m })
		}
    break;
    case 'anime': case 'waifu': case 'husbu': case 'neko': case 'shinobu': case 'megumin': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      m.reply(mess.wait)
      client.sendMessage(m.chat, { image: { url: api('zenz', '/randomanime/'+command, {}, 'apikey') }, caption: 'Generate Random ' + command }, { quoted: m })
  }
    break;
    case 'join': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!isCreator) throw mess.owner
      if (!text) throw 'Masukkan Link Group!'
      if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
      m.reply(mess.wait)
      let result = args[0].split('https://chat.whatsapp.com/')[1]
      await client.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  }
  break;
  case 'block': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!isCreator) throw mess.owner
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    await client.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
  break;
  case 'unblock': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
		if (!isCreator) throw mess.owner
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await client.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
    break;
    case 'kick': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) throw mess.group
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
      let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
      await client.groupParticipantsUpdate(m.chat, users, 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
    break;
    case 'add': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) throw mess.group
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
      let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
      await client.groupParticipantsUpdate(m.chat, users, 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
    break;
    case 'tagall': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) throw mess.group
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
let teks = `══✪〘 *👥 Tag All* 〙✪══

➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
      for (let mem of participants) {
      teks += `⭔ @${mem.id.split('@')[0]}\n`
      }
      client.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
      }
      break;
      break
            case 'jodohku': {
            if (isBanned) return m.reply(`*You Have Been Banned*`)
            if (!m.isGroup) throw mess.group
            let member = participants.map(u => u.id)
            let me = m.sender
            let jodoh = member[Math.floor(Math.random() * member.length)]
            let jawab = `👫Jodoh mu adalah

@${me.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`
            let ments = [me, jodoh]
            let buttons = [
                        { buttonId: `${prefix}jodohku`, buttonText: { displayText: 'Jodohku' }, type: 1 }
                    ]
                    await client.sendButtonText(m.chat, buttons, jawab, client.user.name, m, {mentions: ments})
            }
      break;
        case 'sticker': case 's': case 'stickergif': 
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        {
          if (/image/.test(mime)) {
          m.reply(mess.wait)
               let media = await client.downloadMediaMessage(qmsg)
               let encmedia = await client.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
               await fs.unlinkSync(encmedia)
           } else if (/video/.test(mime)) {
           m.reply(mess.wait)
               if (qmsg.seconds > 11) return m.reply('Maksimal 10 detik!')
               let media = await client.downloadMediaMessage(qmsg)
               let encmedia = await client.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
               await fs.unlinkSync(encmedia)
           } else {
               m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
               }
           }
           break;
           case 'getip': {
           if (!isCreator) throw mess.owner
            var http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                m.reply("My public IP address is: " + ip);
            })
                })
            }
          break;
          case 'ping': case 'botstatus': case 'statusbot': {
            if (!isCreator) throw mess.owner
            const used = process.memoryUsage()
            const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
          return cpu
            })
            const cpu = cpus.reduce((last, cpu, _, { length }) => {
                last.total += cpu.total
                last.speed += cpu.speed / length
                last.times.user += cpu.times.user
                last.times.nice += cpu.times.nice
                last.times.sys += cpu.times.sys
                last.times.idle += cpu.times.idle
                last.times.irq += cpu.times.irq
                return last
            }, {
                speed: 0,
                total: 0,
                times: {
              user: 0,
              nice: 0,
              sys: 0,
              idle: 0,
              irq: 0
            }
            })
            let timestamp = speed()
            let latensi = speed() - timestamp
            neww = performance.now()
            oldd = performance.now()
            respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}
${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
            `.trim()
            m.reply(respon)
        }
        break;
        case 'gempa': {
          if (isBanned) return m.reply(`*You Have Been Banned*`)
          m.reply(mess.waitdata)
          let anu = await fetchJson(api('zenz', '/information/bmkg/gempa', {}, 'apikey'))
          if (anu.status == false) return m.reply(anu.result.message)
          client.sendMessage(m.chat, { image: { url: anu.result.shakemap }, caption: `⭔ Tanggal : ${anu.result.tanggal}\n⭔ Jam : ${anu.result.jam}\n⭔ Date Time : ${anu.result.datetime}\n⭔ Coordinate : ${anu.result.coordinates}\n⭔ Lintang : ${anu.result.lintang}\n⭔ Bujur : ${anu.result.bujur}\n⭔ Magnitude : ${anu.result.magnitude}\n⭔ Kedalaman : ${anu.result.kedalaman}\n⭔ Wilayah : ${anu.result.wilayah}\n⭔ Potensi : ${anu.result.potensi}\n⭔ Dirasakan : ${anu.result.dirasakan}`}, { quoted: m })
      }
      break;
      case 'jadwalsholat': {
        m.reply(mess.wait+`${text}`)
        if (!text) throw `Example : ${prefix + command} banjar`
        let fetch = await fetchJson(api('zenz', '/islami/jadwalshalat', { kota: text }, 'apikey'))
        if (fetch.status == false) return m.reply(fetch.result.message)
        let i = fetch.result
        let teks = `Jadwal Sholat Kota : ${text}\n\n`
        teks += `⭔ Tanggal : ${i.tanggal}\n`
        teks += `⭔ Subuh : ${i.subuh}\n`
        teks += `⭔ Duha : ${i.duha}\n`
        teks += `⭔ Dzuhur : ${i.zuhur}\n`
        teks += `⭔ Ashar : ${i.asar}\n`
        teks += `⭔ Maghrib : ${i.magrib}\n`
        teks += `⭔ Isya : ${i.isya}\n`
        client.sendText(m.chat, teks, m)
      }
      break;
      case 'asmaulhusna': {
          m.reply(mess.wait)
          let fetch = await fetchJson(`https://raw.githubusercontent.com/BochilTeam/database/master/religi/asmaulhusna.json`)
          let caption = `*Asmaul Husna*\n\n`
          for (let i of fetch) {
            caption += `⭔ No : ${i.index}\n`
            caption += `⭔ Arab : ${i.arabic}\n`
            caption += `⭔ Latin : ${i.latin}\n`
            caption += `⭔ Indonesia : ${i.translation_id}\n`
            caption += `⭔ English : ${i.translation_en}\n\n`
        }
        client.sendText(m.chat, caption, m)
      }
      break;
      case 'kompasnews': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      m.reply(mess.wait)
      let fetch = await fetchJson(`https://api.zahwazein.xyz/news/kompas?apikey=${zenzkey}`)
      let caption = `Latest News From Kompasnews\n\n`
        for (let i of fetch.result) {
            caption += `⭔ Judul Berita : ${i.berita}\n`
            caption += `⭔ Di Upload : ${i.berita_diupload}\n`
            caption += `⭔ Jenis : ${i.berita_jenis}\n`
            caption += `⭔ Url : ${i.berita_url}\n\n`
        }
        client.sendImage(m.chat, fetch.result[0].berita_thumb, caption, m)
      }
      break;
      case 'shortlink': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        if (!text) throw `Example : ${prefix + command} https://google.com`
        m.reply(mess.wait)
        let anu = await fetchJson(`https://api.lolhuman.xyz/api/shortlink?apikey=${lolkey}&url=${text}`)
        client.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/94b5d3acb51c1eea47b22.png' }, caption: `*Success ✔*\n⭔ Url : ${anu.result}`}, { quoted: m })
    }
  break;
  case 'ytshorts': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!text) throw 'Masukkan Query Link!'
    m.reply(mess.wait)
    let anu = await fetchJson(`https://api.zahwazein.xyz/downloader/ytshorts?apikey=${zenzkey}&url=${text}`)
    if (anu.status == false) return m.reply(anu.result.message)
    let buttons = [
        {buttonId: `${prefix}menu`, buttonText: {displayText: '► Menu'}, type: 1}
    ]
    let buttonMessage = {
        video: { url: anu.result.getVideo },
        caption: `Download From ${text}`,
        footer: 'Press Button For Menu',
        buttons: buttons,
        headerType: 5
    }
    client.sendMessage(m.chat, buttonMessage, { quoted: m })
}
  break;
  case 'ytmp4': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!text) throw 'Masukkan Query Link!'
    m.reply(mess.wait)
    let anu = await fetchJson(`https://api.zahwazein.xyz/downloader/youtube?apikey=${zenzkey}&url=${text}`)
    if (anu.status == false) return m.reply(anu.result.message)
    let buttons = [
        {buttonId: `${prefix}menu`, buttonText: {displayText: '► Menu'}, type: 1}
    ]
    let buttonMessage = {
        video: { url: anu.result.getVideo },
        caption: `Download From ${text}`,
        footer: 'Press Button For Menu',
        buttons: buttons,
        headerType: 5
    }
    client.sendMessage(m.chat, buttonMessage, { quoted: m })
}
  break;
  case 'tiktok': case 'tiktoknowm': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!text) throw 'Masukkan Query Link!'
    m.reply(mess.wait)
    let anu = await fetchJson(api('zenz', '/downloader/tiktok', { url: text }, 'apikey'))
    if (anu.status == false) return m.reply(anu.result.message)
    let buttons = [
        {buttonId: `${prefix}menu`, buttonText: {displayText: '► Menu'}, type: 1}
    ]
    let buttonMessage = {
        video: { url: anu.result.video.noWatermark },
        caption: `Download From ${text}`,
        footer: 'Press Button For Menu',
        buttons: buttons,
        headerType: 5
    }
    client.sendMessage(m.chat, buttonMessage, { quoted: m })
}
  break;
  case 'tiktokmp3': case 'tiktokaudio': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!text) throw 'Masukkan Query Link!'
    m.reply(mess.wait)
    let anu = await fetchJson(`https://api.zahwazein.xyz/downloader/tiktok?apikey=${zenzkey}&url=${text}`)
    if (anu.status == false) return m.reply(anu.result.message)
    let buttons = [
        {buttonId: `${prefix}menu`, buttonText: {displayText: '► Menu'}, type: 1}
    ]
    let buttonMessage = {
        text: `Download From ${text}`,
        footer: 'Press Button For Menu',
        buttons: buttons,
        headerType: 2
    }
    let msg = await client.sendMessage(m.chat, buttonMessage, { quoted: m })
    client.sendMessage(m.chat, { audio: { url: anu.result.music.play_url }, mimetype: 'audio/mpeg'}, { quoted: msg })
}
        break;
          case 'ban':
        if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
		    if (!isCreator) throw mess.owner
		    bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
        ban.push(bnnd)
		    fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
		    m.reply(`${bnnd}`)
        break;
        case 'unban':
        if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
		    if (!isCreator) throw mess.owner
		    bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
        unp = ban.indexOf(bnnd)
        ban.splice(unp, 1)
		    fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
		    m.reply(`${bnnd}`)
        break;
        case 'listban': case 'lisbanned':
          if (!isCreator) throw mess.owner
          teks = '*List Banned*\n\n'
          for (let medog of ban) {
            teks += `- ${medog}\n`
          }
          teks += `\n*Total Banned : ${ban.length}*`
          client.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": ban } })
        break;
          default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
