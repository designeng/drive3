import carcass  from '../../templates/build/carcass';
import body     from '../../templates/build/body';

export default function getCarcassFn(logoBlock, channelsMenu, postId) {
    return (content, channel, sharedData) => {
        const bodyContent = body({
            logo: logoBlock,
            channelsMenu: channelsMenu,
            channel,
            content,
            sharedData: JSON.stringify(sharedData),
            contentCorrectionClasses: postId ? 'post-page-width-correction' : ''
        })
        return carcass({
            body: bodyContent
        })
    }
}