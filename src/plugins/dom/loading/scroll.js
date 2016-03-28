import $ from 'jquery';
import axios from 'axios';

// function loadFacet(resolver, facet, wire) {
//     const target = facet.target;
//     wire(facet.options).then(({
//         opt
//     }) => {
//         resolver.resolve(target);
//     })
// }

function requestData (start, lastPostId) {
    axios.get('/api/posts?limit=3&fromPostId=' + lastPostId).then(function (response) {
        console.log("RESPONSE::::", response);
    })
}

function dinamicLoading(resolver, compDef, wire) {
    wire(compDef.options).then(({

    }) => {
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()){
                requestData();
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