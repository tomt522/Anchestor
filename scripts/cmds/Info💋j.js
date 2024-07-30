const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    version: "1.0",
    author: "Mahi--",
    description: "Displays the owner's information with a random GIF",
    category: "info",
    guide: "{p}owner"
  },

  onStart: async function ({ api, event }) {
    const ownerInfo = `
      👑 Owner Information 👑
      Name: Mahi
      Role: Bot Developer
      Contact: hopelessmahi@gmail.com
      Location: Rajshahi, Bangladesh
      About: Passionate about coding and developing chatbots.
    `;

    const gifs = [
      "https://i.ibb.co/sWq2V1m/image.gif",
      "https://i.ibb.co/WG56PNV/image.gif",
      "https://i.ibb.co/hVX2NDz/image.gif",
      "https://i.ibb.co/KrY1DF8/image.gif",
      "https://i.ibb.co/7bFCMxH/image.gif",
      "https://i.ibb.co/5cBmXj2/image.gif",
      "https://i.ibb.co/7Qd7bLt/image.gif"
    ];

    const randomGifUrl = gifs[Math.floor(Math.random() * gifs.length)];

    try {
      const response = await axios.get(randomGifUrl, { responseType: 'stream' });
      const attachment = response.data;

      const messageData = {
        body: ownerInfo,
        attachment
      };

      api.sendMessage(messageData, event.threadID);
    } catch (error) {
      console.error("Error fetching the GIF:", error);
      api.sendMessage(ownerInfo, event.threadID);
    }
  }
};
