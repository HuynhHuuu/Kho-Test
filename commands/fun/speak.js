const { EmbedBuilder } = require('discord.js')
const { getAudioUrl } = require('google-tts-api')
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, StreamType } = require('@discordjs/voice')

module.exports = {
    name: 'speak',
    aliases: ['suc', 'talk'],
    category: 'fun',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Cái lồn má đéo nhập gì sao nói')
        const string = args.join(' ')
        if (string.length > 200) return message.channel.send('Đụ đĩ mẹ nhập ít thôi')
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.reply('Dô room đi thằng lồn')
        try {
            // const exampleEmbed = new EmbedBuilder()
            // .setColor(0x0099FF)
            // .setTitle('Some title')
            // .setURL('https://discord.js.org/')
            // .setAuthor({ name: 'Some name', url: 'https://discord.js.org' })
            // .setDescription('Some description here')
            // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            // .addFields(
            //     { name: 'Regular field title', value: 'Some value here' },
            //     { name: '\u200B', value: '\u200B' },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            // )
            // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            // .setImage('https://i.imgur.com/AfFp7pu.png')
            // .setTimestamp()
            // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            })
            const stream = getAudioUrl(args.join(' '), {
                lang: 'vi',
            });
            const player = createAudioPlayer();
            const resource = createAudioResource(stream, {inlineVolume: true});
            player.play(resource);

            const connection = getVoiceConnection(message.guild.id);
            connection.subscribe(player);
            console.log('OK')
        } catch(e) {
            message.channel.send('Kêu nữa tao dả dô cái mỏ lồn nha')
        }
    }
}