# Whats Payment

***Whats Payment dibuat dengan nodejs menggunakan library [Bailyes](https://github.com/adiwajshing/Baileys)***

## Baca Dulu Mas Mba
Terdapat 4  feature transaksi 

📍 .depomanual
📍 .topup
📍 .pulsamenu
📍 .plnmenu

## Catatan
Kode Sumber Dibuat Oleh @RezaDevv Program Ini Memiliki Lisensi Ke Pemilikan, Pengguna 
Program Bajakan Dapat Dapat Dikenakan Sanksi atau Hukuman Pidana.

<p align="center">
	<img src="https://telegra.ph/file/4be1496d02b3d2ce1f03b.png" width="35%" style="margin-left: auto;margin-right: auto;display: block;">
</p>

## Get & Change Suplier Api Key
- Silakan buat apikey api games [Disini](https://member.apigames.id/login)
- Silakan buat apikey Digiflazz [Disini](https://member.digiflazz.com/)
- Silakan buat apikey VipReseller [Disini](https://vip-reseller.co.id/)

- Ganti Apikey Anda Pada ```./setting/config```
``` ts
// Website Api
global.APIs = {
  zenz: "https://api.zahwazein.xyz",
  lol: "https://api.lolhuman.xyz",
};

// Apikey Website Api
global.APIKeys = {
  "https://api.zahwazein.xyz": "Your Api",
  "https://api.lolhuman.xyz": "Your Api",
};

// Start suplier digiflazz
global.username = "Username";
global.production = "Productio Code";
// End digiflazz

//Start api games
global.merchantapigames = "Merchant";
global.secretapigames = "Secret Key";
global.signatureapigames = "Signature";
// End games

// Start Vip Reseler
global.reselerkey = "Reseller Key";
global.reseleridkey = "Reseler IdKey",
// End Reseler

global.zenzkey = "Your Api";
global.lolkey = "Your Api";
```
## Mengatur Keuntungan
- Atur Keuntungan Transaksi ```./setting/mechaine```
``` ts
var profit = 100; // Keuntungan
    global.untung = `${profit}`;
```

## UNTUK PENGGUNA WINDOWS/RDP

* Unduh & Instal Git [`Klik Disini`](https://git-scm.com/downloads)
* Unduh & Instal NodeJS [`Klik Disini`](https://nodejs.org/en/download)

```bash
$ git clone https://github.com/resahdevv/WhatsApp-Ai.git
$ cd WhatsApp-Ai
$ yarn
$ npm start
```

## FOR TERMUX/UBUNTU/SSH USER

```bash
$ apt update && apt upgrade
$ apt install git -y
$ apt install nodejs -y
$ apt install ffmpeg -y
$ git clone https://github.com/resahdevv/WhatsApp-Ai.git
$ cd WhatsApp-Ai
$ yarn
$ npm start
```

## RECOMMENDED INSTALL ON TERMUX

```bash
$ pkg install yarn
$ yarn
```
## Thanks To
* [`ResahDEvv`](https://github.com/resahdevv)

```Thanks to all who have participated in the development of this script```

## Donate
<a href="https://saweria.co/rezadevv" target="_blank"><img src="https://user-images.githubusercontent.com/26188697/180601310-e82c63e4-412b-4c36-b7b5-7ba713c80380.png" alt="Donate For Yusril" height="41" width="174"></a>

## License
[The Unlicense](https://github.com/resahdevv/Whats-Pay/LICENSE)

```Copyright (c) 2023 RezaDevv```
