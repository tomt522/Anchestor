const axios = require('axios');

module.exports = {
  config: {
    name: "imp",
    version: "1.0",
    author: "AKASH",
    category: "utilities",
    countDown: 5,
    role: 0,
    guide: {
      en: "{pn} <prompt>"
    }
  },

  onStart: async function ({ args, message }) {
    const prompt = args.join(" ");

    if (!prompt) {
      return message.reply("Please provide a prompt.");
    }

    try {
      const response = await axios.post('https://prompt-enhance.akashxzh.workers.dev/api', {
        prompt: prompt
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const enhancedPrompt = response.data.expandedPrompt;
      message.reply(`${enhancedPrompt}`);
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  }
};
