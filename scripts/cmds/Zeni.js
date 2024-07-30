module.exports = {
 config: {
 name: "Antor",
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
 if (event.body && event.body.toLowerCase() === "antor") {
 return message.reply({
 body: "𝙎𝙏𝙍𝘼𝙒𝙃𝘼𝙏 𝘼𝙉𝙏𝙊𝙍 𝙄𝙎 𝘽𝙐𝙎𝙔  𝙀𝘼𝙏𝙄𝙉𝙂 𝙈𝙀𝘼𝙏 𝙎𝙊 𝘿𝙊𝙉𝙏 𝘿𝙄𝙎𝙏𝙐𝙍𝘽!!",
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/DtHwgV9/ec5f377a267f9e999a5f4b13bd0fb102.gif")
 });
 }
 }
}
