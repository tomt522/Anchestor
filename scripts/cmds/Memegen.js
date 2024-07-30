const axios = require('axios');

module.exports = {
  config: {
    name: "memegen",
    version: "1.8",
    author: "Samir Œ",
    shortDescription: "Generate meme image",
    longDescription: "Generate a meme image with custom top and bottom text.",
    category: "Image Generation"
  },

  onStart: async function ({ api, event, args }) {
    const [input, top, bottom] = args.join(" ").split("|").map(arg => arg.trim());

    if (!input || !top || !bottom) {
      return api.sendMessage({ body: "Please provide theme number, top text, and bottom text." }, event.threadID);
    }

    const thmNumber = parseInt(input);

    if (isNaN(thmNumber) || thmNumber < 1) {
      return api.sendMessage({ body: "Invalid theme number." }, event.threadID);
    }

    try {
      const themesResponse = await axios.get('https://apis-samir.onrender.com/getall/memegen');
      const memeThemes = themesResponse.data;

      if (thmNumber > memeThemes.length) {
        return api.sendMessage({ body: "Invalid theme number." }, event.threadID);
      }

      const themeName = memeThemes[thmNumber - 1];
      const memeUrl = `https://apis-samir.onrender.com/Memegen?thmNumber=${thmNumber}&top=${encodeURIComponent(top)}&bottom=${encodeURIComponent(bottom)}`;
      const messageBody = `Meme theme: ${themeName}`;

      api.sendMessage({ body: messageBody, attachment: await global.utils.getStreamFromURL(memeUrl) }, event.threadID);
    } catch (error) {
      console.error("Failed to fetch meme themes:", error.message);
      api.sendMessage({ body: "Failed to generate meme." }, event.threadID);
    }
  }
};
