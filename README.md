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
    <li>```https://discord.com/api/oauth2/authorize``` simply a default part of the URL</li>
    <li>```client_id=...``` specifies which bot you want to authorize by its client id</li>
    <li>```permissions=...``` specifies the permissions the bot needs to run the server</li>
    <li>```scope=bot%20applications.commands``` this shows to discord, that this user is a bot, not a human user</li>
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
node_modules
.env
config.json
```
