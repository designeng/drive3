import carcass  from '../../templates/build/carcass';
import body     from '../../templates/build/body';

const postPageWidthCorrection = 'post-page-width-correction';

export default function getCarcassFn(channelsMenu, postId) {
    return (content, channel, sharedData) => {
        const bodyContent = body({
            channelsMenu: channelsMenu,
            channel,
            content,
            sharedData: JSON.stringify(sharedData),
            contentCorrectionClasses: postId ? postPageWidthCorrection : ''
        })
        return carcass({
            body: bodyContent,
            channel
        })
    }
}