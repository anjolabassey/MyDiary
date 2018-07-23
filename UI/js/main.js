let del = document.getElementById("delete");
let popUp = document.getElementById("popup");

//toggle delete pop up when delete icon is clicked
del.addEventListener("click", (event) => {
    popUp.classList.toggle("show");

})