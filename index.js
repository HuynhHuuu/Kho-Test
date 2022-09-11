require('dotenv').config()
const express = require("express");
const app = express();
app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log("Server is running.");
});

const { Client, Collection, IntentsBitField, Partials } = require('discord.js')
const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages, IntentsBitField.Flags.DirectMessageReactions, IntentsBitField.Flags.GuildMessageReactions, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildVoiceStates);
const client = new Client({intents: myIntents, partials: [Partials.Message, Partials.Channel, Partials.Reaction]})

client.on('ready', () => {
    console.log(`${client.user.username} nè`)

    client.user.setPresence({
        activities: [{
            name: 'Đang sục',
            type: 'Playing',
        }],
        status: 'online'
    })
})

client.commands = new Collection()
client.aliases = new Collection()

const commandAlias = ['command']

commandAlias.forEach(handler => {
    require(`./handlers/${handler}`)(client)
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    const prefix = '/'
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    if (command) command.run(client, message, args)
})

client.login(process.env.BOT_TOKEN)