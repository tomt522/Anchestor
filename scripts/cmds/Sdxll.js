const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "sdxl",
    aliases: [],
    author: "Mahi--",
    version: "2.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "Generate an image.",
    longDescription: "Generates an image based on the provided prompt and model.",
    category: "fun",
    guide: "{p}sdxl <prompt> <model (1-6)>",
  },
  onStart: async function ({ message, args, api, event }) {
    // credit change korle tormairechudi 
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 105, 45, 45);
    if (this.config.author !== obfuscatedAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    const modelOptions = ['1', '2', '3', '4', '5', '6'];
    const prompt = args.slice(0, -1).join(" ");
    const model = args[args.length - 1];

    if (!modelOptions.includes(model)) {
      return api.sendMessage("❌ | Invalid model. Please choose a model between 1 and 6.", event.threadID);
    }

    api.sendMessage("Please wait, we're creating your imagination...", event.threadID, event.messageID);

    try {
      const sdxlApiUrl = `https://horrorable-upoldev.onrender.com/sdxl?prompt=${encodeURIComponent(prompt)}&model=${encodeURIComponent(model)}`;

      const sdxlResponse = await axios.get(sdxlApiUrl, {
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(sdxlResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);
      message.reply({
        body: "",
        attachment: stream
      });
    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | An error occurred. Please try again later.");
    }
  }
};
