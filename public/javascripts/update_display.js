// Listens for new key-value pairs added to update ref of firebase
var updateRef = firebase.database().ref('update');
var positionRef = firebase.database().ref('pos/');
var newPhoneRef = firebase.database().ref('newphone/');
var loadPhone = false;

updateRef.on('child_added', function (snapshot) {
    var newPhone = snapshot.val();
    var imgUrl = newPhone.imageurl;
    var currPosition;

    if (!loadPhone) {
        newPhoneRef.once('value').then(function (snapshot) {
            if (snapshot.exists()) {
                currPosition = snapshot.child("current").val();
                console.log('index: ' + currPosition);
            } else {
                console.log('current index not in db');
            }
        }).then(() => {
            loadPhone = true;
            document.getElementById("image0").setAttribute("src", imgUrl);
        }).catch(err => {
            console.log('error :' + err);
        });
    } else {
        document.getElementById("image1").setAttribute("src", imgUrl);
    }

});