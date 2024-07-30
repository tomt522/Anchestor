const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

const cookie = "1fF83K-Z0uVQOqG0deEpKHPb0SUlxxJzemZyVSMs6WXD6Y1qFCioFc8no8eZNZwIU49ItQ-MNEY4Gp3gjIG9NgTvoiBKCVDG1-bzbvz7P9qgwjE9FrLGNX-yZQywc3kddeHsMiISe7b0Iwp2DAsNy9y1tj7N1-CYMPkvwuv1O9RE2XD-BvrQQFLXllQ2XGudGsTH06X4gvkLix1v29qxNPQ"; // Enter _U value.
const auth = "https://tinyurl.com/4ctrj6y7"; // Enter KievRPSSecAuth value.

module.exports = {
  config: {
    name: "dalle3",
    version: "1.0",
    author: "red wan", 
    role: 0,
    countDown: 0,
    longDescription: {
      en: "Generate unique and captivating images using DALL-E 3"
    },
    category: "ai",
    guide: {
      en: "{pn} <prompt>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const prompt = args.join(" ");
    if (!prompt) {
      message.reply("📝 Enter your bing coding→📁");
      return;
    }
    message.reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐰𝐡𝐢𝐥𝐞 𝐩𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠...⏳");

    try {
      const res = await axios.post(`https://rehatdesu.xyz/api/imagine/dalle?cookie=${cookie}&auth=${auth}&prompt=${encodeURIComponent(prompt)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        message.reply("🔐 | Sorry I can't accept it...");
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(4, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      message.reply("🔐 | Sorry I can't accept it..");
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
} 
