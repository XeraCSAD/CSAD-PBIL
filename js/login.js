firebase.auth().onAuthStateChanged(function(user){
  if(user){

      document.location.href="home.html";

  }else{

  }
});

function signIn(){
  var uEmail = document.getElementById("getEmail").value;
  var uPass = document.getElementById("getPass").value;

  firebase.auth().signInWithEmailAndPassword(uEmail, uPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
  });
}

function reset(){
  var uEmail = document.getElementById("getEmail").value;


  firebase.auth().sendPasswordResetEmail(uEmail).then(function() {
  alert("An email has been sent to you");
}).catch(function(error) {
alert("Please enter a valid email before clicking 'Forget Password' ");
});
}

function redirect(){
  document.location.href="index.html"
}
