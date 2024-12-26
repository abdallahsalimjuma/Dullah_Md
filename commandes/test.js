"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "test", reaction: "📎", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Hello my name is  *Dullah md* \n\n ' + "l'm a whatsapp bot multi-device created ";
    let d = 'by *Mr Dulla*';
    let varmess = z + d;
    var img = 'https://files.catbox.moe/0cxusf.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *lucky* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *fredi*'
      let varmess=z+d
      var img='https://telegra.ph/file/f0f8ef25b35b76be901a7.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
