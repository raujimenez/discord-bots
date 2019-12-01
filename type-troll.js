const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.YOUR_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.get('261287689066774528');
  channel.startTyping();
});