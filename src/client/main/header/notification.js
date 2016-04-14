import $ from 'jquery';

export default function notification() {
    this.notification = $('.notification');
    this.notificationCloseButton = $('.notification-close-button');

    this.notificationCloseButton.on('click', (e) => {
        this.notification.hide();
    });
}