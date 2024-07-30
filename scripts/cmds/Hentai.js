const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "nhentai",
    version: "1.0",
    author: "rehat--",
    longDescription: "Read Hentai Comic",
    category: "Hentai",
    role: 0,
    guide: {
      en: "{pn} <code>"
    }
  },
  onStart: async function({ api, event, args }) {
    try {
      if (args.length !== 1 || isNaN(args[0])) {
        api.sendMessage('Usage: nhentai <id>', event.threadID, event.messageID);
        return;
      }

      const id = args[0];
      
      const url1 = `https://hentaifox.com/gallery/${id}/`;
      const getresponse = await axios.get(url1);
      const gresponse = getresponse.data;
      const $gallery = cheerio.load(gresponse);
      const totalpages = parseInt($gallery('span.i_text.pages').text().split(':')[1].trim());

      const pageRequests = [];
      for (let page = 1; page <= totalpages; page++) {
        const url2 = `https://hentaifox.com/g/${id}/${page}/`;
        pageRequests.push(axios.get(url2));
      }

      const pageResponses = await Promise.all(pageRequests);
      const images = [];
      pageResponses.forEach(response => {
        const $image = cheerio.load(response.data);
        const jpgurl = $image('a.next_img img').attr('data-src');
        images.push(jpgurl);
      });

      const downloadPromises = images.map(async (jpgurl, index) => {
        const getimg = await axios.get(jpgurl, { responseType: 'arraybuffer' });
        const imgbuffer = Buffer.from(getimg.data);
        const dname = `cache/hentaifox.${id}_${index + 1}.jpg`; // Modified to include page number in filename
        const imgpath = path.join(__dirname, dname);

        if (!fs.existsSync(path.dirname(imgpath))) {
          fs.mkdirSync(path.dirname(imgpath), { recursive: true });
        }

        fs.writeFileSync(path.join(imgpath), imgbuffer);
        return imgpath;
      });

      const imagePaths = await Promise.all(downloadPromises);

      const msg = `Downloaded ${totalpages} pages. Sending...`;
      api.sendMessage(msg, event.threadID);

      for (let i = 0; i < imagePaths.length; i++) {
        setTimeout(() => {
          api.sendMessage({ attachment: fs.createReadStream(imagePaths[i]) }, event.threadID);
        }, (i + 1) * 1000); // Sending each page 1 second apart
      }

      setTimeout(() => {
        api.sendMessage("Finished sending all pages.", event.threadID);
      }, (imagePaths.length + 1) * 1000); // Wait for all pages to be sent before sending finished message
    } catch (error) {
      console.error("An error occurred:", error);
      api.sendMessage('An error occurred. Please try again later.', event.threadID, event.messageID);
    }
  }
};
