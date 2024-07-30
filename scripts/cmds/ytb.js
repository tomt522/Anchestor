const axios = require("axios");
const fs = require('fs');

module.exports = {
	config: {
		name: "ytb",
		version: "1.0",
		author: "rehat--",
		countDown: 10,
		role: 0,
		longDescription: "Download youtube video by search query.",
		category: "video",
		guide: {
			en: "{pn} <video name>: use to download video from youtube."
		}
	},
	onStart: async function ({ api, event, args, message }) {
		const query = args.join(" ");
		if (!query) {
			return message.reply("Baka enter a track name!");
		}
		const SearchapiUrl = `https://rehatdesu.xyz/api/youtube/search?query=${encodeURIComponent(query)}`;
		try {
			const response = await axios.get(SearchapiUrl);
			const tracksData = response.data.slice(0, 6);

			if (tracksData.length === 0) {
				return message.reply("No videos found for the given query.");
			}

			const trackInfo = tracksData.map((track, index) =>
				`${index + 1}. ${track.title}\nChannel: ${track.channel}\nTime: ${track.duration}`
			).join("\n\n");

			const thumbnails = tracksData.map((track) => track.thumbnail);
			const attachments = await Promise.all(
				thumbnails.map((thumbnail) =>
					global.utils.getStreamFromURL(thumbnail)
				)
			);

			const replyMessage = await message.reply({
				body: `${trackInfo}\n\nReply to the message with a number to choose or any content to cancel`,
				attachment: attachments
			});

			const data = {
				commandName: this.config.name,
				messageID: replyMessage.messageID,
				tracks: tracksData,
				currentIndex: 6,
				originalQuery: query,
			};
			global.GoatBot.onReply.set(replyMessage.messageID, data);
		} catch (error) {
			console.error(error);
			message.reply("An error occurred.");
		}
	},

	onReply: async function ({ api, event, Reply, args, message }) {
		const userInput = args[0].toLowerCase();
		const { tracks, currentIndex, originalQuery } = Reply;

		if (!isNaN(userInput) && userInput >= 1 && userInput <= tracks.length) {
			const selectedTrack = tracks[userInput - 1];
			message.unsend(Reply.messageID);

			const downloadingMessage = await message.reply(`⬇ | 𝘼𝙣𝙘𝙝𝙚𝙨𝙩𝙤𝙧 𝘼𝙞 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙞𝙣𝙜 𝙏𝙝𝙚 𝙑𝙞𝙙𝙚𝙤 𝙁𝙤𝙧 𝙔𝙤𝙪`);
			const SpdlApiUrl = 'https://rehatdesu.xyz/api/youtube/download?url=' + encodeURIComponent(selectedTrack.url);

			try {
				const apiResponse = await axios.get(SpdlApiUrl);
				if (apiResponse.data) {
					const {
						url
					} = apiResponse.data;

					
                const res = await axios.get(url, { responseType: 'stream' });
                const v = fs.createWriteStream('ytb.mp4');
                res.data.pipe(v);
                await new Promise((resolve, reject) => {
                    v.on('finish', resolve);
                    v.on('error', reject);
                });

					 await api.sendMessage({ body: selectedTrack.title, attachment: fs.createReadStream('ytb.mp4')}, event.threadID, event.messageID);
					 message.unsend(downloadingMessage.messageID);
                                         fs.unlinkSync('ytb.mp4');
				} else {
					message.reply("An error occurred.");
				}
			} catch (error) {
				console.error(error);
				message.reply("An error occurred.");
			}
			message.unsend(downloadingMessage.messageID);
		}
	}
};
