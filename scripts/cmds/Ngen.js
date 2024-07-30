const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Obfuscated anti-author change system
const _0x564d=["\x61\x75\x74\x68\x6F\x72","\x4D\x61\x68\x69\x2D\x2D","\x63\x6F\x6E\x66\x69\x67","\x67\x75\x69\x64","\x65\x6E","\x7B\x70\x6E\x7D\x20\x6E\x67\x65\x6E\x20\x3C\x70\x72\x6F\x6D\x70\x74\x3E","\x6E\x61\x6D\x65","\x6E\x67\x65\x6E","\x63\x6F\x75\x6E\x74\x44\x6F\x77\x6E","\x72\x6F\x6C\x65"];const antiAuthorChange={};antiAuthorChange[_0x564d[2]]={};antiAuthorChange[_0x564d[2]][_0x564d[6]]=_0x564d[7];antiAuthorChange[_0x564d[2]][_0x564d[0]]=_0x564d[1];antiAuthorChange[_0x564d[2]][_0x564d[8]]=5;antiAuthorChange[_0x564d[2]][_0x564d[9]]=0;antiAuthorChange[_0x564d[2]][_0x564d[3]]={};antiAuthorChange[_0x564d[2]][_0x564d[3]][_0x564d[4]]=_0x564d[5];

module.exports = {
  config: {
    name: "ngen",
    author: "Mahi--",
    countDown: 5,
    role: 0,
    guide: {
      en: "{pn} ngen <prompt>"
    }
  },

  onStart: async function ({ args, message }) {
    if (args.length === 0) {
      return message.reply('Prompt required!');
    }

    const prompt = args.join(" ");
    const apiUrl = `https://asmit-docs.onrender.com/generate?prompt=${encodeURIComponent(prompt)}`;

    try {
      const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');
      const imgPath = path.join(__dirname, 'generated_image.png');
      fs.writeFileSync(imgPath, imageBuffer);
      
      const streamData = fs.createReadStream(imgPath);
      message.reply({ attachment: streamData });
    } catch (error) {
      message.reply(`❌ | An error occurred. Please try again later.`);
    }
  },

  get config() {
    return antiAuthorChange.config;
  }
};
