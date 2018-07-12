let loginModal = document.getElementById("loginmodal");
let signupModal = document.getElementById("signupmodal");
let viewLogin = document.getElementById("view-login");
let viewSignup = document.getElementById("view-signup");
let close = document.getElementById("close");
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

window.onclick = event => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

close.addEventListener("click", event => {
    modal.style.display = "none";

});

submitLogin.addEventListener("click", event => {
    event.preventDefault();
    location.assign("dashboard.html")

});

submitSignup.addEventListener("click", event => {
    event.preventDefault();
    location.assign("dashboard.html")

});