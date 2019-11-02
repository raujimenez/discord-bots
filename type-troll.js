const Discord = require('discord.js');
const client = new Discord.Client();

client.login('MTE1NTczMTc3MDM5NTg1Mjg5.XSLogg.Lg5KNZejH69O-pbBKjuQaP7vRuY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);  
  const channel = client.channels.get('261287689066774528');
  channel.startTyping();
 });