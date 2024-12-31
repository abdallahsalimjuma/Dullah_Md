const { zokou } = require("../framework/zokou");
const fs = require('fs');

let antiStickerDeleteActive = false; // Variable to store the state of the anti-sticker-delete command

zokou({
  nomCom: "anti-sticker-delete",
  categorie: "General",
  reaction: "🥺"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, arg } = commandeOptions;

  // Check if an argument is provided to activate or deactivate the command
  if (arg[0]) {
    const action = arg[0].toLowerCase();
    if (action === "on") {
      antiStickerDeleteActive = true;
      await zk.sendMessage(origineMessage, "La commande anti-sticker-delete est activée.");
      return;
    } else if (action === "off") {
      antiStickerDeleteActive = false;
      await zk.sendMessage(origineMessage, "La commande anti-sticker-delete est désactivée.");
      return;
    }
  }

  // Check if the command is activated
  if (!antiStickerDeleteActive) {
    await zk.sendMessage(origineMessage, "La commande anti-sticker-delete est actuellement désactivée.");
    return;
  }

  // Check if the message is a protocol message indicating deletion
  if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
    // Check if the user is an admin
    const isAdmin = await zk.isAdmin(origineMessage.from, origineMessage.sender);
    if (!isAdmin) {
      await zk.sendMessage(origineMessage, "Vous devez être un administrateur pour utiliser cette commande.");
      return;
    }

    // Check if the deleted message is a sticker
    if (ms.message.protocolMessage.key.fromMe || ms.key.fromMe) {
      console.log('Message supprimé me concernant');
      return;
    }

    const key = ms.message.protocolMessage.key;

    try {
      const st = './store.json';
      const data = fs.readFileSync(st, 'utf8');
      const jsonData = JSON.parse(data);
      const message = jsonData.messages[key.remoteJid];

      let msg;

      for (let i = 0; i < message.length; i++) {
        if (message[i].key.id === key.id) {
          msg = message[i];
          break;
        }
      }

      if (!msg) {
        console.log('Message introuvable');
        return;
      }

      // Check if the deleted message is a sticker
      if (msg.message.stickerMessage) {
        const senderId = msg.key.participant.split('@')[0];
        const caption = ` Anti-delete-sticker by BONIPHACE-MD\nMessage de @${senderId}`;
        const imageCaption = { image: { url: './media/deleted-sticker.jpg' }, caption, mentions: [msg.key.participant] };

        await zk.sendMessage(origineMessage.from, imageCaption);
        await zk.sendMessage(origineMessage.from, { forward: msg }, { quoted: msg });
      }
    } catch (error) {
      console.error(error);
    }
  }
});
