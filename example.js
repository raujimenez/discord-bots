const Discord = require('discord.js');
const client = new Discord.Client();

const Sentiment = require('sentiment');
const sentiment = new Sentiment();
 
client.login('MTE1NTczMTc3MDM5NTg1Mjg5.XSLogg.Lg5KNZejH69O-pbBKjuQaP7vRuY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);  
  let output = "sentiment analysis score over the past ";
  const channel = client.channels.get('261287689066774528');
  
  channel.fetchMessages({ limit: 100 })
  .then(messages => {
    messageArray = messages.values();
    let sum = 0;
    let count = 0;
    for(const message of messageArray) {
        let result = sentiment.analyze(message.content);
        sum += result.score;
        count++;
    }

    let avg = sum / count;
    output += count.toString() + " messages: " + avg.toString();

    if(avg < -1) {
        output += "\noverall negative vibes in the past " + count.toString() + " messages.";
    }
    else if(avg > 1) {
        output += "\noverall positive vibes in the past " + count.toString() + " messages.";    
    } 
    else {
        output += "\noverall neutral vibes in the past " + count.toString() + " messages.";
    }
    channel.send(output.toString()).then( () =>
    process.exit(1));
  });
 });