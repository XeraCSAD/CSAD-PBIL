// ***************  Regex Statement  ************************
var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

// ***************  Global Variables  ************************

function getValues() {

  uEmail = document.getElementById("inputEmail").value;
  uPass = document.getElementById("inputPassword").value;
  uRePass = document.getElementById("inputRePassword").value;
  uFirst = document.getElementById("inputFirstName").value;
  uLast = document.getElementById("inputLastName").value;
  uAddr = document.getElementById("inputAddr").value;
  uContact = document.getElementById("inputNumber").value;
  uPostal = document.getElementById("inputZip").value;

}

// ***************************************

firebase.auth().onAuthStateChanged(function(user){
  if(user){

    var uid = firebase.auth().currentUser.uid;
    var firebaseRef = firebase.database().ref("Users");
    var uName = document.getElementById("inputFirstName").value + " " +
    document.getElementById("inputLastName").value;

    firebaseRef.child(uid).set({
      name: uName.toString(),
      email: document.getElementById("inputEmail").value,
      address: document.getElementById("inputAddr").value,
      contact: document.getElementById("inputNumber").value,
      postal: document.getElementById("inputZip").value
    });

      document.location.href="home.html";

  }else{

  }
});


function signUp(){

  getValues();

 if(uEmail.trim() === ""){
   alert("Please enter your email");
 }else{
   if(uPass.trim() === "" || uRePass.trim() === ""){
     alert("Please complete both password sections")
   }else{
     if(uPass.length < 5){
       alert("Please ensure that your password is at least 6 characters long")
     }else{
       if(uPass !== uRePass){
         alert("Passwords do not match")
       }else{
         if(uFirst.trim() === ""){
           alert("Please fill in your first name")
         }else{
           if(uLast.trim() === ""){
             alert("Please fill in your last name")
           }else{
             if(uAddr.trim() === ""){
               alert("Please fill in your address")
             }else{
               if(uContact.trim() === ""){
                 alert("Please fill in your contact number")
               }else{
                 if(uPostal.trim() === ""){
                   alert("Please fill in your postal code")
                 }else{
                   if(reg.test(uEmail) == false){
                     alert("Please enter a valid email")
                   }else{
                     firebase.auth().createUserWithEmailAndPassword(uEmail, uPass).catch(function(error) {
                     // Handle Errors here.
                     var errorCode = error.code;
                     var errorMessage = error.message;

                     if (errorCode === 'auth/email-already-in-use') {
                     alert('Email already in use!');
                     } else {
                     alert(errorMessage);
                     }
                     console.log(error);
                     });

                   }
                 }
               }
             }
           }
         }
       }
     }
   }
 }
}

// ***************  Redirect Function  ************************
function redirect(){
  document.location.href="login.html";
}
