const axios = require('axios');

module.exports = {
  config: {
    name: "xnxx",
    aliases: ["xnxxsearch", "xnxxdown"],
    author: "Mahi--",
    version: "1.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "Search and download videos from xnxx.",
    longDescription: "Search for videos on xnxx and download them using their links.",
    category: "fun",
    guide: {
      en: "{p}xnxx search <query>\n{p}xnxx down <link>"
    }
  },
  onStart: async function ({ message, args, api, event }) {
    // Obfuscated author name check
    const checkAuthor = Buffer.from('TWFoaS0t', 'base64').toString('utf8');
    if (this.config.author !== checkAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    if (args.length === 0) {
      return api.sendMessage("❌ | Please provide a search query or a download link.", event.threadID, event.messageID);
    }

    const action = args[0].toLowerCase();
    const input = args.slice(1).join(" ");

    if (action === "search") {
      if (!input) {
        return api.sendMessage("❌ | Please provide a search query.", event.threadID, event.messageID);
      }

      const searchUrl = `https://www.samirxpikachu.run.place/xnxx/search?query=${encodeURIComponent(input)}`;
      api.sendMessage("⏳ | Searching for videos...", event.threadID, event.messageID);

      try {
        const response = await axios.get(searchUrl);
        const results = response.data;  // Assuming the API returns a list of results
        let replyMessage = "✅ | Here are the search results:\n";
        
        results.forEach((result, index) => {
          replyMessage += `${index + 1}. Title: ${result.title}\nLink: ${result.link}\n\n`;
        });

        message.reply(replyMessage);
      } catch (error) {
        console.error("Error:", error);
        message.reply("❌ | An error occurred during the search. Please try again later.");
      }

    } else if (action === "down") {
      if (!input.startsWith("https://")) {
        return api.sendMessage("❌ | Please provide a valid download link.", event.threadID, event.messageID);
      }

      const downloadUrl = `https://www.samirxpikachu.run.place/xnxx/down?url=${encodeURIComponent(input)}`;
      api.sendMessage("⏳ | Downloading video...", event.threadID, event.messageID);

      try {
        const response = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
        const fileName = `downloaded_video.mp4`;
        const buffer = Buffer.from(response.data, 'binary');

        const stream = await global.utils.getStreamFromBuffer(buffer, fileName);
        message.reply({
          body: "✅ | Here is your downloaded video.",
          attachment: stream
        });
      } catch (error) {
        console.error("Error:", error);
        message.reply("❌ | An error occurred during the download. Please try again later.");
      }
      
    } else {
      api.sendMessage("❌ | Invalid action. Use 'search' or 'down'.", event.threadID, event.messageID);
    }
  }
};
