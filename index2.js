"use strict";

let button = document.querySelector(".add-btn");
let input = document.querySelector(".input");
let data;
//localStorage.clear();
//debugger
if (localStorage.getItem("localData") !== null) {
    try {
        data = JSON.parse(localStorage.getItem("localData"));
    } catch (err) {}
} else {
    data = [];
    saveData(data);
}
console.log(data);

function saveData(arr) {
    localStorage.setItem("localData", JSON.stringify(arr));
}

function addTask(item) {
    let task = document.createElement("div");
    let taskTextWrapper = document.createElement("div");
    let taskText = document.createElement("div");
    let taskChecked = document.createElement("input");
    let taskButtons = document.createElement("div");
    let taskDelete = document.createElement("button");
    let taskEdit = document.createElement("button");
    let place;
    let index = item.id;
    if (item.type === "active") {
        place = document.querySelector(".task__active");
    }
    if (item.type === "completed") {
        place = document.querySelector(".task__completed");
    }

    taskText.innerHTML = item.value;
    task.className = "task";
    taskTextWrapper.className = "task__text-wrapper";
    taskChecked.type = "checkbox";
    taskButtons.className = "task__buttons";
    taskDelete.innerHTML = "delete";
    taskEdit.innerHTML = "edit";
    if (item.type === "active") {
        taskChecked.checked = false;
    }
    if (item.type === "completed") {
        taskChecked.checked = true;
    }

    place.append(task);
    task.append(taskTextWrapper);
    taskTextWrapper.append(taskChecked);
    taskTextWrapper.append(taskText);
    task.append(taskButtons)
    taskButtons.append(taskDelete);
    taskButtons.append(taskEdit);

    taskDelete.addEventListener("click", () => {
        task.remove();

        data.find((el) => el.id === index).type = "deleted";
        data = data.filter((el) => el.type !== "deleted");

        saveData(data);
    });

    if (item.type === "active") {
        taskChecked.addEventListener("change", () => {
            data.find((el) => el.id === index).type = "completed";
        });
        taskChecked.addEventListener("change", render);
        saveData(data);
    }
    if (item.type === "completed") {
        taskChecked.addEventListener("change", () => {
            data.find((el) => el.id === index).type = "active";
        });
        taskChecked.addEventListener("change", render);
        saveData(data);
    }
    taskEdit.addEventListener("click", () => editor(item));
}

function render() {
    let elements = document.querySelectorAll(".task");
    for (let el of elements) {
        el.remove();
    }

    data.forEach((element) => addTask(element));
}

function createTask() {
    let count;
    if (data.length === 0) {
        count = 0;
    } else {
        count = data[data.length - 1].id + 1;
    }
    let newTask = {
        id: count,
        value: input.value,
        type: "active",
    };
    data.push(newTask);
    input.value = "";
    saveData(data);
    render();
}

function editor(item) {
    let editBack = document.createElement("div");
    editBack.className = "modal";
    let editWindow = document.createElement("div");
    editWindow.className = "modal__window";
    let editTextWrapper = document.createElement("div");
    editTextWrapper.className = "modal__window__text-wrapper";
    let editButtonsWrapper = document.createElement("div");
    editButtonsWrapper.className = "modal__window__buttons-wrapper";
    let editText = document.createElement("input");
    editText.value = item.value;
    let editAccept = document.createElement("button");
    editAccept.innerHTML = "OK";
    let editCancel = document.createElement("button");
    editCancel.innerHTML = "Cancel";

    document.body.append(editBack);
    editBack.append(editWindow);
    editWindow.append(editTextWrapper);
    editWindow.append(editButtonsWrapper);
    editTextWrapper.append(editText);
    editButtonsWrapper.append(editAccept);
    editButtonsWrapper.append(editCancel);
    editText.focus();

    editAccept.addEventListener("click", () => {
        item.value = editText.value;
        saveData(data);
        editBack.remove();
        render();
    })

    editCancel.addEventListener("click", () => {
        editBack.remove();
    })

    editText.addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
            item.value = editText.value;
            saveData(data);
            editBack.remove();
            render();
        }
    })
}
render();
button.addEventListener("click", createTask);
input.addEventListener("keydown", (event) => {
    if (event.code === "Enter") { createTask() }
});