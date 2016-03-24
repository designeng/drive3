import axios from 'axios';
import _ from 'underscore';

function normalizeEndpoint(endpoint) {
    return _.isString(endpoint) ? endpoint : (_.isArray(endpoint) ? 
        endpoint.join('/') : new Error('[requestPlugin:] Endpoint should be a string or array of strings.'))
}

function request(resolver, compDef, wire) {

    let endpoint = compDef.options.endpoint;
    let what = compDef.options.what;
    let params = compDef.options.params;

    wire(compDef.options).then(({
        endpoint,
        what,
        params
    }) => {
        if (!endpoint) {
            throw new Error('[requestPlugin:] Please set endpoint to request factory.')
        }
        let method = compDef.options.method;
        const allowedMethods = ['get', 'delete', 'head', 'post', 'put', 'patch'];

        if(!method) {
            method = 'get'
        } else if(allowedMethods.indexOf(method) == -1) {
            throw new Error('[requestPlugin:] Unknown method!');
        }

        endpoint = normalizeEndpoint(endpoint);

        axios[method](endpoint, {
            params
        })
        .then(response => {
            let result = what ? response.data[what] : response.data;
            resolver.resolve(result);
        })
        .catch(error => resolver.reject(error));
    });
}

export default function requestPlugin(options) {
    return {
        factories: {
            request
        }
    }
}