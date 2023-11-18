/*
 * This file is intended to register and update the slash commands for the bot
 * To deploy the commands, run: node ./src/deploy-commands.js
 */

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('.././config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const folderPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(folderPath);

for (const folder of commandFolders) {
  const commandPath = path.join(folderPath, folder);
  const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);

    if ('data' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} does not have a data property!`);
    }
  }
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // For only one guild (guildId) commands:
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    // For global commands:
    // await rest.put(
    // Routes.applicationCommands(clientId),
    // { body: commands },
    // );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
