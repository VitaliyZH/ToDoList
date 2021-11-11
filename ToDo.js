"use strict"

function createToDo() {
    let div = document.createElement("div");
    div.innerHTML = "sgfsdg";
    div.className = "alert";
    document.body.append(div);

}
let button = document.querySelector(".add-btn");
button.addEventListener("click", createToDo);