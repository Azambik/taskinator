var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
console.log("hello world!");
var createTaskHandler = function() {
    console.log("hello world!");
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  }
  buttonEl.addEventListener("click", createTaskHandler);