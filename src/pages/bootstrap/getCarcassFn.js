import carcass  from '../../templates/build/carcass';
import body     from '../../templates/build/body';

export default function getCarcassFn(logoBlock, channelName, channelsMenu, postId) {
    return (content) => {
        const bodyContent = body({
            logo: logoBlock,
            channelsMenu: channelsMenu,
            channelName,
            content,
            contentCorrectionClasses: postId ? 'post-page-width-correction' : ''
        })
        return carcass({
            body: bodyContent
        })
    }
}