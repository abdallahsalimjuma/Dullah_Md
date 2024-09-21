const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { getBuffer } = require("../framework/dl/Function");
const { default: axios } = require('axios');


zokou(
  {
    nomCom: "aesthetic",
    category: "wallpaper",
    reaction: "😅",
    filename: __filename,
    desc: "Get an aesthetic wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/asthetic";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request not be preceed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\nnomCom: aesthetic",
        error,
        "*_No responce from API, Sorry!!_*"
      );
    }
  }
);
