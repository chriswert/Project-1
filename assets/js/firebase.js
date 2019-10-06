
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

function getFavorites() {
    db.ref(`${user}/favorites`).once('value', function () {

    })
}

function addFavorite() {

}

function login() {
    console.log("Loggin in now!")
    auth.signInWithEmailAndPassword("meero.harootunian@gmail.com", "password").catch(function (error) {
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
    auth.createUserWithEmailAndPassword("meero.harootunian@gmail.com", "password").catch(function (error) {
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
    } else {
        console.log("not signed in")
    }
    
})