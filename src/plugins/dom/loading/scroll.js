import $ from 'jquery';
import axios from 'axios';

function requestData(params) {
    axios.get('/api/posts', { params }).then(function (response) {
        console.log("RESPONSE::::", response);
    })
}

function dinamicLoading(resolver, compDef, wire) {
    wire(compDef.options).then(({
        params
    }) => {
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()){
                requestData(params);
            }
        });

        resolver.resolve();
    })
}

export default function scrollLoadingPlugin(options) {
    return {
        factories: {
            dinamicLoading
        }
    }
}