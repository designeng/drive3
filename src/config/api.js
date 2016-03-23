const config = {
    protocol: 'http',
    host: 'api-test.d3-x.net'
}

const endpoints = {
    channels   : "/channels",
    posts      : "/posts",

    mockChannels    : "/mock/channels",
    mockPosts       : "/mock/posts",
}

function getBaseUrl() {
    return config.protocol + '://' + config.host
}

export function getEndpoint(item) {
    if(!endpoints[item]) {
        throw new Error('No such endpoint: ' + item);
    }
    return getBaseUrl() + endpoints[item];
}

export default config;