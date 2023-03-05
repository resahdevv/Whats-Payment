# Whats Payment

***Whats Payment dibuat dengan nodejs menggunakan library [Bailyes](https://github.com/adiwajshing/Baileys)***

## Baca Dulu Mas Mba
Terdapat 5  feature transaksi 

<br>📍 .depomanual
<br>📍 .topup
<br>📍 .pulsamenu
<br>📍 .emoneymenu
<br>📍 .plnmenu

## Catatan
Kode Sumber Dibuat Oleh @RezaDevv Program Ini Memiliki Lisensi MIT yang artinya perangkat lunak bebas permisif yang berasal dari Massachusetts Institute of Technology. Sebagai lisensi permisif, Lisensi MIT memberikan batasan yang sangat longgar tentang penggunaan kembali dan memiliki kompatibilitas lisensi yang sangat baik.

<p align="center">
	<img src="https://telegra.ph/file/4be1496d02b3d2ce1f03b.png" width="35%" style="margin-left: auto;margin-right: auto;display: block;">
</p>

## Get & Change Suplier Api Key
- Silakan buat apikey api games [Disini](https://member.apigames.id/login)
- Silakan buat apikey Digiflazz [Disini](https://member.digiflazz.com/)
- Silakan buat apikey VipReseller [Disini](https://vip-reseller.co.id/)

- Ganti Apikey Anda Pada ```./setting/config```
``` ts
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

## WARNING
* Mungkin software ini tidak akan berjalan secara optimal diwindows dan termux
* Direkomendasikan menggunakan linux

## Thanks To
* [`ResahDevv`](https://github.com/resahdevv)

```Thanks to all who have participated in the development of this script```

## Donate
<a href="https://saweria.co/rezadevv" target="_blank"><img src="https://user-images.githubusercontent.com/26188697/180601310-e82c63e4-412b-4c36-b7b5-7ba713c80380.png" alt="Donate For Yusril" height="41" width="174"></a>

## License
[MIT](https://github.com/resahdevv/Whats-Pay/LICENSE)

```Copyright (c) 2023 RezaDevv```
