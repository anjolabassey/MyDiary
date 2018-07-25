let dropdown2 = document.getElementById("dropdown2");
let menu2 = document.getElementById("menu2");

menu2.addEventListener("click", event => {
    event.preventDefault();
    dropdown2.classList.toggle("show");
});