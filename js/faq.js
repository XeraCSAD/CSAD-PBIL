function writeData() {
  var feedback = document.getElementById("feedbackField").value;
  var firebaseRef = firebase.database().ref().child("Feedback");
  firebaseRef.push().set(feedback);
}
