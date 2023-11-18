const fs = require('node:fs'); // file system module, reads the commands directory for command files
const path = require('node:path'); // path utility module, used to get the path of the command files
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('.././config.json');

// Initializing a new Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// This is part of the command handler logic
client.commands = new Collection();
const folderPath = path.join(__dirname, 'commands'); // Sets the path to the commands folder
const commandFolders = fs.readdirSync(folderPath); // Reads the commands folder

for (const folder of commandFolders) {
  const commandPath = path.join(folderPath, folder);
  const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} does not have a data and/or execute property!`);
    }
  }
}
// Run this, when client is ready
client.once(Events.ClientReady, handleClient);

// Function to handle the client
function handleClient(tag) {
  console.log(`Ready! Logged in as ${tag.user.tag}`);
}

// Handles the interaction
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.login(token);
