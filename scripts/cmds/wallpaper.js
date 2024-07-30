const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "wallpaper",
    version: "1.1",
    author: "yahiko",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "box chat",
    guide: {
      vi: "",
      en: ""
    }
  },

  langs: {
    vi: {
      needAdmin: ""
    },
    en: {
      needAdmin: ""
    }
  },

  onStart: async function ({ message, event, args, threadsData, api, getLang }) {
    const wallpapers = [
      "https://wallpaperaccess.com/full/3951342.jpg",
      "https://images.wallpapersden.com/image/download/sasuke-uchiha-cool_bGpqbGeUmZqaraWkpJRnZmxprWZnZ2g.jpg",
      "https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-wallpaper-madara-88.jpg",
      "https://w0.peakpx.com/wallpaper/759/390/HD-wallpaper-itachi-uchiha-kakashi-madara-mangekyo-sharingan-minato-sharingan.jpg",
      "https://4kwallpapers.com/images/wallpapers/itachi-uchiha-naruto-black-background-minimal-art-amoled-1179x2556-4942.png",
      "https://cdn.wallpapersafari.com/50/2/ealUjO.jpg",
      "https://e0.pxfuel.com/wallpapers/897/654/desktop-wallpaper-gojo-satoru-for-iphone-and-android-gojo-sataru.jpg",
      "https://pbs.twimg.com/media/E34KCRHXIAQwbm3.jpg:large",
      "https://wallpapers.com/images/featured/3tg32q5lcq0aaljj.jpg",
      "https://w0.peakpx.com/wallpaper/500/484/HD-wallpaper-nezuko-anime-demon-demon-slayer-girl-hot-slayer.jpg",
      "https://w0.peakpx.com/wallpaper/576/459/HD-wallpaper-tomioka-anime-kimetsu-no-yaiba-legend.jpg",
      "https://i.postimg.cc/N04PvpPP/inbound6055731100703685029.jpg",
      
      "https://i.postimg.cc/W1qf4x2d/inbound6314817366944860959.jpg", 
      
      "https://i.postimg.cc/Y02sq997/inbound3301938693126284953.jpg", 
      
      "https://i.postimg.cc/cHSz2TGr/inbound7073195725452482987.jpg", 
      
      "https://i.postimg.cc/htN6bcC8/inbound1328233923884839049.jpg", 
      
      "https://i.postimg.cc/prBFWWSD/inbound2995606675295483055.jpg", 

      "https://i.postimg.cc/dtvf45mX/inbound3943934793275773483.jpg", 

      "https://i.postimg.cc/FRzrd91y/inbound7646409375620212950.jpg", 
      
    ];

    // Generate a random index within the range of the array length
    const randomIndex = Math.floor(Math.random() * wallpapers.length);

    // Get the randomly selected image URL
    const randomImage = wallpapers[randomIndex];

    try {
      const response = await axios.get(randomImage, { responseType: "stream" });
      const filePath = __dirname + "/cache/5.jpg"; // Specify the path where you want to save the image
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        message.reply({
          attachment: fs.createReadStream(filePath)
        });
        fs.remove(filePath); // Remove the temporarily saved image file
      });

      writer.on("error", (err) => {
        console.error("Error saving image:", err);
      });
    } catch (error) {
      console.error("Error retrieving image:", error);
    }
  }
};
