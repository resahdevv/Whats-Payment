/**
 * Source Code By Reza
 * Don't Forget Smile
 * Thank You
 */

require("http")
  .createServer((_, res) => res.end("Hello Owner."))
  .listen(0000);

require('./setting/config')
require('./setting/mechaine')
const donet = "https://saweria.co/rezadevv";
const {
  default: EzaConnect,
  useSingleFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  getContentType,
} = require("@adiwajshing/baileys");
const { state, saveState } = useSingleFileAuthState(`./${session}.json`);
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const figlet = require("figlet");
const _ = require("lodash");
const PhoneNumber = require("awesome-phonenumber");
const path = require("path");
const FileType = require("file-type");
const ff = require("fluent-ffmpeg");
const webp = require("node-webpmux");
const { tmpdir } = require("os");
const Crypto = require("crypto");

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

global.api = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
    new URLSearchParams(
      Object.entries({
        ...query,
        ...(apikeyqueryname
          ? {
            [apikeyqueryname]:
              global.APIKeys[
              name in global.APIs ? global.APIs[name] : name
              ],
          }
          : {}),
      })
    )
    : "");

function smsg(conn, m, store) {
  if (!m) return m;
  let M = proto.WebMessageInfo;
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith("@g.us");
    m.sender = conn.decodeJid(
      (m.fromMe && conn.user.id) ||
      m.participant ||
      m.key.participant ||
      m.chat ||
      ""
    );
    if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || "";
  }
  if (m.message) {
    m.mtype = getContentType(m.message);
    m.msg =
      m.mtype == "viewOnceMessage"
        ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
        : m.message[m.mtype];
    m.body =
      m.message.conversation ||
      m.msg.caption ||
      m.msg.text ||
      (m.mtype == "listResponseMessage" &&
        m.msg.singleSelectReply.selectedRowId) ||
      (m.mtype == "buttonsResponseMessage" && m.msg.selectedButtonId) ||
      (m.mtype == "viewOnceMessage" && m.msg.caption) ||
      m.text;
    let quoted = (m.quoted = m.msg.contextInfo
      ? m.msg.contextInfo.quotedMessage
      : null);
    m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
    if (m.quoted) {
      let type = getContentType(quoted);
      m.quoted = m.quoted[type];
      if (["productMessage"].includes(type)) {
        type = getContentType(m.quoted);
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === "string")
        m.quoted = {
          text: m.quoted,
        };
      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo.stanzaId;
      m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id
        ? m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16
        : false;
      m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id);
      m.quoted.text =
        m.quoted.text ||
        m.quoted.caption ||
        m.quoted.conversation ||
        m.quoted.contentText ||
        m.quoted.selectedDisplayText ||
        m.quoted.title ||
        "";
      m.quoted.mentionedJid = m.msg.contextInfo
        ? m.msg.contextInfo.mentionedJid
        : [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };
      let vM = (m.quoted.fakeObj = M.fromObject({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id,
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {}),
      }));

      /**
       *
       * @returns
       */
      m.quoted.delete = () =>
        conn.sendMessage(m.quoted.chat, { delete: vM.key });

      /**
       *
       * @param {*} jid
       * @param {*} forceForward
       * @param {*} options
       * @returns
       */
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
        conn.copyNForward(jid, vM, forceForward, options);

      /**
       *
       * @returns
       */
      m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
    }
  }
  if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg);
  m.text =
    m.msg.text ||
    m.msg.caption ||
    m.message.conversation ||
    m.msg.contentText ||
    m.msg.selectedDisplayText ||
    m.msg.title ||
    "";
  /**
   * Reply to this message
   * @param {String|Object} text
   * @param {String|false} chatId
   * @param {Object} options
   */
  m.reply = (text, chatId = m.chat, options = {}) =>
    Buffer.isBuffer(text)
      ? conn.sendMedia(chatId, text, "file", "", m, { ...options })
      : conn.sendText(chatId, text, m, { ...options });
  /**
   * Copy this message
   */
  m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));

  /**
   *
   * @param {*} jid
   * @param {*} forceForward
   * @param {*} options
   * @returns
   */
  m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
    conn.copyNForward(jid, m, forceForward, options);

  return m;
}

async function startEza() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  console.log(
    color(
      figlet.textSync("Whats Pay", {
        font: "Standard",
        horizontalLayout: "default",
        vertivalLayout: "default",
        whitespaceBreak: false,
      }),
      "green"
    )
  );

  async function videoToWebp(media) {
    const tmpFileOut = path.join(
      tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
    );
    const tmpFileIn = path.join(
      tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`
    );

    fs.writeFileSync(tmpFileIn, media);

    await new Promise((resolve, reject) => {
      ff(tmpFileIn)
        .on("error", reject)
        .on("end", () => resolve(true))
        .addOutputOptions([
          "-vcodec",
          "libwebp",
          "-vf",
          "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
          "-loop",
          "0",
          "-ss",
          "00:00:00",
          "-t",
          "00:00:05",
          "-preset",
          "default",
          "-an",
          "-vsync",
          "0",
        ])
        .toFormat("webp")
        .save(tmpFileOut);
    });

    const buff = fs.readFileSync(tmpFileOut);
    fs.unlinkSync(tmpFileOut);
    fs.unlinkSync(tmpFileIn);
    return buff;
  }

  async function imageToWebp(media) {
    const tmpFileOut = path.join(
      tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
    );
    const tmpFileIn = path.join(
      tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`
    );

    fs.writeFileSync(tmpFileIn, media);

    await new Promise((resolve, reject) => {
      ff(tmpFileIn)
        .on("error", reject)
        .on("end", () => resolve(true))
        .addOutputOptions([
          "-vcodec",
          "libwebp",
          "-vf",
          "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
        ])
        .toFormat("webp")
        .save(tmpFileOut);
    });

    const buff = fs.readFileSync(tmpFileOut);
    fs.unlinkSync(tmpFileOut);
    fs.unlinkSync(tmpFileIn);
    return buff;
  }

  async function writeExifVid(media, metadata) {
    let wMedia = await videoToWebp(media);
    const tmpFileIn = path.join(
      tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
    );
    const tmpFileOut = path.join(
      tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
    );
    fs.writeFileSync(tmpFileIn, wMedia);

    if (metadata.packname || metadata.author) {
      const img = new webp.Image();
      const json = {
        "sticker-pack-id": `https://github.com/resahdevv/WhatsApp-Ai`,
        "sticker-pack-name": metadata.packname,
        "sticker-pack-publisher": metadata.author,
        emojis: metadata.categories ? metadata.categories : [""],
      };
      const exifAttr = Buffer.from([
        0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
        0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
      ]);
      const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
      const exif = Buffer.concat([exifAttr, jsonBuff]);
      exif.writeUIntLE(jsonBuff.length, 14, 4);
      await img.load(tmpFileIn);
      fs.unlinkSync(tmpFileIn);
      img.exif = exif;
      await img.save(tmpFileOut);
      return tmpFileOut;
    }
  }

  async function writeExifImg(media, metadata) {
    let wMedia = await imageToWebp(media);
    const tmpFileIn = path.join(
      tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
    );
    const tmpFileOut = path.join(
      tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
    );
    fs.writeFileSync(tmpFileIn, wMedia);

    if (metadata.packname || metadata.author) {
      const img = new webp.Image();
      const json = {
        "sticker-pack-id": `https://github.com/resahdevv/WhatsApp-Ai`,
        "sticker-pack-name": metadata.packname,
        "sticker-pack-publisher": metadata.author,
        emojis: metadata.categories ? metadata.categories : [""],
      };
      const exifAttr = Buffer.from([
        0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
        0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
      ]);
      const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
      const exif = Buffer.concat([exifAttr, jsonBuff]);
      exif.writeUIntLE(jsonBuff.length, 14, 4);
      await img.load(tmpFileIn);
      fs.unlinkSync(tmpFileIn);
      img.exif = exif;
      await img.save(tmpFileOut);
      return tmpFileOut;
    }
  }

  const client = EzaConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["Whats Pay", "Chrome", "1.0.0"],
    auth: state,
  });

  store.bind(client.ev);

  client.ev.on("messages.upsert", async (chatUpdate) => {
    //console.log(JSON.stringify(chatUpdate, undefined, 2))
    try {
      mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message =
        Object.keys(mek.message)[0] === "ephemeralMessage"
          ? mek.message.ephemeralMessage.message
          : mek.message;
      if (mek.key && mek.key.remoteJid === "status@broadcast") return;
      if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify")
        return;
      if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
      m = smsg(client, mek, store);
      require("./setting/mechaine")(client, m, chatUpdate, store);
    } catch (err) {
      console.log(err);
    }
  });

  client.ev.on("group-participants.update", async (anu) => {
    console.log(anu);
    try {
      let metadata = await client.groupMetadata(anu.id);
      let participants = anu.participants;
      for (let num of participants) {
        // Get Profile Picture User
        try {
          ppuser = await client.profilePictureUrl(num, "image");
        } catch {
          ppuser = "https://tinyurl.com/yx93l6da";
        }

        // Get Profile Picture Group
        try {
          ppgroup = await client.profilePictureUrl(anu.id, "image");
        } catch {
          ppgroup = "https://tinyurl.com/yx93l6da";
        }

        if (anu.action == "add") {
          client.sendMessage(anu.id, {
            image: { url: ppuser },
            mentions: [num],
            caption: `Welcome To ${metadata.subject} @${num.split("@")[0]}`,
          });
        } else if (anu.action == "remove") {
          client.sendMessage(anu.id, {
            image: { url: ppuser },
            mentions: [num],
            caption: `@${num.split("@")[0]} Leaving To ${metadata.subject}`,
          });
        } else if (anu.action == "promote") {
          client.sendMessage(anu.id, {
            image: { url: ppuser },
            mentions: [num],
            caption: `@${num.split("@")[0]} Promote From ${metadata.subject}`,
          });
        } else if (anu.action == "demote") {
          client.sendMessage(anu.id, {
            image: { url: ppuser },
            mentions: [num],
            caption: `@${num.split("@")[0]} Demote From ${metadata.subject}`,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  // Handle error
  const unhandledRejections = new Map();
  process.on("unhandledRejection", (reason, promise) => {
    unhandledRejections.set(promise, reason);
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
  });
  process.on("rejectionHandled", (promise) => {
    unhandledRejections.delete(promise);
  });
  process.on("Something went wrong", function (err) {
    console.log("Caught exception: ", err);
  });

  // Setting
  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };

  client.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = client.decodeJid(contact.id);
      if (store && store.contacts)
        store.contacts[id] = { id, name: contact.notify };
    }
  });

  client.getName = (jid, withoutContact = false) => {
    id = client.decodeJid(jid);
    withoutContact = client.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
        resolve(
          v.name ||
          v.subject ||
          PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
            "international"
          )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
            id,
            name: "WhatsApp",
          }
          : id === client.decodeJid(client.user.id)
            ? client.user
            : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };

  client.setStatus = (status) => {
    client.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status",
      },
      content: [
        {
          tag: "status",
          attrs: {},
          content: Buffer.from(status, "utf-8"),
        },
      ],
    });
    return status;
  };

  client.getName = (jid, withoutContact = false) => {
    id = client.decodeJid(jid);
    withoutContact = client.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
        resolve(
          v.name ||
          v.subject ||
          PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
            "international"
          )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
            id,
            name: "WhatsApp",
          }
          : id === client.decodeJid(client.user.id)
            ? client.user
            : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };

  client.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await client.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await client.getName(
          i + "@s.whatsapp.net"
        )}\nFN:${await client.getName(
          i + "@s.whatsapp.net"
        )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:rezaheryana76@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/ezaaaa\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
      });
    }
    client.sendMessage(
      jid,
      {
        contacts: { displayName: `${list.length} Kontak`, contacts: list },
        ...opts,
      },
      { quoted }
    );
  };

  client.public = true;

  client.serializeM = (m) => smsg(client, m, store);
  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        startEza();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        startEza();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First"
        );
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(
          `Device Logged Out, Please Delete Session file ${session}.json and Scan Again.`
        );
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        startEza();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        startEza();
      } else {
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        startEza();
      }
    } else if (connection === "open") {
      console.log(color("Whats Payment success connected to server", "green"));
      console.log(color("Whats Payment Version 1.0.0", "cyan"));
      console.log(color("Ketik .menu untuk menampilkan menu"));
      client.sendMessage(`${owner}@s.whatsapp.net`, {
        text: `*_Hi Owner Whats Payment, Server Whats Payment Berhasil Aktif_*\n\n*_Detail Configurasi Server :_*\n_Owner : ${owner}_\n_Saldo Reseller : ${saldoreseller}_\n_Profit : ${untung}_\n_Packname : ${packname}_\n_Author : ${author}_\n_Session : ${session}_\n\n*_Tanggal Server : ${tanggalserver}_*\n*_Waktu Server : ${waktuserver}_*`,
      });
    }
    // console.log('Connected...', update)
  });

  client.ev.on("creds.update", saveState);

  client.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path)
        ? path
        : /^data:.*?\/.*?;base64,/i.test(path)
          ? Buffer.from(path.split`,`[1], "base64")
          : /^https?:\/\//.test(path)
            ? await await getBuffer(path)
            : fs.existsSync(path)
              ? fs.readFileSync(path)
              : Buffer.alloc(0);
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options);
      } else {
        buffer = await imageToWebp(buff);
      }

      await client.sendMessage(
        jid,
        { sticker: { url: buffer }, ...options },
        { quoted }
      );
      return buffer;
    };

    /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path)
        ? path
        : /^data:.*?\/.*?;base64,/i.test(path)
          ? Buffer.from(path.split`,`[1], "base64")
          : /^https?:\/\//.test(path)
            ? await await getBuffer(path)
            : fs.existsSync(path)
              ? fs.readFileSync(path)
              : Buffer.alloc(0);
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options);
      } else {
        buffer = await videoToWebp(buff);
      }

      await client.sendMessage(
        jid,
        { sticker: { url: buffer }, ...options },
        { quoted }
      );
      return buffer;
    };

    return buffer;
  };

  /**
   *
   * @param {*} message
   * @param {*} filename
   * @param {*} attachExtension
   * @returns
   */
  client.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };

  /**
   *
   * @param {*} jid
   * @param {*} url
   * @param {*} caption
   * @param {*} quoted
   * @param {*} options
   */
  client.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    let mime = "";
    let res = await axios.head(url);
    mime = res.headers["content-type"];
    if (mime.split("/")[1] === "gif") {
      return client.sendMessage(
        jid,
        {
          video: await getBuffer(url),
          caption: caption,
          gifPlayback: true,
          ...options,
        },
        { quoted: quoted, ...options }
      );
    }
    let type = mime.split("/")[0] + "Message";
    if (mime === "application/pdf") {
      return client.sendMessage(
        jid,
        {
          document: await getBuffer(url),
          mimetype: "application/pdf",
          caption: caption,
          ...options,
        },
        { quoted: quoted, ...options }
      );
    }
    if (mime.split("/")[0] === "image") {
      return client.sendMessage(
        jid,
        { image: await getBuffer(url), caption: caption, ...options },
        { quoted: quoted, ...options }
      );
    }
    if (mime.split("/")[0] === "video") {
      return client.sendMessage(
        jid,
        {
          video: await getBuffer(url),
          caption: caption,
          mimetype: "video/mp4",
          ...options,
        },
        { quoted: quoted, ...options }
      );
    }
    if (mime.split("/")[0] === "audio") {
      return client.sendMessage(
        jid,
        {
          audio: await getBuffer(url),
          caption: caption,
          mimetype: "audio/mpeg",
          ...options,
        },
        { quoted: quoted, ...options }
      );
    }
  };

  /**
   *
   * @param {*} jid
   * @param {*} buttons
   * @param {*} caption
   * @param {*} footer
   * @param {*} quoted
   * @param {*} options
   */
  client.sendButtonText = (
    jid,
    buttons = [],
    text,
    footer,
    quoted = "",
    options = {}
  ) => {
    let buttonMessage = {
      text,
      footer,
      buttons,
      headerType: 2,
      ...options,
    };
    client.sendMessage(jid, buttonMessage, { quoted, ...options });
  };

  const getBuffer = async (url, options) => {
    try {
      options ? options : {};
      const res = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (err) {
      return err;
    }
  };

  client.sendImage = async (jid, path, caption = "", quoted = "", options) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    return await client.sendMessage(
      jid,
      { image: buffer, caption: caption, ...options },
      { quoted }
    );
  };

  client.sendText = (jid, text, quoted = "", options) =>
    client.sendMessage(jid, { text: text, ...options }, { quoted });

  client.cMod = (
    jid,
    copy,
    text = "",
    sender = client.user.id,
    options = {}
  ) => {
    //let copy = message.toJSON()
    let mtype = Object.keys(copy.message)[0];
    let isEphemeral = mtype === "ephemeralMessage";
    if (isEphemeral) {
      mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
    }
    let msg = isEphemeral
      ? copy.message.ephemeralMessage.message
      : copy.message;
    let content = msg[mtype];
    if (typeof content === "string") msg[mtype] = text || content;
    else if (content.caption) content.caption = text || content.caption;
    else if (content.text) content.text = text || content.text;
    if (typeof content !== "string")
      msg[mtype] = {
        ...content,
        ...options,
      };
    if (copy.key.participant)
      sender = copy.key.participant = sender || copy.key.participant;
    else if (copy.key.participant)
      sender = copy.key.participant = sender || copy.key.participant;
    if (copy.key.remoteJid.includes("@s.whatsapp.net"))
      sender = sender || copy.key.remoteJid;
    else if (copy.key.remoteJid.includes("@broadcast"))
      sender = sender || copy.key.remoteJid;
    copy.key.remoteJid = jid;
    copy.key.fromMe = sender === client.user.id;

    return proto.WebMessageInfo.fromObject(copy);
  };

  return client;
}

startEza();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
