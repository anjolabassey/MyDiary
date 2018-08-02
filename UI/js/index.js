let loginModal = document.getElementById("loginmodal");
let signupModal = document.getElementById("signupmodal");
let viewLogin = document.getElementById("view-login");
let viewSignup = document.getElementById("view-signup");
let closeLogin = document.getElementById("close1");
let closeSignup = document.getElementById("close2");
let submitLogin = document.getElementById("submitlogin");
let submitSignup = document.getElementById("submitsignup");
let linkSignin = document.getElementById("linksignup");
let linkSignup = document.getElementById("linksignin");


//show log in when login button is clicked
viewLogin.addEventListener("click", event => {
    event.preventDefault();
    loginModal.style.display = "block";

});

//show Sign up when sign up button is clicked
viewSignup.addEventListener("click", event => {
    event.preventDefault();
    signupModal.style.display = "block";

});

//close log in/sign up modal when user clicks outside of it 
window.onclick = event => {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target === signupModal) {
        signupModal.style.display = "none";
    }
}

//close log in modal when user clicks close button
closeLogin.addEventListener("click", event => {
    loginModal.style.display = "none";
});

//close sign up modal when user clicks close button 
closeSignup.addEventListener("click", event => {
    signupModal.style.display = "none";
});

//directs user to dashboard after clicking submit
submitLogin.addEventListener("click", event => {
    event.preventDefault();
    location.assign("dashboard.html")
});

//directs user to dashboard after clicking submit
submitSignup.addEventListener("click", event => {
    event.preventDefault();
    location.assign("dashboard.html")

});

//directs user to sign up modal after clicking submit
linkSignup.addEventListener("click", event => {
    event.preventDefault();
    loginModal.style.display = "none";
    signupModal.style.display = "block";
});

//directs user to sign in modal after clicking submit
linkSignin.addEventListener("click", event => {
    event.preventDefault();
    signupModal.style.display = "none";
    loginModal.style.display = "block";


});