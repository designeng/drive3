import $ from 'jquery';

export default function notification() {
    this.notification = $('.notification);
    this.notificationCloseButton = $('notification-close-button');

    console.log("this.notificationCloseButton", this.notificationCloseButton);

    this.notificationCloseButton.on('click', (e) => {
        console.log("clicked");
        this.notification.hide();
    });

    this.notification.on('click', (e) => {
        console.log("clicked notification");
        this.notification.hide();
    });
}