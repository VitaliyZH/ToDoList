"use strict"

let button = document.querySelector(".add-btn");
let input = document.querySelector(".input");
let toDoText = "";
let keys = Object.keys(localStorage);

for (let key of keys) {

    if (localStorage.getItem(key) === "active") {
        let task = document.createElement("div");
        let taskText = document.createElement("div");
        let taskChecked = document.createElement("input");
        let taskDelete = document.createElement("button");
        let a = document.querySelector(".task__active");

        taskText.innerHTML = key;
        task.className = "task";
        taskChecked.type = "checkbox";
        taskDelete.innerHTML = "delete";
        taskDelete.name = key;
        a.append(task);
        task.append(taskChecked);
        task.append(taskText);
        task.append(taskDelete);

        taskDelete.addEventListener("click", () => {
            task.remove();
            delete localStorage[key];
        });

        taskChecked.addEventListener("change", () => {
            let completedTask = document.createElement("div");
            let a = document.querySelector(".task__completed");
            localStorage[key] = "completed";
            completedTask.className = "task";
            completedTask.innerHTML = key;
            a.append(completedTask);
            task.remove();
        });
    }
    if (localStorage.getItem(key) === "completed") {
        let completedTask = document.createElement("div");
        let a = document.querySelector(".task__completed");
        let compTaskDelete = document.createElement("button");


        completedTask.className = "task";
        completedTask.innerHTML = key;
        compTaskDelete.innerHTML = "delete";
        compTaskDelete.name = key;
        a.append(completedTask);
        completedTask.append(compTaskDelete);

        compTaskDelete.addEventListener("click", () => {
            completedTask.remove();
            delete localStorage[key];
        });
    }
}


function addToActive() {
    let task = document.createElement("div");
    let taskText = document.createElement("div");
    let taskChecked = document.createElement("input");
    let taskDelete = document.createElement("button");
    let a = document.querySelector(".task__active");
    let val = input.value;

    localStorage.setItem(val, "active");
    console.log(localStorage.getItem(val));

    taskText.innerHTML = input.value;
    task.className = "task";
    taskChecked.type = "checkbox";
    taskDelete.innerHTML = "delete";
    taskDelete.name = val;

    a.append(task);
    task.append(taskChecked);
    task.append(taskText);
    task.append(taskDelete);
    input.value = "";

    taskDelete.addEventListener("click", () => {
        task.remove();
        delete localStorage[val];
    });

    taskChecked.addEventListener("change", () => {
        let completedTask = document.createElement("div");
        let a = document.querySelector(".task__completed");
        let compTaskDelete = document.createElement("button");

        localStorage[val] = "completed";
        console.log(localStorage.getItem(val));

        completedTask.className = "task";
        completedTask.innerHTML = val;
        compTaskDelete.innerHTML = "delete";
        compTaskDelete.name = val;

        a.append(completedTask);
        completedTask.append(compTaskDelete);
        task.remove();

        compTaskDelete.addEventListener("click", () => {
            completedTask.remove();
            delete localStorage[val];
        });
    });
    //taskChecked.addEventListener("change", addToCompleted(val, task));

}

function addToCompleted(content, el) {
    let completedTask = document.createElement("div");
    let b = document.querySelector(".task__completed");
    let compTaskDelete = document.createElement("button");

    localStorage[content] = "completed";
    console.log(localStorage.getItem(content));

    completedTask.className = "task";
    completedTask.innerHTML = content;
    compTaskDelete.innerHTML = "delete";
    compTaskDelete.name = content;
    b.append(completedTask);
    completedTask.append(compTaskDelete);
    el.remove();

    compTaskDelete.addEventListener("click", () => {
        completedTask.remove();
        delete localStorage[content];
    });
}



button.addEventListener("click", addToActive);