import carcass  from '../../templates/build/carcass';
import body     from '../../templates/build/body';
import getSocialMeta from './getSocialMeta';

const postPageWideCorrection    = 'post-page-wide-correction';
const postPageNarrowCorrection  = 'post-page-narrow-correction';

export default function getCarcassFn(channelsMenu, postId) {
    return (content, channel, sharedData, postData) => {
        const bodyContent = body({
            channelsMenu: channelsMenu,
            channel,
            content,
            sharedData: JSON.stringify(sharedData),
            contentCorrectionClasses: postId ? postPageWideCorrection : postPageNarrowCorrection
        })
        return carcass({
            socialMeta: postData ? getSocialMeta(postData) : void 0,
            body: bodyContent,
            channel
        })
    }
}