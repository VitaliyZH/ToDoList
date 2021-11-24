"use strict"

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
    localStorage.setItem("localData", JSON.stringify(data));
}
console.log(data);


function addTask(item) {

    let task = document.createElement("div");
    let taskText = document.createElement("div");
    let taskChecked = document.createElement("input");
    let taskDelete = document.createElement("button");
    let a;
    let index = item.index;
    if (item.type === "active") {
        a = document.querySelector(".task__active");
    }
    if (item.type === "completed") {
        a = document.querySelector(".task__completed");
    }

    taskText.innerHTML = item.value;
    task.className = "task";
    taskChecked.type = "checkbox";
    taskDelete.innerHTML = "delete";
    taskDelete.name = item.value;
    if (item.type === "active") {
        taskChecked.checked = false;
    }
    if (item.type === "completed") {
        taskChecked.checked = true;
    }

    a.append(task);
    task.append(taskChecked);
    task.append(taskText);
    task.append(taskDelete);

    taskDelete.addEventListener("click", () => {
        task.remove();
        data[index].type = "deleted";
        let newData = data.filter(el => el.type !== "deleted");
        console.log(newData);
        data = newData;

        localStorage.setItem("localData", JSON.stringify(newData));
    });

    if (item.type === "active") {
        taskChecked.addEventListener("change", () => { data[index].type = "completed"; });
        taskChecked.addEventListener("change", render);
        localStorage.setItem("localData", JSON.stringify(data));

    }
    if (item.type === "completed") {
        taskChecked.addEventListener("change", () => { data[index].type = "active" });
        taskChecked.addEventListener("change", render);
        localStorage.setItem("localData", JSON.stringify(data));
    }

}

function render() {
    let elements = document.querySelectorAll(".task");
    for (let el of elements) {
        el.remove();
    }

    for (let i = 0; i < data.length; i++) {
        addTask(data[i]);
    }

}
render();
button.addEventListener("click", () => {
    let newTask = {
        index: data.length,
        value: input.value,
        type: "active"
    };
    data.push(newTask);
    input.value = "";
    localStorage.setItem("localData", JSON.stringify(data));
});
button.addEventListener("click", render);