const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "dalle",
    version: "1.0",
    author: "rehat--",
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
      message.reply("Add something baka.");
      return;
    }
    message.reply("Please wait...⏳");

    try {
      const res = await axios.post(`https://rehatdesu.xyz/api/imagine/dalle?cookie=1tRWZ8afVlQJgDQxL5Nw-CkEmQ2gghYa2tDIogMxdtyx-Qv-FZKxU-FqEpdPEge8IZAGFE3xGA67-Zc736gQjJh4nfqt6eIRe8wG5tjyCMlb12MkMi8lwbCbb7hd90iQk9Qam4RYNpqmryIyTsApnipWFIrCVPZFN1XYzadOuHODEeNqXbEN8Z-2l1yBgS8h1rBw373rolyAMvC4jXz2_cQ&auth=FABiBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACD/8AozXgzmlIARbqfFDGVZPL5ZpsLMCIm/To0VKDmjqK7oe+/YjeyQj0o+lIYxFFXhZs/VqE9G/Q8hijD9y7RwWpPM5lUg/qu9iR8SlfzAm63y18sU9h2GTqCYZXOrbH9IxGvEkKJgqyr4v1OHRYI27Tp4D4pwYrpp5XclQu6GTbA09L7x5rPyBWLsqOaMpZ5ElL6mJqDAXMtNUAGzXP7CDPWjmwN8pDPNUM1p6HZC4ukBj/0mipT6sx/d+Mg6wZXS8dN7pPqevB853VBTGkLt5htWeNaWZIS2J98zkMbQR5ylNXrctvLG6/1AFwo8rR0CYiWmDnzAWgYfUIAVl51kf60dSVjvXi8PMdJbV9jVWCpm51ea8KlzcjCmI4NwWqHVzxPM3cnOZ/GJjyGsCb89VNpVJstHnBMDQwpFv54BL6e2UNESS/y2S31IEINwV6JIpJehWpOmMQD95/JQeluqg3O99Nmk04GxlcBYPkTQR3x0iDIUOshHTh5y8kplySQsrRnDQTANUA3VhiEcv7hpZVnP4U5EWtf+9JQJArI00G0PiVpkGnVbPZPaWOR4Xf2kVpJ+lXVn/AbejbPO2Qw0lHTju0ZsOi1Bcbcqx63IkKYeAodcQBukpU6JaP1dww62ORz8zGBoqbXV9pYfA+AL+p+6F1Ss5F3sG8JeIP8UlxoHbllWx4F9wOCW8DP+SQUuVAAcFX0qabwSbPskwHteE5/dirvkzUn7v0DTXPr7GdR6rzzCh3cb/AF7s8uSZmmIuJpqBO8mamopMy34lnRhBdlXnaIwJ4oknyWKr45zB89yqR+CGGOen2r46U2snowoQ3DhdZNfMcICY0mVBPE7yrwniVL2YHCpNBdzO3Ap3cIHDHW2tSAAVcAYnmlm4V6bIV7rp3RST6f5CYZ/I7eCrxHy0T9ACfdA0dGvXLOgEwNb+3kRktVHRwnjdpG4Hh2/zFJ05yke6v6GQTMW+6mTxwNrlvkfzObtli3agV6jcOo+/y3i3pyJ+oZK3FqOp6sMCVgaUysDm94303vJarlycaniUpIqUmdERYUQdFwxSHfh4nnEyYBIF9z2VjRG7g6L888ZE628GQwoSMpGH2k2w4m5BewowEJ2UWfprqrYMKgIWHrQugAtjo4oMzRwTmku0SjLhw41zwwuQ623mknEDGah6bICkilgis/dfymlEPcQVelb06xgjFNKwh+siNK8BPvOhadztRuF+APKAU5+YY58TlP3JBPDipN1IG/WJ12rkKQ6Jq1frqwjARWQjGlYnW2WwdC7DmBHJkuesWM7B0xthq/ihLtyWGLX1S1nGYgH2M7MguAcaY2Jfoqy55UOR5pp0koT6yRF4RcdfW4CWPRrpqcslauIQWYJgFNdhfcz44e1eft7yB0BW3Uflhgn79aGyvoGUiRsUAIPci9yN0OR5HT7Kv/Z13v4AhyVJ&prompt=${encodeURIComponent(prompt)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        message.reply("Redirect failed! Most probably bad prompt.");
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(4, data.length); i++) {
        const imgResponse = await axios.post(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      message.reply("Redirect failed! Most probably bad prompt.");
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
}
