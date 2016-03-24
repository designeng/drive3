import carcass  from '../../templates/build/carcass';
import body     from '../../templates/build/body';

export default function getCarcassFn(logoBlock, channelsMenu) {
    return (content) => {
        const bodyContent = body({
            logo: logoBlock,
            channelsMenu: channelsMenu,
            content
        })
        return carcass({
            body: bodyContent
        })
    }
}