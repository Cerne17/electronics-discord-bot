const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const {token} = require('./config.json');

// Initializing a new Client
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// Run this, when client is ready
client.once(Events.ClientReady, handleClient);

// Function to handle the client
function handleClient(tag) {
  console.log(`Ready! Logged in as ${tag.user.tag}`);
}

client.login(token);
