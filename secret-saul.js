const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();


let participants = []
client.login(process.env.SECRET_SAUL_TOKEN);

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (/^!santa me in$/.test(message.content)) {
    if (participants.some(user => user.info.id == message.author.id)) {
      console.log('did not add ' + message.author.username)
      message.react(message.guild.emojis.find(emoji => emoji.name == 'REEE'))
    }
    else {
      console.log('added user ' + message.author.username)
      participants.push({ info: message.author })
      message.react(message.guild.emojis.find(emoji => emoji.name == 'Thumbsup'))
    }
  }
  else if (/^!santa me out$/.test(message.content)) {
    if (participants.some(user => user.info.id == message.author.id)) {
      participants = participants.filter(participant => participant.info.id != message.author.id)
      console.log('removed user ' + message.author.username)
      message.react(message.guild.emojis.find(emoji => emoji.name == 'Thumbsup'))
    }
    else {
      console.log('did not remove user ' + message.author.username)
      message.react(message.guild.emojis.find(emoji => emoji.name == 'REEE'))
    }
  }
  else if (/^!santa list$/.test(message.content)) {
    usernames = []
    participants.forEach(participant => usernames.push(participant.info.username))
    message.channel.send('>>> Secret Santas 🎅: \n' + ((usernames.length == 0) ? 'no one :PepeHands:': usernames.join('\n')))
  }
  else if (/^!santa raffle$/.test(message.content)) {
    let givers = shuffle(participants.slice(0))
    let receivers = shuffle(participants.slice(0))

    // check to make sure no one got themselves
    let match = true
    while (match) {
      givers = shuffle(participants.slice(0))
      receivers = shuffle(participants.slice(0))
      match = false
      for (let i = 0; i < participants.length; i++) {
        if (givers[i].info.id == receivers[i].info.id) {
          console.log(givers[i].info.username + ' matched with ' + receivers[i].info.username)
          match = true
        }
      }
    }

    console.log('givers' + givers)
    console.log('receivers' + receivers)

    for (let i = 0; i < participants.length; i++) {
      await client.users.get(givers[i].info.id).send('you got ' + receivers[i].info.username)
    }
    participants = []
  }
  else if (/^!santa reset$/.test(message.content)) { 
    message.channel.send('>>> list has been reset')
    participants = []
  }
  else if (/^!santa help$/.test(message.content)) {
    help_str = `>>> \`!santa me in\`\nput your name in the secret santa raffle\n\`!santa me out\`\nput your name out of the secret santa raffle\n\`!santa list\`\nlist everyone participating in the raffle\n\`!santa raffle\`\nstart the raffle with all the participants. Check DMs\n\`!santa reset\`\nreset secret santas\n\`!santa help\`\nshow help menu`

    message.channel.send(help_str);
  }
});
