const config = {
    protocol: 'http',
    host: 'api-test.d3-x.net'
}

const endpoints = {
    channels        : "/channels",
    posts           : "/posts",
    postsByChannels : "/posts/channels",
    postById        : "/posts/byIds",
    postComments    : "/comments/post",
}

const localEndpoints = {
    posts           : "/api/posts",
    postsByChannels : "/api/posts/channels"
}

function getBaseUrl() {
    return config.protocol + '://' + config.host
}

// TODO: extra params arg?
export function getEndpoint(item, params, mode) {

    if(mode === 'local') {
        return localEndpoints[item];
    }

    if(!endpoints[item]) {
        throw new Error('No such endpoint: ' + item);
    }

    return getBaseUrl() + endpoints[item];
}

export default config;