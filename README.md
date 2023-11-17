# Step by Step to create a Discord Bot
The Guide: https://discordjs.guide/#before-you-begin

## 1. Initialize the node project
```
npm init
```

## 2. Install discord.js library
```
npm install discord.js
```

## 3. Adding a linter to the project
```
npm install --save-dev eslint
```

## 4. Set up the discord bot application
<ol>
    <li>Open the Discord developer portal</li>
    <li>Click on "New Application"</li>
    <li>Enter the name and click "Create"</li>
</ol>

## 5. The Bot's token
After creating a bot, click the "Reset Token" button on it's control pannel. It will reveal to you it's token.

## 6. Adding the bot to a server
To add the bot to a server, you will need to create a bot invite link, such as:

https://discord.com/api/oauth2/authorize?client_id=123456789012345678&permissions=0&scope=bot%20applications.commands

### The Links structure:
<ul>
    <li>https://discord.com/api/oauth2/authorize simply a default part of the URL</li>
    <li>client_id=... specifies which bot you want to authorize by its client id</li>
    <li>permissions=... specifies the permissions the bot needs to run the server</li>
    <li>scope=bot%20applications.commands this shows to discord, that this user is a bot, not a human user</li>
</ul>

This bot's link is:
```
https://discord.com/api/oauth2/authorize?client_id=1174876129732067418&permissions=8&scope=bot%20applications.commands
```

# Creating the bot

## 1. Configuration Files
We can store safelly sensitive informations with the ```config.json``` file.
To access this file inside other parts of the project, you can do ```require()```

### Another option is using .env files...
To use .env files, you need to install the dotenv library. 
```
npm install dotenv
```

### Git
It is important to keep the gitignore file up to your project needs.
For now, the project's gitignore file should include:
```
node_modules/
.env
config.json
```

## 2. Setting the index.js file
To setup the index.js file, you need to configure it as follows:
```
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
```

## 3. Running the bot
After setting the index file up, you will need to run the application to test it.
You can run the application in the terminal by inserting the following line to the prompt:
```
node index.js
```
If done right, you should see
```
Ready! Logged in as <Bots Name>
```
in the prompt.
By this point, if you check the discord server, your bot should be already online!

### Note: Shutting down the bot
To shut down the bot, you should type ```Ctrl + C``` in the terminal to stop the application's tasks.

# First Commands
After years of discord bots using the bang prefix as a pseudo-default configuration, the discord's team came up with the slash commands feature. 
What that means is that we can build better functionalities to our bots!

### Useful informations about slash commands
<ul>
<li>The slash commands must have from 1 up to 32 characters.</li>
<li>They cannot contain any capital letters</li>
<li>They cannot contain spaces or special symbols</li>
<li>Slash commands can contain `-` and `_`</li>
<li>They are built using `SlashCommandBuilder`</li>
</ul>

## 1. Building the commands

### A simple example:
The simplest ping command built by the SlashCommandBuilder is done as follows:
```
new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
```
`setName` is the commands name, it is what the user will need to type to use the command.
`setDescription` is a short text to describe the command's usage.

The basic form of the Ping Pong command is already built, but this command does nothing yet. To add a usage for this command, we need to code a function to respond to the interaction.

The simplest way to create a response function is to do it using the ```interaction.reply()``` method. The following function is declared in the ```commands/ping.js``` file, to be soon explained.
```
async execute(interaction) {
	await interaction.reply('Pong!')
}
```
To put these together, you should create ```commands/ping.js```. The commands directory is where you should insert two properties: `data` and `execute` method.

<ul>
    <li>Data (property): provides the command's definition</li>
    <li>Execute (method): contains the funcionalities to run from the event handler when the command is used.</li>
</ul>

# Important Observations
<ol>
    <li>Guild: for the discord.js library, guilds is the way they refer to servers</li>
</ol>
