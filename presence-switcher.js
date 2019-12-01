const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.YOUR_TOKEN);

const status = ['online', 'idle', 'dnd'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);  
  const channel = client.channels.get('261287689066774528');
  client.user.setActivity("with my homies feelings");
  setInterval( () => {
      channel.stopTyping();
      client.user.setStatus(status[Math.floor(Math.random() * status.length)]);
      channel.startTyping();
  }, Math.floor(Math.random() * 2000));
 });