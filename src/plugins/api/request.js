import axios from 'axios';
import _ from 'underscore';

function request(resolver, compDef, wire) {
    let url = compDef.options.url;
    let params = compDef.options.params;
    if (!url) {
        throw new Error('[requestPlugin:] Please set url to request factory.')
    }
    let method = compDef.options.method;
    const allowedMethods = ['get', 'delete', 'head', 'post', 'put', 'patch'];

    if(!method) {
        method = 'get'
    } else if(allowedMethods.indexOf(method) == -1) {
        throw new Error('Unknown method!');
    }

    axios[method](url, {
        params
    })
    .then(response => {
        resolver.resolve(response)
    })
    .catch(error => {
        console.log("REQUEST PLUGIN ERROR:::", error);
        resolver.reject(error)
    });
}

export default function requestPlugin(options) {
    return {
        factories: {
            request
        }
    }
}