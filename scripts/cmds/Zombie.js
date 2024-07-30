const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "zombiefilter",
    aliases: ["zombie"],
    author: "Mahi--",
    version: "1.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "Apply a zombie filter to a photo.",
    longDescription: "Apply a zombie filter to a photo by replying to it.",
    category: "fun",
    guide: "{p}zombiefilter (reply to an image)"
  },
  onStart: async function ({ message, args, api, event }) {
    // Obfuscated author name check
    const checkAuthor = Buffer.from('TWFoaS0t', 'base64').toString('utf8');
    if (this.config.author !== checkAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    if (event.type !== "message_reply" || !event.messageReply.attachments.length || event.messageReply.attachments[0].type !== "photo") {
      return api.sendMessage("❌ | Please reply to an image.", event.threadID);
    }

    const imageUrl = event.messageReply.attachments[0].url;
    const apiUrl = `https://www.samirxpikachu.run.place/zombie?imgurl=${encodeURIComponent(imageUrl)}`;

    api.sendMessage("⏳ | Processing your image...", event.threadID, event.messageID);

    try {
      const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_zombie_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));

      const stream = fs.createReadStream(imagePath);
      message.reply({
        body: "✅ | Here is your zombie filtered image.",
        attachment: stream
      });
    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | An error occurred. Please try again later.");
    }
  }
};
