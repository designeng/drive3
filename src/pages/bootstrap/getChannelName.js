import _ from 'underscore';

export default function getChannelName(channelId, channels, defaultCaption) {
    let channel = _.find(channels, {Id: channelId});
    return channel ? channel['Caption'] : defaultCaption;
}