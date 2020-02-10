//initialize firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAQY6s2rCIgX7xwJwW-BbFRHNy6bWppw4Q",
    authDomain: "sg-helpleh-6f18e.firebaseapp.com",
    databaseURL: "https://sg-helpleh-6f18e.firebaseio.com",
    projectId: "sg-helpleh-6f18e",
    storageBucket: "sg-helpleh-6f18e.appspot.com",
    messagingSenderId: "139572612396",
    appId: "1:139572612396:web:d24127bc4f616dd7cb7089",
    measurementId: "G-4MCK4HPM84"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

function signIn(){
    var uEmail = document.getElementById("getEmail").value;
    var uPass = document.getElementById("getPass").value;

    const promise = auth.signInWithEmailAndPassword(uEmail,uPass);
    promise.catch(e => alert(e.message));

    alert("Signed In!");
  }

  auth.onAuthStateChanged(function(user){
    if(user){
      window.location.href="home.html"; 
    }else{

    }
  });
