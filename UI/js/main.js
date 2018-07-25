let addModal = document.getElementById("addmodal");
let viewAdd = document.getElementById("add");
let closeAdd = document.getElementById("close");
let dropdown = document.getElementById("dropdown");
let menu = document.getElementById("menu");


//close edit modal when user clicks outside of it 
window.onclick = event => {
    if (event.target === addModal) {
        addModal.style.display = "none";
    }
}

//show add modal when add button is clicked
viewAdd.addEventListener("click", event => {
    event.preventDefault();
    addModal.style.display = "block";
});

//close add modal when user clicks close button
closeAdd.addEventListener("click", event => {
    addModal.style.display = "none";
});

// show the dropdown menu when user clicks user icon 
menu.addEventListener("click", event => {
    event.preventDefault();
    dropdown.classList.toggle("show");
});
//close the dropdown when user clicks outside of it 
// window.onclick = event => {
//     if (event.target !== menu) {
//         dropdown.style.visibility = "hidden";
//     }
// }

