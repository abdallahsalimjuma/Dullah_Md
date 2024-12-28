const { zokou } = require("../framework/zokou");
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien");
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bdd/antibot");
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');

zokou({ nomCom: "forward", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) {
    repondre("✋🏿 ✋🏿 This command is reserved for groups ❌");
    return;
  }

  if (!(verifAdmin || superUser)) {
    repondre("✋🏿 ✋🏿 This command is reserved for admins ❌");
    return;
  }

  const messageToSend = arg && arg.length > 0 ? arg.join(' ') : 'No message provided';
  const groupMembers = await infosGroupe.participants;

  if (!groupMembers || groupMembers.length === 0) {
    repondre("🚫 No group members found.");
    return;
  }

  repondre(`📤 Forwarding message: "${messageToSend}" to all group members...`);

  // Iterate through each member and send the message to their private chat
  for (const member of groupMembers) {
    const memberNumber = member.id.split('@')[0] + '@s.whatsapp.net'; // Format the number as a WhatsApp ID
    try {
      await zk.sendMessage(memberNumber, { text: messageToSend }, { quoted: ms });
    } catch (error) {
      console.error(`Failed to send message to ${memberNumber}:`, error);
    }
  }

  // Confirmation message to the group
  repondre(`✅ Message "${messageToSend}" has been sent to all group members.`);
});
