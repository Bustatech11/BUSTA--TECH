const { bmbtz } = require("../devbmb/bmbtz");
const s = require("../settings");

// Helper function for common settings commands
async function handleSettingCommand(commandeOptions, settingName, settingKey, responses = {}) {
  const { repondre, arg, ms, superUser } = commandeOptions;
  
  if (!superUser) {
    return repondre(`*This command is restricted to the bot owner or bmb tech owner.*`);
  }

  if (!arg[0]) {
    return repondre(
      `⚙️ *${settingName} Settings*\n\n` +
      `• *${s.PREFIXE}${settingKey} yes* - Enable\n` +
      `• *${s.PREFIXE}${settingKey} no* - Disable\n` +
      `• *${s.PREFIXE}${settingKey} status* - Check current status`
    );
  }

  const option = arg[0].toLowerCase();
  let responseMessage = '';
  
  switch (option) {
    case "yes":
      s[settingKey] = 'yes';
      responseMessage = responses.enabled || `${settingName} has been enabled successfully.`;
      break;
    case "no":
      s[settingKey] = 'no';
      responseMessage = responses.disabled || `${settingName} has been disabled successfully.`;
      break;
    case "status":
      const status = s[settingKey] === 'yes' ? 'ENABLED ✅' : 'DISABLED ❌';
      responseMessage = `🛠️ ${settingName} Status: ${status}`;
      break;
    default:
      return repondre(`Invalid option. Use *${s.PREFIXE}${settingKey} yes/no/status*`);
  }

  await repondre(responseMessage);
}

// Auto-react command
bmbtz({
  nomCom: 'autoreact',
  categorie: "Settings",
  reaction: "💖",
  desc: "Automatically react to messages"
}, async (dest, zk, commandeOptions) => {
  await handleSettingCommand(commandeOptions, "Auto-react", "AUTO_REACT");
});

// Auto-read status command
bmbtz({
  nomCom: 'autoreadstatus',
  categorie: "Settings",
  reaction: "👀",
  desc: "Automatically read status updates"
}, async (dest, zk, commandeOptions) => {
  await handleSettingCommand(commandeOptions, "Auto-read status", "AUTO_READ_STATUS");
});

// ✅ Auto-bio command (new)
bmbtz({
  nomCom: 'autobio',
  categorie: "Settings",
  reaction: "✍️",
  desc: "Automatically update bot bio"
}, async (dest, zk, commandeOptions) => {
  await handleSettingCommand(commandeOptions, "Auto-bio", "AUTO_BIO", {
    enabled: "✍️ Auto-bio is now enabled",
    disabled: "✍️ Auto-bio is now disabled"
  });
});

// Private mode command
bmbtz({
  nomCom: 'privatemode',
  categorie: "Settings",
  reaction: "🔒",
  desc: "Restrict bot to owner only"
}, async (dest, zk, commandeOptions) => {
  await handleSettingCommand(commandeOptions, "Private mode", "PRIVATE_MODE", {
    enabled: "🔒 Bot is now in PRIVATE MODE (owner only)",
    disabled: "🔓 Bot is now in PUBLIC MODE"
  });
});

// ETAT commands (grouped together)
const etatCommands = [
  { name: 'autorecord', value: '3', desc: "Auto-record voice messages" },
  { name: 'autotyping', value: '2', desc: "Show typing indicators" },
  { name: 'alwaysonline', value: '1', desc: "Show always online status" }
];

etatCommands.forEach(cmd => {
  bmbtz({
    nomCom: cmd.name,
    categorie: "Settings",
    reaction: "⚙️",
    desc: cmd.desc
  }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms, superUser } = commandeOptions;
    
    if (!superUser) {
      return repondre("*This command is restricted to the bot owner or bmb tech owner.*");
    }

    if (!arg[0]) {
      return repondre(
        `⚙️ *${cmd.name.toUpperCase()} Settings*\n\n` +
        `• *${s.PREFIXE}${cmd.name} yes* - Enable\n` +
        `• *${s.PREFIXE}${cmd.name} no* - Disable`
      );
    }

    const option = arg[0].toLowerCase();
    if (option === "yes") {
      s.ETAT = cmd.value;
      await repondre(`${cmd.desc} has been enabled successfully.`);
    } else if (option === "no") {
      s.ETAT = 'no';
      await repondre(`${cmd.desc} has been disabled successfully.`);
    } else {
      await repondre(`Invalid option. Use *${s.PREFIXE}${cmd.name} yes/no*`);
    }
  });
});
