const Discord = require('discord.js');
const mongodb = require('mongodb')
const client = new Discord.Client();
require('dotenv').config();

client.login(process.env.LOGTOKEN)

client.on('ready', async () => {
    console.log(`logged in as ${client.user.tag}`)
});


async function getAllMessages(message) {
    if (message == null)
        return 
    
    await message.channel.fetchMessages({limit : 100, before: message.id})
    .then(messages => {
        mongodb.connect('mongodb://localhost:27017/discordLogger')
        .then(mongoClient => {
            messages.forEach((discordMessage, key, mapper) => {
                let record = {
                    author: discordMessage.author.username,
                    content: discordMessage.content,
                    timestamp: discordMessage.createdAt
                }
                console.log(record)
                mongoClient.db('discordLogger').collection('messages').insertOne({record}, (error, result) => 1 + 1)  
            })
            getAllMessages(messages.last())
        })
    })
}

client.on('message', async (message) => {
    if(message.content == '!getlogs') {
        getAllMessages(message);
        message.channel.send('I logged all of the messages 🕵️‍♀️')
    }
})