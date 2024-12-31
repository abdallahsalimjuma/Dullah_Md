const { zokou } = require("../framework/zokou");
const fs = require('fs');

let antiDeleteActive = false; // Variable pour stocker l'état de la commande anti-delete

zokou({
  nomCom: "anti-delete",
  categorie: "General",
  reaction: "🥺"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, arg } = commandeOptions;

  // Vérifier si un argument est fourni pour activer ou désactiver la commande
  if (arg[0]) {
    const action = arg[0].toLowerCase();
    if (action === "on") {
      antiDeleteActive = true;
      await zk.sendMessage(origineMessage, "La commande anti-delete est activée.");
      return;
    } else if (action === "off") {
      antiDeleteActive = false;
      await zk.sendMessage(origineMessage, "La commande anti-delete est désactivée.");
      return;
    }
  }

  // Vérifier si la commande anti-delete est activée
  if (!antiDeleteActive) {
    await zk.sendMessage(origineMessage, "La commande anti-delete est actuellement désactivée.");
    return;
  }

  // Vérifier si le message est un message de protocole de suppression
  if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
    const key = ms.message.protocolMessage.key;

    // Vérifier si l'utilisateur est un admin
    const isAdmin = await zk.isAdmin(ms.key.remoteJid, ms.key.participant);
    if (!isAdmin) {
      console.log('L\'utilisateur n\'est pas un admin, aucune action effectuée.');
      return;
    }

    if (ms.key.fromMe || ms.message.protocolMessage.key.fromMe) {
      console.log('Message supprimé me concernant');
      return;
    }

    console.log('Message supprimé');
    
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

      const senderId = msg.key.participant.split('@')[0];
      const caption = ` Anti-delete-message by BONIPHACE-MD\nMessage de @${senderId}`;
      const imageCaption = { image: { url: './media/deleted-message.jpg' }, caption, mentions: [msg.key.participant] };

      await zk.sendMessage(idBot, imageCaption);
      await zk.sendMessage(idBot, { forward: msg }, { quoted: msg });
    } catch (error) {
      console.error(error);
    }
  }

  // Vérifier si le message est un sticker
  if (ms.message.stickerMessage) {
    const key = ms.key;

    // Vérifier si l'utilisateur est un admin
    const isAdmin = await zk.isAdmin(ms.key.remoteJid, ms.key.participant);
    if (!isAdmin) {
      console.log('L\'utilisateur n\'est pas un admin, aucune action effectuée.');
      return;
    }

    console.log('Sticker supprimé');

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
        console.log('Sticker introuvable');
        return;
      }

      const senderId = msg.key.participant.split('@')[0];
      const caption = ` Anti-delete-sticker by BONIPHACE-MD\nSticker de @${senderId}`;
      const stickerCaption = { image: { url: './media/deleted-sticker.jpg' }, caption, mentions: [msg.key.participant] };

      await zk.sendMessage(idBot, stickerCaption);
      await zk.sendMessage(idBot, { forward: msg }, { quoted: msg });
    } catch (error) {
      console.error(error);
    }
  }
});
