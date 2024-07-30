const axios = require('axios');
const base64 = require('base64-js');
const fs = require('fs');

const filters = [
"DreamShaper", "cinematic", "neon_mecha", "delicate_detail", "macro_realism", "lush_illumination", "royalists", "black_and_white_3d", "counterfeit", "SDXL_Niji", "Real_Cartoon_XL", "warm_box", "radiant_symmetry", "watercolour", "saturated_space", "vibrant_glass", "cinematic_warm", "wasteland" ];

module.exports = {
  config: {
    name: "mgen",
    countDown: 5,
    role: 0,
    guide: {
      en: "{pn} <prompt> | <filter number>\nAvailable filters:\n" + filters.map((filter, index) => `${index + 1}: ${filter}`).join('\n')
    }
  },

  onStart: async function ({ args, message }) {
    if (args.length === 0) {
      return message.reply('Prompt required!');
    }

    let [prompt, filter] = args.join(" ").split("|").map(item => item.trim());
    if (!filter) {
      filter = 'DreamShaper';
    } else {
      const filterIndex = parseInt(filter, 18) - 1;
      if (filterIndex >= 0 && filterIndex < filters.length) {
        filter = filters[filterIndex];
      } else {
        return message.reply('Invalid filter number!');
      }
    }

    const headers = {
      'authority': 'playground.com',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'cookie': '__Host-next-auth.csrf-token=2695fdf3ad2176d7c5fbf3520cdc2f3d79ea998cf5c102ab1d566b4905275183%7C10b671bb6acd7ca95ec82b88df0174a6b1fc50286ffa982c1495a745f62fa192; _ga=GA1.1.1560322540.1722157597; _gcl_au=1.1.871783065.1722157598; __Secure-next-auth.callback-url=https%3A%2F%2Fplayground.com%2Fcreate; __Secure-next-auth.session-token=20c3c4b1-97fa-447f-8d14-0a48af1df4d8; mp_6b1350e8b0f49e807d55acabb72f5739_mixpanel=%7B%22distinct_id%22%3A%20%22clz5c7qol09pl53m2rnmnsj2y%22%2C%22%24device_id%22%3A%20%22190f8977bcef61-09c0259e5ddac1-b457554-61830-190f8977bcef62%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24user_id%22%3A%20%22clz5c7qol09pl53m2rnmnsj2y%22%2C%22email%22%3A%20%22akashxzh%40gmail.com%22%7D; _ga_PLJRH784LG=GS1.1.1722157597.1.1.1722157680.0.0.0; _ga_Q8NE5DKVZ5=GS1.1.1722157598.1.1.1722157680.0.0.0',
      'origin': 'https://playground.com',
      'pragma': 'no-cache',
      'referer': 'https://playground.com/create',
      'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
    };

    try {
    
      const prompt_res= await axios.post('https://playground.com/api/expand-prompt', { prompt }, { headers });
      const enhancedPrompt = prompt_res.data.expandedPrompt;

      const data = {
        width: 1024,
        height: 1024,
        seed: Math.floor(Math.random() * 1000000000),
        num_images: 1,
        sampler: 3,
        cfg_scale: 7,
        guidance_scale: 7,
        strength: 1.3,
        steps: 25,
        high_noise_frac: 0.6,
        negativePrompt: '',
        prompt: enhancedPrompt,
        hide: false,
        isPrivate: false,
        modelType: 'stable-diffusion-xl',
        batchId: 'WFQx1KP6is',
        generateVariants: false,
        initImageFromPlayground: false,
        statusUUID: '3f445391-de69-4e1a-afa2-4e2d5273903c',
        filter: filter
      };

      const response = await axios.post('https://playground.com/api/models', data, { headers });
      if (response.data.images && response.data.images.length > 0) {
        const image = response.data.images[0];
        const base64ImageData = image.url.split(',')[1];
        const imageBuffer = base64.toByteArray(base64ImageData);
        fs.writeFileSync('output.jpg', Buffer.from(imageBuffer));
        const streamData = fs.createReadStream('output.jpg');
        message.reply({ attachment: streamData });
      } else {
        message.reply('No image data found in the response.');
      }
    } catch (error) {
      message.reply(`${error.message}`);
    }
  }
};
