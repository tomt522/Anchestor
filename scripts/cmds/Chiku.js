const axios = require("axios")

module.exports = {
	config: {
		name: "chiku",
		version: "1.1",
		author: "NIB",
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
		category: "Advanced",
		guide: "",
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

  

  let inp = args.join(" ")
  if(!inp) return message.reply(" Say something baka")

try{
  

let res = await axios.post("https://api.simsimipro.xyz/v1/talk", {"ask": inp, "lc": "bn"})


  message.reply(decodeURIComponent(res.data.ans))
} catch(error){
  message.reply("I'm dizzy baka.")
  console.log("h", error)
}



}
}
