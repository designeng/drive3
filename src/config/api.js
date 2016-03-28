const config = {
    protocol: 'http',
    host: 'api-test.d3-x.net'
}

const endpoints = {
    channels        : "/channels",
    posts           : "/posts",
    postsByChannels : "/posts/channels",
    postById        : "/posts/byIds",
}

const localEndpoints = {
    posts           : "/api/posts"
}

function getBaseUrl() {
    return config.protocol + '://' + config.host
}

function getMockBaseUrl() {
    return 'http://localhost:3001';
}

// TODO: extra params arg?
export function getEndpoint(item, params, mode) {
    const mock = {
        mockChannels            : "/mock/channels",
        mockChannelsShortList   : "/mock/channelsShortList",
        mockPosts               : "/mock/posts",
    }

    if(mock[item]) {
        return getMockBaseUrl() + mock[item];
    }

    if(mode === 'local') {
        return localEndpoints[item];
    }

    if(!endpoints[item]) {
        throw new Error('No such endpoint: ' + item);
    }

    return getBaseUrl() + endpoints[item];
}

export default config;