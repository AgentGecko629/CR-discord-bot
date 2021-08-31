const Discord = require("discord.js");

const SnakeGame = require('snakecord');

const math = require('mathjs');

const got = require('got');

const { MusicBot } = require("discord-music-system");

const TicTacToe = require('discord-tictactoe')

const r = "RANDOM";

const Lincoln = new Discord.Client({intents: Object.getOwnPropertyNames(Discord.Intents.FLAGS)})

const prefix = "!";

new TicTacToe({language: 'en', command:'!tictactoe'}).attach(Lincoln);

Lincoln.once('ready', (message) => {
   console.log("Lincoln is ready !")
   Lincoln.user.setActivity("!commands", {type: "LISTENING"});
   console.clear()
})

Lincoln.musicBot = new MusicBot(Lincoln, {
  ytApiKey: 'AIzaSyDfeiaNmxg-CDEwiWmVjyv1iAao7f7e9wA',
  prefix: '!',
  language: 'en'
});

Lincoln.on('message', async message => {
  if(message.author.bot) {
      return;
  };
  Lincoln.musicBot.onMessage(message);
});



Lincoln.on('message', function(message) {
  if(message.content === "!tasks") {
    
    
    message.channel.send("Here is the link :link: to our To Do List : https://creativit.netlify.app")
  }
  
})

 Lincoln.on('message', function(message) {
  if (message.content === '!hello Lincoln') {
    message.reply(`Hello :wave:`);
  }
 });
Lincoln.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! :ping_pong:  Your ping :arrow_forward: ${timeTaken}ms.`);
  }

  else if(command === 'kick'){
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don't have permission to kick members.");
        let toKick = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return message.channel.send(':x: Please mention someone to kick');
        if(!toKick) return message.channel.send(`${args[0]} is not a member.`);
        if(!reason) return message.channel.send('Specify a reason.');
 
        if(!toKick.kickable){
            return message.channel.send(':x: I cannot kick someone that is mod/admin. :x:');
        }
 
        if(toKick.kickable){
            let x = new Discord.MessageEmbed()
            .setTitle('Kick')
            .addField('Member Kicked', toKick)
            .addField('Kicked by', message.author)
            .addField('Reason', reason)
            .addField('Date', message.createdAt)
            .setColor(r);
 
            message.channel.send(x);
            toKick.kick();
        }
    }


  else if (command === "plus") {
    const numArgs = args.map(x => parseFloat(x));
    const plus = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The result :arrow_forward: ${plus}:exclamation:`);
  }
  
   
  else if (command === "div") {
    const numArgs = args.map(x => parseFloat(x));
    const div = numArgs.reduce((counter, x) => counter /= x);
    message.reply(`The result :arrow_forward: ${div}:exclamation:`)
  }
  else if (command === "mul") {
    const numArgs = args.map(x => parseFloat(x));
    const mul = numArgs.reduce((counter, x) => counter *= x);
    message.reply(`The result :arrow_forward: ${mul}:exclamation:`);
  }

  else if (command === "website") {
    message.channel.send("Here is the link :link: to our official website : https://lincoln-bot.netlify.app")
  }
  
  else if (command === "minus") {
    const numArgs = args.map(x => parseFloat(x));
    const minus = numArgs.reduce((counter, x) => counter -= x);
    message.reply(`The result :arrow_forward: ${minus}:exclamation:`);
  }

  else if (command === 'help') {
    const helpembed = new Discord.MessageEmbed()
	.setColor('#2ECC71')
	.setTitle('Help')
	.setAuthor('Lincoln')
	.setDescription("Here's what Lincoln can do.")
	.setThumbnail('https://img.icons8.com/fluency/96/000000/help.png')
	.addFields(
		{ name: 'Maths', value: '`!plus number1 number2` | `!div number1 number2` | `!mul number1 number2` | `!minus number1 number2`', inline: true },
		{ name: 'Moderator', value: '`!ban @user` | `!kick @user` | `!clear number of messages between 1 to 99`', inline: true },
    { name: 'Games', value: '`!tictactoe @user or alone with Lincoln` | `!snake`', inline: true },
    { name: 'Music', value: '`!play music name`  | `!skip`  | `!stop` | `!add music name`', inline: true },
    { name: 'Memes', value: '`!meme`', inline: true },
    { name: 'Other', value: '`!hello Lincoln` | `!ping` | `!about` | `!tasks`  | `!help`  | `!website`', inline: true },
	)
	.setTimestamp()
	.setFooter('Lincoln at your service');

  message.channel.send(helpembed);

  }

  else if (command === 'about') {
    const aboutembed = new Discord.MessageEmbed()
    .setTitle("About Lincoln")
    .setDescription("Lincoln :robot: has been created by DarkLight#3008 and NinDev#2933 :grinning: using nodejs (https://nodejs.org/en/) and the JavaScript programming language (https://developer.mozilla.org/en-US/docs/Web/JavaScript) ! Our official website : https://lincoln-bot.netlify.app")
    .setTimestamp()
    .setFooter("Lincoln is at your service")
    .setColor('#5DADE2')
    message.channel.send(aboutembed)

  }

     if (message.content === "!meme") {
        const memeembed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            memeembed.setTitle(`${memeTitle}`)
            memeembed.setURL(`${memeUrl}`)
            memeembed.setImage(memeImage)
            memeembed.setColor(r)
            memeembed.setFooter(`👍 ${memeUpvotes} | 👎 ${memeDownvotes} | 💬 ${memeNumComments}`)
            message.channel.send(memeembed);
        })
    }

});

Lincoln.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('!ban')) {
    
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            message.channel.send(`:white_check_mark: Lincoln successfully banned ${user.tag} !`);
            
          })
          .catch(err => {
            message.channel.send(':x: Lincoln is unable to ban this member !');
            console.error(err);
          });
      } else {
        message.channel.send("This user isn't in this guild !");
      }
    } else {
      message.channel.send(":x: Please mention a valid user to ban !");
    }
  }
  
});

Lincoln.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .toLowerCase()
    .slice(prefix.length)
    .trim()
    .split(/\s+/);
  const [command, input] = args;

  if (command === 'clear') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel
        .send(
          ":x: You cant use this command since you're missing 'Manage Messages' permission !",
        );
    }

    if (isNaN(input)) {
      return message.channel
        .send(':x: Please enter the amount of messages that you would like to clear !')
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2500);
        });
    }

    if (Number(input) < 0) {
      return message.channel
        .send(':x: Please enter a positive number !')
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2500);
        });
    }

    const amount = Number(input) > 101
      ? 101
      : Number(input) + 1;

    message.channel.bulkDelete(amount, true)

    .then((_message) => {
      message.channel

        .send(`:white_check_mark: Lincoln successfully cleared \`${_message.size}\` messages :broom: |  __***This message will be deleted in 5 seconds...***__`)
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 5000);
        });
    });
  }
});

const snakeGame = new SnakeGame({

  title: 'Lincoln Snake Game',

  color: "RED",

  timestamp: false,

  gameOverTitle: "Game Over :cry:"

});



const config = {

  prefix: "!"

}


Lincoln.on('message', message => {

 if(!message.content.startsWith(config.prefix) || message.author.bot) return;



 const args = message.content.slice(config.prefix.length).trim().split(/ +/);

 const command = args.shift().toLowerCase();



 if(command === 'snake') {

   return snakeGame.newGame(message);

 }

});



Lincoln.login(process.env.token);