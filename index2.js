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
  localStorage.setItem("localData", JSON.stringify(data));
}
console.log(data);

function addTask(item) {
  let task = document.createElement("div");
  let taskTextWrapper = document.createElement("div");
  let taskText = document.createElement("div");
  let taskChecked = document.createElement("input");
  let taskButtons = document.createElement("div");
  let taskDelete = document.createElement("button");
  let taskEdit = document.createElement("button");
  let a;
  let index = item.id;
  if (item.type === "active") {
    a = document.querySelector(".task__active");
  }
  if (item.type === "completed") {
    a = document.querySelector(".task__completed");
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

  a.append(task);
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

    localStorage.setItem("localData", JSON.stringify(data));
  });

  if (item.type === "active") {
    taskChecked.addEventListener("change", () => {
      data.find((el) => el.id === index).type = "completed";
    });
    taskChecked.addEventListener("change", render);
    localStorage.setItem("localData", JSON.stringify(data));
  }
  if (item.type === "completed") {
    taskChecked.addEventListener("change", () => {
      data.find((el) => el.id === index).type = "active";
    });
    taskChecked.addEventListener("change", render);
    localStorage.setItem("localData", JSON.stringify(data));
  }
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
  localStorage.setItem("localData", JSON.stringify(data));
  render();
}
render();
button.addEventListener("click", createTask);
input.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {createTask()}
});
