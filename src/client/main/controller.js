import $ from 'jquery';

function controller() {}

controller.prototype.appendPosts = function(context) {
    $('#scroller').find('ul').append(context.postsBlock);
}

export default controller;