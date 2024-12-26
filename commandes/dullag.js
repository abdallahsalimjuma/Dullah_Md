"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "ping", reaction: "🧒", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*🤖Bot is online*🤖 🙏 \n\n ' + "𝐃𝐔𝐋𝐋𝚫𝚮-𝚳𝐃";
    let d = '                                          𝛥𝐷𝐷 𝛭𝛩𝑅𝛯 𝑆𝑇𝛥𝑇𝑈𝑆😉';                               
    let varmess = z + d;
    var mp4 = 'https://files.catbox.moe/jq3oin.mp4';
    await zk.sendMessage(dest, { video: { url: mp4 }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
