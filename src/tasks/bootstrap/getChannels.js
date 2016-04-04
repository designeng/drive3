export default function getChannels(channels, channel) {
    channels.unshift({
        Id: 0,
        Caption: channel.name
    })
    return channels;
}