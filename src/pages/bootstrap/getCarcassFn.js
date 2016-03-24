import carcass  from '../../templates/build/carcass';
import body     from '../../templates/build/body';

export default function getCarcassFn(logoBlock, channelName, channelsMenu) {
    return (content) => {
        const bodyContent = body({
            logo: logoBlock,
            channelName,
            channelsMenu: channelsMenu,
            content
        })
        return carcass({
            body: bodyContent
        })
    }
}