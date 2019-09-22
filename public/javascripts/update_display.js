var updateRef = firebase.database().ref('update');
updateRef.on('value', function (snapshot) {
    console.log('res: ' + snapshot.val());
    document.getElementById("image1").setAttribute("src", 'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg');
    document.getElementById("change").innerHTML = new Date();
});