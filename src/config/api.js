const config = {
    protocol: 'http',
    host: 'api-test.d3-x.net'
}

const endpoints = {
    posts      : "/posts",
    channels   : "/channels"
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