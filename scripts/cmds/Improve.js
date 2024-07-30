const axios = require('axios');

module.exports = {
  config: {
    name: "t2p",
    aliases: ["t2t"],
    author: "Mahi--",
    version: "1.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "Generate a text prompt.",
    longDescription: "Generate a text prompt based on a given text.",
    category: "fun",
    guide: "{p}text2text <text>"
  },
  onStart: async function ({ message, args, api, event }) {
    // Obfuscated author name check
    const checkAuthor = Buffer.from('TWFoaS0t', 'base64').toString('utf8');
    if (this.config.author !== checkAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    const textPrompt = args.join(" ");
    if (!textPrompt) {
      return api.sendMessage("❌ | Please provide a text prompt.", event.threadID, event.messageID);
    }

    const apiUrl = `https://www.samirxpikachu.run.place/prompt?text=${encodeURIComponent(textPrompt)}`;

    api.sendMessage("⏳ | Generating your text prompt...", event.threadID, event.messageID);

    try {
      const response = await axios.get(apiUrl);
      const generatedText = response.data;

      message.reply(`✅ | Here is your generated text prompt: ${generatedText}`);
    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | An error occurred. Please try again later.");
    }
  }
};
