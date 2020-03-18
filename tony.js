const Discord = require("discord.js");
const {Builder, By, Key, util} = require('selenium-webdriver');
require("dotenv").config();

const client = new Discord.Client();

client.login(process.env.TONY_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
  if (/^!tony.up$/.test(message.content)) {
    const response = await fetch('https://itsmetony.aternos.me');
    const text = await response.text();
    message.reply(text.includes('offline') ? 'offline' : 'online')
  }
  else if (/^!tony.ip$/.test(message.content)) {
    message.reply('`itsmetony.aternos.me`')
  }
  else if (/^!tony.start$/.test(message.content)) {

  }
  else if (/^!tony.help$/.test(message.content)) {
    help = '!tony.up - test if server is up\n';
    help += '!tony.ip - show ip address for server\n';
    help += '!tony.start - start server';
    help += '!tony.stop - stop server'; 
    message.reply(help)
  }
  else if (/^!tony.*$/.test(message.content)) {
    message.reply('type !tony.help to see list of commands.')
  }
});