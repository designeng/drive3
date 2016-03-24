import _ from 'underscore';
import dasherize from 'underscore.string/dasherize';

export default function transformChannels(channelsData) {
    return _.map(channelsData, (item) => {
        return _.extend(item, {
            ChannelUrl: dasherize(item.Caption)
        })
    })
}