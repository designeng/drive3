import $ from 'jquery';

export default function notification() {
    this.notification = $('#notification');
    this.postsWrapper = $('#posts-wrapper');
}

notification.prototype.displayNotificationBlock = function(notificationBlock, invocationEnvironment) {
    let displayCountLimit = 3;
    let count = parseInt(localStorage.getItem('extra-notification-count'));
    if(isNaN(count)) count = 0;

    if(!count || count < displayCountLimit && !invocationEnvironment.postId) {
        let topCorrectionClass = 'content-top-correction';
        this.postsWrapper.addClass(topCorrectionClass);

        this.notification.append(notificationBlock);
        this.notification.show();
        count++;
        localStorage.setItem('extra-notification-count', count);

        this.notificationCloseButton = $('.notification-close-button');

        this.notificationCloseButton.on('click', (e) => {
            this.notification.hide();
            this.postsWrapper.removeClass(topCorrectionClass);
            localStorage.setItem('extra-notification-count', displayCountLimit);
        });
    }
}