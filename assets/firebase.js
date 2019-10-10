$(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCC6VqyXoD4cZ5r4yjYmYhaS49cxv7enSk",
        authDomain: "forkthisnutrition.firebaseapp.com",
        databaseURL: "https://forkthisnutrition.firebaseio.com",
        projectId: "forkthisnutrition",
        storageBucket: "",
        messagingSenderId: "1092322639170",
        appId: "1:1092322639170:web:3641b019a4b5a7f9e55cdb"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let db = firebase.database()
    let auth = firebase.auth()

    function getFavoriteRecipes() {
        db.ref(`${user}/favorites/recipes`).once('value', function (snapshot) {
            let data = snapshot.val()
        })
    }
    function getFavoriteProducts() {
        db.ref(`${user}/favorites/products`).once('value', function (snapshot) {
            let data = snapshot.val()

        })
    }

    function addFavoriteRecipe(json) {
        db.ref(`${user}/favorites/recipes`).put({
            json
        })

    }

    function addFavoriteProduct(json) {
        db.ref(`${user}/favorites/products`).put({
            json
        })

    }
    function login(email, password) {
        console.log("Loggin in now!")
        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            console.log(errorCode)
            console.log(errorMessage)
        });
    }

    function logout() {
        auth.signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    function createUser(email, password) {
        console.log("NOW!")
        auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode)
            console.log(errorMessage)
        });
    }

    console.log("create user...")
    //createUser();
    login()
    //logout();
    //var user = firebase.auth().currentUser
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("signed in")
            console.log(user)
            user.updateProfile({
                displayName: ""
            })
            console.log(user)
            user.sendEmailVerification().then(function () {
                console.log("email verification sent!")
            })
        } else {
            console.log("not signed in")
        }

    })

    


})