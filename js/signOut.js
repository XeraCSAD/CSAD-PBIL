function signOut(){
  firebase.auth().signOut().then(function() {
  document.location.href="login.html";
}).catch(function(error) {
  // An error happened.
});
}
