const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

// Konfigurasi nomor WhatsApp bot
const BOT_NUMBER = '083133606150';

// Membuat instance WhatsApp client
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox']
    }
});

// Menampilkan QR code untuk login
client.on('qr', (qr) => {
    console.log('Silakan scan QR code berikut dengan WhatsApp Anda:');
    qrcode.generate(qr, { small: true });
});

// Ketika client sudah siap
client.on('ready', () => {
    console.log('Bot WhatsApp sudah siap!');
});

// Menangani pesan masuk
client.on('message', async msg => {
    const text = msg.body.toLowerCase();
    const sender = msg.from;
    
    // Info bot
    if (text === '!info') {
        msg.reply(`🤖 *Bot WhatsApp*\nNomor: ${BOT_NUMBER}\nStatus: Aktif\n\nGunakan !help untuk melihat daftar perintah`);
    }
    // Help command
    else if (text === '!help') {
        msg.reply(`🔍 *Daftar Perintah*\n\n!info - Informasi bot\n!ping - Cek koneksi\n!owner - Info pemilik bot`);
    }
    // Owner info
    else if (text === '!owner') {
        msg.reply('📱 *Info Owner*\nNomor: ' + BOT_NUMBER);
    }
    // Ping command
    else if (text === '!ping') {
        msg.reply('Pong! ⚡');
    }
});

// Menjalankan client
client.initialize();
