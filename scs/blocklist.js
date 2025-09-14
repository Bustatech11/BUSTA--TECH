const { bmbtz } = require("../devbmb/bmbtz");

// VCard Contact
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "B.M.B VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:B.M.B VERIFIED ✅\nORG:BMB-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=255757139901:+255757139901\nEND:VCARD"
    }
  }
};

// Newsletter context
const newsletterContext = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363423488966398@newsletter",
    newsletterName: "𝚩𝐔𝐒𝚻𝚫 𝚻𝚵𝐂𝚮",
    serverMessageId: 1
  }
};

bmbtz({
  nomCom: "blocklist",
  aliases: ["listblock", "blacklist"],
  reaction: '☘️',
  categorie: "search"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    let blocklist = await zk.fetchBlocklist();

    if (blocklist.length > 0) {
      await zk.sendMessage(dest, {
        text: `🧾 You have blocked *${blocklist.length}* contact(s). Fetching list...`,
        contextInfo: {
          ...newsletterContext
        }
      }, { quoted: quotedContact });

      let output = `╭───❖ 「 *BLOCKED CONTACTS* 」\n`;

      for (let user of blocklist) {
        const number = user.split('@')[0];
        output += `│ 🔒 +${number}\n`;
      }

      output += `╰───────────────\n🔐 *By B.M.B TECH*`;

      await zk.sendMessage(dest, {
        text: output,
        contextInfo: {
          ...newsletterContext
        }
      }, { quoted: quotedContact });

    } else {
      await zk.sendMessage(dest, {
        text: "✅ You have no blocked contacts.",
        contextInfo: {
          ...newsletterContext
        }
      }, { quoted: quotedContact });
    }
  } catch (e) {
    await zk.sendMessage(dest, {
      text: "❌ An error occurred while accessing blocked users.\n\n" + e,
      contextInfo: {
        ...newsletterContext
      }
    }, { quoted: quotedContact });
  }
});
// bmb check number fixed ✅✅
