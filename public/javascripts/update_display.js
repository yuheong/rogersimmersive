// Listens for new key-value pairs added to update ref of firebase
var updateRef = firebase.database().ref('update');
var positionRef = firebase.database().ref('pos/');

updateRef.on('child_added', function (snapshot) {
    var newPhone = snapshot.val();
    var imgUrl = newPhone.imageurl;
    var currPosition;
    //console.log('children: ' + snapshot.numChildren());

    positionRef.once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            currPosition = snapshot.child("current").val();
            console.log('index: ' + currPosition);
        } else {
            console.log('current index not in db');
        }
    }).then(() => {
        var imgId = "image" + currPosition;
        document.getElementById(imgId).setAttribute("src", imgUrl);
    }).catch(err => {
        console.log('error :' + err);
    });
});