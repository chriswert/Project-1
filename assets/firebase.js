$(function () {
    // Your web app's Firebase configuration
    let firebaseConfig = {
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

    function getFavorites() {
        db.ref(`${user}/favorites`).once('value', function () {

        })
    }

    function addFavorite() {

    }

    function login() {
        console.log("Loggin in now!")
        console.log("email " + $("#email").val())
        console.log("password " + $("#password").val())

        auth.signInWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function (error) {
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

    function createUser() {
        console.log("NOW!")
        auth.createUserWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode)
            console.log(errorMessage)
        });

        window.location.replace("./signin.html")
    }


    auth.onAuthStateChanged(user => {
        if (user) {
            $("#account-links").empty()
            $("#account-links").html("<a class='text-light' href='./myaccount.html'>My Account</a>")

        } else {
            console.log("not signed in")
        }

    })

    $("#register-user").click(function () {
        event.preventDefault()
        createUser()
    })

    $("#login").click(function() {
        event.preventDefault()
        login()
    })

})