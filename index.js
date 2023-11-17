const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Initializing a new Client
const client = new Client({ intents: [GatewayIntentBits.Guilds ] });

// Run this, when client is ready
// The 'c' param is used to separete it from the 'client' variable
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);
