import $ from 'jquery';

function createScrollListener(resolver, compDef, wire) {
    wire(compDef.options).then(({
        invoke,
        withArgs,
        onResult
    }) => {
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                console.log("withArgs:::::", withArgs);
                invoke.apply(null, withArgs).then(onResult)
            }
        });

        resolver.resolve();
    })
}

export default function scrollLoadingPlugin(options) {
    return {
        factories: {
            createScrollListener
        }
    }
}