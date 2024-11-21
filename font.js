const axios = require('axios');

module.exports = {
  config: {
    name: "font",
    version: "1.3",
    author: "ArYAN",
    shortDescription: { en: 'Fetch fonts using an API' },
    longDescription: { en: "This command allows you to fetch fonts using a specified API and send the response back to the user." },
    role: 0,
    guide: { en: 'Type !font <text> <fontType> to fetch font information. Use "|" to split multiple parts of the text.' }
  },

  onStart: async function ({ api, event, args, message }) {
    const fonts = [
      'cursive', 'sans', 'bold', 'monospace', 'sbd', 'fraktur', 'italic', 'glitchy', 
      'baybayin', 'creepy', 'morse', 'bubbles', 'boxed', 'smiley', 'covered', 'crossed', 
      'kombo', 'boldex'
    ];

    if (args.length < 2) {
      message.reply(`📒 𝗙𝗼𝗻𝘁 𝗟𝗶𝘀𝘁\n━━━━━━━━━━━━━\n\n1. cursive - 𝒯𝒜ℛℐℱ\n2. sans - 𝖳𝖠𝖱𝖨𝖥\n3. bold - 𝗧𝗔𝗥𝗜𝗙\n4. monospace - 𝚃𝙰𝚁𝙸𝙵\n5. sbd - 𝐓𝐀𝐑𝐈𝐅\n6. fraktur - 𝔗𝔄ℜℑ𝔉\n7. italic - 𝚃𝔸ᏒƖ𝐹\n8. glitchy - TᗩᖇIᖴ\n9. baybayin - T̥ͦḀͦR̥ͦI̥ͦF̥ͦ\n10. creepy - ƚαɾιϝ\n11. morse - тαяιf\n12. bubbles - ⓉⒶⓇⒾⒻ\n13. box - 🅃🄰🅁🄸🄵 \n14. smiley - T̆̈Ă̈R̆̈Ĭ̈F̆̈\n15. covered- T͆A͆R͆I͆F͆\n16. crossed - T̴A̴R̴I̴F̴\n17. kombo - 🆃🅰🆁🅸🅵\n18. boldex - 【T】【A】【R】【I】【F】\n\n📚 𝗨𝘀𝗮𝗴𝗲:\n{p} 𝖿𝗈𝗇𝗍 ( 𝗧𝗲𝘅𝘁 ) | ( 𝗡𝘂𝗺𝗯𝗲𝗿 )`);
      return;
    }

    const text = args.slice(0, -1).join(' ');
    const [prompt, model] = text.split('|').map((part) => part.trim());
    const selectedModel = model || args[args.length - 1];

    let fontType = selectedModel;
    if (!isNaN(fontType)) {
      const fontIndex = parseInt(fontType, 10) - 1;
      if (fontIndex >= 0 && fontIndex < fonts.length) {
        fontType = fonts[fontIndex];
      } else {
        message.reply('Invalid font number. Please provide a valid font type.');
        return;
      }
    }

    try {
      const apiUrl = `https://king-aryanapis.onrender.com/api/font?text=${encodeURIComponent(prompt)}&fontType=${encodeURIComponent(fontType)}`;
      const response = await axios.get(apiUrl);
      message.reply(response.data.result);
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while fetching the font information.');
    }
  }
};
