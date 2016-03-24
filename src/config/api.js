const config = {
    protocol: 'http',
    host: 'api-test.d3-x.net'
}

const endpoints = {
    channels   : "/channels",
    posts      : "/posts",
}

function getBaseUrl() {
    return config.protocol + '://' + config.host
}

function getMockBaseUrl() {
    return 'http://localhost:3001';
}

export function getEndpoint(item) {
    const mock = {
        mockChannels            : "/mock/channels",
        mockChannelsShortList   : "/mock/channelsShortList",
        mockPosts               : "/mock/posts",
    }
    if(mock[item]) {
        return getMockBaseUrl() + mock[item];
    }

    if(!endpoints[item]) {
        throw new Error('No such endpoint: ' + item);
    }
    return getBaseUrl() + endpoints[item];
}

export default config;