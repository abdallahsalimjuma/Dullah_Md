const { zokou } = require("../framework/zokou");
const fs = require('fs');

let antiLinkStickerActive = false; // Variable pour stocker l'état de la commande anti-link sticker

zokou({
  nomCom: "anti-link-sticker",
  categorie: "General",
  reaction: "🚫"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, arg } = commandeOptions;

  // Vérifier si un argument est fourni pour activer ou désactiver la commande
  if (arg[0]) {
    const action = arg[0].toLowerCase();
    if (action === "on") {
      antiLinkStickerActive = true;
      await zk.sendMessage(origineMessage, "La commande anti-link sticker est activée.");
      return;
    } else if (action === "off") {
      antiLinkStickerActive = false;
      await zk.sendMessage(origineMessage, "La commande anti-link sticker est désactivée.");
      return;
    }
  }

  // Vérifier si la commande anti-link sticker est activée
  if (!antiLinkStickerActive) {
    await zk.sendMessage(origineMessage, "La commande anti-link sticker est actuellement désactivée.");
    return;
  }

  // Vérifier si le message est un sticker
  if (ms.message.sticker) {
    const stickerUrl = ms.message.sticker.url; // URL du sticker
    const senderId = ms.key.participant; // ID de l'expéditeur

    // Vérifier si le sticker contient un lien
    const containsLink = /https?:\/\/[^\s]+/g.test(stickerUrl);
    if (containsLink) {
      // Vérifier si l'expéditeur est un admin
      const groupMetadata = await zk.getGroupMetadata(origineMessage.key.remoteJid);
      const admins = groupMetadata.participants.filter(participant => participant.isAdmin);
      const isAdmin = admins.some(admin => admin.id === senderId);

      if (!isAdmin) {
        // Supprimer le sticker
        await zk.sendMessage(origineMessage.key.remoteJid, { delete: ms.key });
        await zk.sendMessage(origineMessage.key.remoteJid, "Un sticker contenant un lien a été supprimé.");
      }
    }
  }
});
