const { getStreamFromURL } = require("fb-watchman");
module.exports = {
  config: {
    name: "admininfo",
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "0info about bot and owner",
    category: "ai",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "https://i.imgur.com/ESkGzAy.gif";
    const attachment = await global.utils.getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;

    const ment = [{ id: id, tag: name }];
    const a = "乃卂几Ҝ卂| 卂|";
    const b = " / ";
    const c = "MAHI";
const e = "Male";
    const d = "m.me/100072881080249";
const f = " hopeless mahi";
const g = "I LOVE THAT GIRL TOO MUCH 😩 BUT I CAN'T ASK ";

    message.reply({ 
      body: `${name}, here is the information 🌝
🌸 Bot's Name: ${a}
🌸 Bot's prefix: ${b}  
🌸 Owner: ${c}
🌸 Gender: ${e}
🌸 Messenger: ${d}
🌸 facebook: ${f}
🌸 Relationship: ${g}`,
mentions: ment,
      attachment: attachment });
  }
};
