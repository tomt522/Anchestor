const si = require('systeminformation');

module.exports = {
    config: {
        name: "system",
        aliases: [],
        version: "1.0",
        author: "Mahi--",
        countDown: 5,
        role: 0,
        shortDescription: "System",
        longDescription: "",
        category: "",
        guide: "{pn}"
    },

    onStart: function(bytes) {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0, n = parseInt(bytes, 10) || 0;
        while (n >= 1024 && ++l) n = n / 1024;
        return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}${units[l]}`;
    },

    onStart: async function ({ api, event }) {
        const { cpu, cpuTemperature, currentLoad, memLayout, diskLayout, mem, osInfo } = si;
        const timeStart = Date.now();
        const axios = require("axios");
        const request = require("request");
        const fs = require("fs-extra");

        try {
            var { manufacturer, brand, speed, physicalCores, cores } = await cpu();
            var { main: mainTemp } = await cpuTemperature();
            var { currentLoad: load } = await currentLoad();
            var diskInfo = await diskLayout();
            var memInfo = await memLayout();
            var { total: totalMem, available: availableMem } = await mem();
            var { platform: OSPlatform, build: OSBuild } = await osInfo();

            var time = process.uptime();
            var hours = Math.floor(time / (60 * 60));
            var minutes = Math.floor((time % (60 * 60)) / 60);
            var seconds = Math.floor(time % 60);
            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;

            var ZiaRein = (
                "𝗦𝘆𝘀𝘁𝗲𝗺 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 💻\n\n" +
                "𝗖𝗣𝗨 𝗜𝗻𝗳𝗼 🖥️\n" +
                "💡 𝗠𝗼𝗱𝗲𝗹: " + manufacturer + " " + brand + "\n" +
                "⚡ 𝗦𝗽𝗲𝗲𝗱: " + speed + "GHz\n" +
                "🧠 𝗖𝗼𝗿𝗲𝘀: " + physicalCores + "\n" +
                "🔢 𝗧𝗵𝗿𝗲𝗮𝗱𝘀: " + cores + "\n" +
                "🌡️ 𝗧𝗲𝗺𝗽𝗲𝗿𝗮𝘁𝘂𝗿𝗲: " + mainTemp + "°C\n" +
                "📈 𝗟𝗼𝗮𝗱: " + load.toFixed(1) + "%\n\n" +
                "𝗠𝗲𝗺𝗼𝗿𝘆 𝗜𝗻𝗳𝗼 🧬\n" +
                "📏 𝗦𝗶𝘇𝗲: " + this.byte2mb(memInfo[0].size) + "\n" +
                "📝 𝗧𝘆𝗽𝗲: " + memInfo[0].type + "\n" +
                "📊 𝗧𝗼𝘁𝗮𝗹: " + this.byte2mb(totalMem) + "\n" +
                "🟢 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲: " + this.byte2mb(availableMem) + "\n\n" +
                "𝗗𝗶𝘀𝗸 𝗜𝗻𝗳𝗼 💾\n" +
                "💿 𝗡𝗮𝗺𝗲: " + diskInfo[0].name + "\n" +
                "📦 𝗦𝗶𝘇𝗲: " + this.byte2mb(diskInfo[0].size) + "\n" +
                "🔍 𝗧𝘆𝗽𝗲: " + diskInfo[0].type + "\n" +
                "🌡️ 𝗧𝗲𝗺𝗽𝗲𝗿𝗮𝘁𝘂𝗿𝗲: " + diskInfo[0].temperature + "°C\n\n" +
                "𝗢𝗦 𝗜𝗻𝗳𝗼 🖥️\n" +
                "🖥️ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: " + OSPlatform + "\n" +
                "🔢 𝗕𝘂𝗶𝗹𝗱: " + OSBuild + "\n" +
                "⏲️ 𝗨𝗽𝘁𝗶𝗺𝗲: " + hours + ":" + minutes + ":" + seconds + "\n" +
                "📶 𝗣𝗶𝗻𝗴: " + (Date.now() - timeStart) + "ms"
            );

            const link = [
                "https://i.imgur.com/8yvpw70.mp4",
                "https://i.imgur.com/2Xx1YUO.png?1",
                "https://i.imgur.com/SojiFJe.jpg",
                "https://i.imgur.com/KNBIO76.mp4",
                "https://i.imgur.com/PGOfXdd.mp4",
                "https://i.imgur.com/YMYFON4.gif",
                "https://i.imgur.com/pByvBjY.gif",
                "https://i.imgur.com/vWOcYWb.gif"
            ];

            var callback = () => api.sendMessage({ body: ZiaRein, attachment: fs.createReadStream(__dirname + "/cache/5") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5"), event.messageID);

            request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/5")).on("close", () => callback());
        }
        catch (e) {
            console.log(e);
        }
    }
};
