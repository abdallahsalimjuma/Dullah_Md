const { zokou } = require("../framework/zokou");
const fs = require('fs');

let antiStickerActive = false; // Variable pour stocker l'état de la commande anti-sticker

zokou({
  nomCom: "anti-sticker",
  categorie: "General",
  reaction: "🥺"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, arg } = commandeOptions;

  // Vérifier si un argument est fourni pour activer ou désactiver la commande
  if (arg[0]) {
    const action = arg[0].toLowerCase();
    if (action === "on") {
      antiStickerActive = true;
      await zk.sendMessage(origineMessage, "La commande anti-sticker est activée.");
      return;
    } else if (action === "off") {
      antiStickerActive = false;
      await zk.sendMessage(origineMessage, "La commande anti-sticker est désactivée.");
      return;
    }
  }

  // Vérifier si la commande anti-sticker est activée
  if (!antiStickerActive) {
    await zk.sendMessage(origineMessage, "La commande anti-sticker est actuellement désactivée.");
    return;
  }

  // Vérifier si le message est un sticker
  if (ms.message.stickerMessage) {
    const senderId = ms.key.participant; // ID de l'expéditeur
    const groupMetadata = await zk.getGroupMetadata(ms.key.remoteJid);
    const adminList = groupMetadata.participants.filter(participant => participant.isAdmin).map(admin => admin.id);

    // Vérifier si l'expéditeur n'est pas un admin
    if (!adminList.includes(senderId)) {
      console.log('Sticker supprimé de:', senderId);
      await zk.sendMessage(ms.key.remoteJid, { text: "Les stickers ne sont pas autorisés dans ce groupe." });
      await zk.deleteMessage(ms.key.remoteJid, ms.key.id); // Supprimer le message
      return;
    }
  }
});
