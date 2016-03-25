export default function getChannels(channels, defaultChannelName) {
    channels.unshift({
        Id: 0,
        Caption: defaultChannelName
    })
    return channels;
}