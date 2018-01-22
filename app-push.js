firebase.initializeApp({
    messagingSenderId: '148463578166'
});


var device_id = $('#device_id');

var form = $('#notification');

var alert_div = $('#alert');

var alert_message = $('#alert-message');


// var timerId = setInterval(setNotificationDemoBody, 10000);


function addZero(i) {
    return i > 9 ? i : '0' + i;
}

// resetUI();

if (window.location.protocol === 'https:' &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'localStorage' in window &&
    'fetch' in window &&
    'postMessage' in window
) {

    form.on('submit', function(event) {
        event.preventDefault();

        var notification = {};
        form.find('input').each(function () {
            var input = $(this);
            notification[input.attr('name')] = input.val();
        });

        sendNotification(notification);
    });


}

function getToken() {
   return device_id.val();
}

function sendNotification(notification) {
    var key = 'AAAAIpEebDY:APA91bEiXMw2AbNrE9p85wKcOc-2wWXBKhh4Jlig7x0zavapkIFA_oFBRTWYluD0WB8Yeg-lBAwg-qDDzUHO8d2DdF5-HiBbHRuoNtADATfujR7RWVMzsUJnILyeiFuwuJX6rp_aZ9y0';

    console.log('Send notification', notification);

    enterDeviceToken = device_id.val();



    fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            'notification': notification,
            'to': enterDeviceToken
        })
    });


}



function showError(error, error_data) {
    if (typeof error_data !== "undefined") {
        console.error(error + ' ', error_data);
    } else {
        console.error(error);
    }

    alert_div.show();
    alert_message.html(error);
}
