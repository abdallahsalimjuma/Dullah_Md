const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
zokou({
  nomCom: "asthetic",
  reaction: '✌️',
  categorie: "DULLAH-MD PICTURES"
}, async (message, sendMessage, { repondre, arg, ms }) => {
  try {
    const response = await fetch("https://api.maher-zubair.tech/wallpaper/asthetic");
    const data = await response.json();
    const imageUrl = data.urls.regular;

    const messageData = {
      image: {
        url: imageUrl
      },
      caption: "*POWERED BY DULLAH-MD BOT*"
    };

    await sendMessage(message, messageData, { quoted: ms });
  } catch (error) {
    console.error("Error fetching wallpaper:", error);
  }
});