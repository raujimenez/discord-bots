const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const johnID = process.env.JOHN_ID;

client.login(process.env.JOHN_SHOUT_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.author.id == johnID) {
    const messageContent = '** ' + message.content.toUpperCase() + ' **';
    message.delete(500);
    message.channel.send(messageContent);
  }
});