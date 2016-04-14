import $ from 'jquery';

export default function notification() {
    this.notification = $('#notification');
    this.postsWrapper = $('#posts-wrapper');
}

notification.prototype.displayNotificationBlock = function(notificationBlock) {
    if(!localStorage.getItem('extra-notification')) {
        let topCorrectionClass = 'content-top-correction';
        this.postsWrapper.addClass(topCorrectionClass);

        this.notification.append(notificationBlock);
        this.notification.show();

        this.notificationCloseButton = $('.notification-close-button');

        this.notificationCloseButton.on('click', (e) => {
            this.notification.hide();
            this.postsWrapper.removeClass(topCorrectionClass);
            localStorage.setItem('extra-notification', true);
        });
    }
}