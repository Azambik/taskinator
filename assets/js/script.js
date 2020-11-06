var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter =0;

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
    //package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
    //send it as a argument to CreateTaskEl
    createTaskEl(taskDataObj)
  }
  var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //add task id as a cutom atribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
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
  formEl.addEventListener("submit", taskFormHandler);