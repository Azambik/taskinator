//variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter =0;
var pageContentEl = document.querySelector("#page-content");

//functions
var taskButtonHandler = function(event) {
  //get target element from event
  var targetEl = event.target;
  //edit button clicked
  if (targetEl.matches(".edit-btn")){
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  if (event.target.matches(".delete-btn")){
    //get cthe element's task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId)
  }
};
// other logic...
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};
var editTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};
var taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};
var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }
    formEl.reset();
    var isEdit = formEl.hasAttribute("data-task-id");
    //has data atrbute, so get task id and call function to complete edit proces
    if (isEdit){
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attribute, so create object as norml and pass to createTasEl function
    else{
    //package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
    //send it as a argument to CreateTaskEl
    createTaskEl(taskDataObj)
  }
}
var completeEditTask = function(taskName, taskType, taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};
  var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //add task id as a cutom atribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");
    //create div to hole task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a clas name
    taskInfoEl.className = "task-info";
    //add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl);
    tasksToDoEl.appendChild(listItemEl);
    //incement task coter for next id
    taskIdCounter++;
  };
  var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //adding drop down
    var statursSelectEl = document.createElement("select");
    
    statursSelectEl.className = "select-status";
    statursSelectEl.setAttribute("name", "status-change");
    statursSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statursSelectEl);
    var statusChoices = ["To Do", "In Progress","Completed"];
    for(var i = 0; i< statusChoices.length; i++){
      var statusOptionEl = document.createElement("option");
      statusOptionEl.textContent = statusChoices[i];
      //append to select
      statursSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
  };
  var dragTaskHandler = function(event){
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    var getId =event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
  };
  var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
      if (taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
        
  }
  };
  var dropTaskHandler = function(event){
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "task-to-do") {
      statusSelectEl.selectedIndex =0;
    }
    else if (statusType === "task-in-progress") {
      statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "task-completed") {
      statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);
  };
  var dragLeaveHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
      taskListEl.removeAttribute("style");
}
  };
  //event listeners
  formEl.addEventListener("submit", taskFormHandler);
  pageContentEl.addEventListener("change", taskStatusChangeHandler);
  pageContentEl.addEventListener("click", taskButtonHandler);
  pageContentEl.addEventListener("dragstart", dragTaskHandler);
  pageContentEl.addEventListener("dragover", dropZoneDragHandler);
  pageContentEl.addEventListener("drop", dropTaskHandler);
  pageContentEl.addEventListener("dragleave",dragLeaveHandler);