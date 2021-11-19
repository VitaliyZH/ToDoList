"use strict"

let button = document.querySelector(".add-btn");
let input = document.querySelector(".input");
let data;
if (localStorage["localData"] !== "") {
    data = JSON.parse(localStorage["localData"]);
} else { data = {} }

function addTask(text, type) {
    let task = document.createElement("div");
    let taskText = document.createElement("div");
    let taskChecked = document.createElement("input");
    let taskDelete = document.createElement("button");
    let a;
    if (type === "active") {
        a = document.querySelector(".task__active");
    }
    if (type === "completed") {
        a = document.querySelector(".task__completed");
    }

    taskText.innerHTML = text;
    task.className = "task";
    taskChecked.type = "checkbox";
    taskDelete.innerHTML = "delete";
    taskDelete.name = text;
    if (type === "active") {
        taskChecked.checked = false;
    }
    if (type === "completed") {
        taskChecked.checked = true;
    }

    a.append(task);
    task.append(taskChecked);
    task.append(taskText);
    task.append(taskDelete);

    taskDelete.addEventListener("click", () => {
        task.remove();
        delete data[text];
        localStorage["localData"] = JSON.stringify(data);
    });

    if (type === "active") {
        taskChecked.addEventListener("change", () => { data[text] = "completed" });
        taskChecked.addEventListener("change", createTasks);
        localStorage["localData"] = JSON.stringify(data);
    }
    if (type === "completed") {
        taskChecked.addEventListener("change", () => { data[text] = "active" });
        taskChecked.addEventListener("change", createTasks);
        localStorage["localData"] = JSON.stringify(data);
    }

}

function createTasks() {
    let elements = document.querySelectorAll(".task");
    for (let el of elements) {
        el.remove();
    }
    let obj = JSON.parse(localStorage["localData"]);
    for (let key of Object.keys(obj)) {
        addTask(key, obj[key]);
    }
}
createTasks();
button.addEventListener("click", () => {
    data[input.value] = "active";
    input.value = "";
    localStorage["localData"] = JSON.stringify(data);
});
button.addEventListener("click", createTasks);