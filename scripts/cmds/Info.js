const axios = require("axios");

module.exports = {
  config: {
    name: "info",
    aliases: ['owner','about','creator'],
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
𝗡𝗮𝗺𝗲: Mahi ❣️
𝗦𝘂𝗿𝗻𝗮𝗺𝗲: Easir 
𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: Akagami Aizen 
𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: September 2
𝗧𝗮𝘁𝘁𝗼𝗼𝘀: Nah, hate it 😐
𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝗦𝘁𝗮𝘁𝘂𝘀: nearly married with my special one 
𝗠𝘂𝘀𝗶𝗰 𝗢𝗿 𝗠𝗼𝘃𝗶𝗲𝘀: music 
𝗟𝗼𝗻𝗴𝗲𝘀𝘁 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽: running still now 👀
𝗜𝗻𝘃𝗼𝗹𝘃𝗲𝗱 𝗶𝗻 𝗮𝗻 𝗮𝗰𝗰𝗶𝗱𝗲𝗻𝘁: Yh, 🥲
𝗕𝗮𝗻𝗸 balance: poor kid bae 🌚
𝗚𝗼𝘁 𝗜𝗻 𝗔 𝗦𝘁𝗿𝗲𝗲𝘁 𝗳𝗶𝗴𝗵𝘁: Last time few months ago
𝗗𝗼𝗻𝗮𝘁𝗲𝗱 𝗕𝗹𝗼𝗼𝗱: No
𝗙𝗮𝘃𝗼𝘂𝗿𝗶𝘁𝗲 𝗗𝗿𝗶𝗻𝗸: 7up ⚽ 
𝗕𝗿𝗼𝗸𝗲 𝗦𝗼𝗺𝗲𝗼𝗻𝗲'𝘀 𝗛𝗲𝗮𝗿𝘁: Once (regretting still now)
𝗚𝗼𝘁 𝗔𝗿𝗿𝗲𝘀𝘁𝗲𝗱: Nope
    `;
    const gif1 = "https://i.ibb.co/gTVr40D/received-1034834824233979.gif";
    const gif2 = "https://i.ibb.co/VqC4f58/received-2734122560079149.gif";

    // Anti-author change system (obfuscated)
    (function() {
      if (module.exports.config.author !== currentAuthor) {
        throw new Error("Unauthorized author change detected!");
      }
    })();

    try {
      await message.reply(infoMessage);
      await message.reply({
        attachment: await axios.get(gif1, { responseType: 'stream' }).then(res => res.data)
      });
      await message.reply({
        attachment: await axios.get(gif2, { responseType: 'stream' }).then(res => res.data)
      });
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while sending the information.");
    }
  }
};
