module.exports = {
 config: {
 name: "Zoro",
 version: "1.0",
 author: "MAHI×antor", // hopeless 
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "zoro") {
 return message.reply({
 body: "𝘿𝙊𝙉'𝙏 𝘿𝙄𝙎𝙏𝙐𝙍𝘽 𝙏𝙃𝙀 𝙆𝙄𝙉𝙂 𝙊𝙁 𝙃𝙀𝙇𝙇 𝙒𝙃𝙀𝙉 𝙃𝙀'𝙎 𝙎𝙇𝙀𝙀𝙋𝙄𝙉𝙂 𝙊𝙍 𝙏𝙍𝘼𝙄𝙉𝙄𝙉𝙂!!",
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/g7Sgpqk/0e0d9fc7a1e651ff13bd0499bb94d593.gif")
 });
 }
 }
}
