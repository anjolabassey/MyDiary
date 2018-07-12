let loginModal = document.getElementById("loginmodal");
let signupModal = document.getElementById("signupmodal");
let viewLogin = document.getElementById("view-login");
let viewSignup = document.getElementById("view-signup");
let viewSignup2 = document.getElementById("view-signup2");
let closeLogin = document.getElementById("close1");
let closeSignup = document.getElementById("close2");
let submitLogin = document.getElementById("submitlogin");
let submitSignup = document.getElementById("submitsignup");

viewLogin.addEventListener("click", event => {
    event.preventDefault();
    loginModal.style.display = "block";

});

viewSignup.addEventListener("click", event => {
    event.preventDefault();
    signupModal.style.display = "block";

});
viewSignup2.addEventListener("click", event => {
    event.preventDefault();
    signupModal.style.display = "block";

});
window.onclick = event => {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target === signupModal) {
        signupModal.style.display = "none";
    }
}

closeLogin.addEventListener("click", event => {
    loginModal.style.display = "none";
    

});
closeSignup.addEventListener("click", event => {
    signupModal.style.display = "none";
});

submitLogin.addEventListener("click", event => {
    event.preventDefault();
    location.assign("dashboard.html")

});

submitSignup.addEventListener("click", event => {
    event.preventDefault();
    location.assign("dashboard.html")

});