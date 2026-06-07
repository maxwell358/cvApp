document.addEventListener('deviceready', onDeviceReady, false);

// Fallback for browser testing if Cordova is not ready
if (!window.cordova) {
    setTimeout(onDeviceReady, 500);
}

let isAppReady = false;

function onDeviceReady() {
    if (isAppReady) return;
    isAppReady = true;

    // Define Home page behavior
    App.populator('home', function (page) {
        $(page).find('#change-pic').on('click', function () {
            if (navigator.camera) {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL
                });
            } else {
                alert('Camera native plugin not found on browser.');
            }

            function onSuccess(imageData) {
                document.getElementById('avatar').src = "data:image/jpeg;base64," + imageData;
            }
            function onFail(message) {
                console.log('Camera failed: ' + message);
            }
        });
    });

    // Register Experience page route
    App.populator('experience', function (page) {
        console.log('Switched to Experience screen');
    });

    // Register Skills page route
    App.populator('skills', function (page) {
        console.log('Switched to Skills screen');
    });

    // Register Location page route and hardware hook
    App.populator('location', function (page) {
        $(page).find('#get-loc').on('click', function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    document.getElementById('loc-display').innerHTML =
                        'Lat: ' + position.coords.latitude.toFixed(4) + '<br>' +
                            'Long: ' + position.coords.longitude.toFixed(4);
                            }, function(err) {
                                alert('GPS failed: ' + err.message);
                            });
                            } else {
                                alert('Geolocation native plugin not found.');
                            }
                            });
                            });

                            // Critical step: Initialize and force transition to home
                            App.load('home');
                            }
