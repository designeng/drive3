const config = {
    protocol: 'http',
    host: 'api-test.d3-x.net'
}

function getBaseUrl() {
    return config.protocol + '://' + config.host
}

export default config;

export function getPostsUrl() {
    return getBaseUrl() + '/posts';
}

export function getChannelsUrl() {
    return getBaseUrl() + '/channels';
}