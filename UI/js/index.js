const loginModal = document.getElementById("loginmodal");
const signupModal = document.getElementById("signupmodal");
const viewLogin = document.getElementById("view-login");
const viewSignup = document.getElementById("view-signup");
const closeLogin = document.getElementById("close1");
const closeSignup = document.getElementById("close2");
const submitLogin = document.getElementById("submitlogin");
const submitSignup = document.getElementById("submitsignup");

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