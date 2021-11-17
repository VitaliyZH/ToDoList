"use strict"
let button = document.querySelector(".add-btn");
let input = document.querySelector(".input");
let toDoText = "";

//input.addEventListener("input", () => toDoText = input.value);


function addToActive() {
    let task = document.createElement("div");
    let taskText = document.createElement("div");
    let taskChecked = document.createElement("input");
    let a = document.querySelector(".task__active")
    let text = input.value;
    taskText.innerHTML = input.value;
    task.className = "task";
    taskChecked.type = "checkbox";
    a.append(task);
    task.append(taskChecked);
    task.append(taskText);
    input.value = "";
    taskChecked.addEventListener("change", () => {
        let completedTask = document.createElement("div");
        let a = document.querySelector(".task__completed")
        completedTask.className = "task";
        completedTask.innerHTML = text;
        a.append(completedTask);
        task.remove();
    });
}

function moveToCompleted(text, el) {
    let task = document.createElement("div");
    let a = document.querySelector(".task__completed")
    task.className = "task";
    task.innerHTML = text;
    a.append(task);
    el.remove();

}

button.addEventListener("click", addToActive);