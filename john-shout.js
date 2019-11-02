const Discord = require('discord.js');
const client = new Discord.Client();

const johnID = '202530993532305409';

client.login('NjQwMjE4Mzk5OTg0NTgyNzAy.Xb2pQA.Z6RegwxaVS3cE5nJ77QCz5kWQm8');

client.on('ready', ()=> {
    console.log(`Logged in as ${client.user.tag}!`);  
});

client.on('message', (message) => {
    if (message.author.id == johnID) {
        const messageContent = message.content.toUpperCase();
        message.delete(1000);
        message.channel.send(messageContent);
    }
});