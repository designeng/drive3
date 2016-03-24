import carcass  from '../../templates/build/carcass';

export default function getCarcassFn(logoBlock, channelsMenu) {
    return (content) => {
        return carcass({
            logo: logoBlock,
            channelsMenu: channelsMenu,
            content
        })
    }
}