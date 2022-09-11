module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['p'],
    run: (client, message, args) => {
        message.channel.send(`Ping ${client.ws.ping} ms`)
    }
}