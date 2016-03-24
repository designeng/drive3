import channelsMenuTemplate from '../../templates/build/channelsMenu';

import _ from 'underscore';
import dasherize from 'underscore.string/dasherize';

export default function channelsMenu(channelsData) {

    // TODO: ChannelUrl should be recognized by express router
    // maybe row Id is better (?)
    _.each(channelsData.Channels, (item) => {
        item = _.extend(item, {
            ChannelUrl: dasherize(item.Caption).slice(1)
        })
    })

    return channelsMenuTemplate(channelsData)
}