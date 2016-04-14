import $ from 'jquery';

export default function notification() {
    this.notification = $('.notification');
    this.notificationCloseButton = $('.notification-close-button');

    console.log("notificationCloseButton", this.notificationCloseButton);

    this.notificationCloseButton.on('click', (e) => {
        this.notification.hide();
    });
}