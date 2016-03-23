import carcass from '../../templates/build/carcass';

export default function getCarcassFn(channelsMenu) {
    return (content) => {
        return carcass({
            channelsMenu: channelsMenu,
            content
        })
    }
}