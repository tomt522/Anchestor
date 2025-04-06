const axios = require("axios");

module.exports = {
  config: {
    name: "info",
    aliases: ['owner', 'about', 'creator'],
    version: "1.0",
    author: "Mahi--",
    countDown: 5,
    role: 0,
    longDescription: "Provides information about Mahi",
    category: 'info',
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ message }) {
    const currentAuthor = "Mahi--";
    const infoMessage = `
𝗡𝗮𝗺𝗲: 𝙍𝙄𝙁𝘼𝙏
𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: 𝙏𝙊𝙈
𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: November 23
𝗧𝗮𝘁𝘁𝗼𝗼𝘀: Nah, hate it 😐
𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝗦𝘁𝗮𝘁𝘂𝘀: SINGLE
𝗠𝘂𝘀𝗶𝗰 𝗢𝗿 𝗠𝗼𝘃𝗶𝗲𝘀: music 
𝗜𝗻𝘃𝗼𝗹𝘃𝗲𝗱 𝗶𝗻 𝗮𝗻 𝗮𝗰𝗰𝗶𝗱𝗲𝗻𝘁: Yh, 🥲
𝗕𝗮𝗻𝗸 balance: poor kid bae 🌚
𝗚𝗼𝘁 𝗜𝗻 𝗔 𝗦𝘁𝗿𝗲𝗲𝘁 𝗳𝗶𝗴𝗵𝘁: Last time few months ago
𝗗𝗼𝗻𝗮𝘁𝗲𝗱 𝗕𝗹𝗼𝗼𝗱: No
𝗙𝗮𝘃𝗼𝘂𝗿𝗶𝘁𝗲 𝗗𝗿𝗶𝗻𝗸: MOJO
𝗚𝗼𝘁 𝗔𝗿𝗿𝗲𝘀𝘁𝗲𝗱: Nope
𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝗜𝗗 : https://www.facebook.com/rifat5xr
    `;
    const gifs = [
      "https://i.ibb.co/gTVr40D/received-1034834824233979.gif",
      "https://i.ibb.co/VqC4f58/received-2734122560079149.gif"
    ];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    // Anti-author change system (obfuscated)
    (function() {
      const e = module.exports.config;
      const a = currentAuthor;
      const n = e.author;
      if (n !== a) {
        const r = new Error("Unauthorized author change detected!");
        throw r;
      }
    })();

    try {
      const gifStream = await axios.get(randomGif, { responseType: 'stream' }).then(res => res.data);
      await message.reply({
        body: infoMessage,
        attachment: gifStream
      });
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while sending the information.");
    }
  }
};
