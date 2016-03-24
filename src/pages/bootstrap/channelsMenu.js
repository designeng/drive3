import channelsMenuTemplate from '../../templates/build/channelsMenu';

import _ from 'underscore';
import dasherize from 'underscore.string/dasherize';

// function transformChannels(channelsData) {
//     return _.map(channelsData.Channels, (item) => {
//         return _.extend(item, {
//             ChannelUrl: dasherize(item.Caption)
//         })
//     })
// }

export default function channelsMenu(channelsData) {
    // channelsData = transformChannels(channelsData)
    _.each(channelsData.Channels, (item) => {
        item = _.extend(item, {
            ChannelUrl: dasherize(item.Caption).slice(1)
        })
    })

    return channelsMenuTemplate(channelsData)
}