
 function getTasksForDate(date) {
    let tasks = localStorage.getItem(date);
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksForDate(date, tasks) {
    localStorage.setItem(date, JSON.stringify(tasks));
}
  

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();
    month = month.length === 1 ? '0' + month : month; 
    day = day.length === 1 ? '0' + day : day; 
    return `${year}-${month}-${day}`;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("datePicker").value = getCurrentDate();
    displayTasks(getCurrentDate());
});

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let datePicker = document.getElementById("datePicker");

    let selectedDate = datePicker.value;

    if (taskInput !== "" && selectedDate !== "") {
        let tasks = getTasksForDate(selectedDate);
        tasks.push({ task: taskInput, completed: false });
        saveTasksForDate(selectedDate, tasks);
        displayTasks(selectedDate);
        document.getElementById("taskInput").value = "";
        document.getElementById("datePicker");
        let successMessage = document.getElementById("successMessage");
        successMessage.innerText = "Task Created Successfully";
        successMessage.style.display = "block";
        setTimeout(function() {
            successMessage.style.display = "none";
        }, 2000);
    } else {
        alert("Please enter task and select a date!");
    }
}



function toggleTask(date, index) {
    let tasks = getTasksForDate(date);
    tasks[index].completed = !tasks[index].completed;
    saveTasksForDate(date, tasks);
    displayTasks(date);

}


function deleteTask(date, index) {
    let tasks = getTasksForDate(date);
    tasks.splice(index, 1);
    saveTasksForDate(date, tasks);
    displayTasks(date);
    let deleteMessage = document.getElementById("deleteMessage");
    deleteMessage.innerText = "Task Deleted Successfully";
    deleteMessage.style.display = "block";
    setTimeout(function() {
        deleteMessage.style.display = "none";
    }, 2000);

   
     
    // alert("Task Deleted Sucessfully");
}


let datePicker = document.getElementById("datePicker");

datePicker.addEventListener("change", function() {
    let selectedDate = datePicker.value;
    displayTasks(selectedDate);
}); 

function showAlert() {
    const alertBox = document.getElementById("alertBox");
    alertBox.style.display = "block";
    setTimeout(function() {
        alertBox.style.display = "none";
    }, 2000); 
}

function displayTasks(date) {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = getTasksForDate(date);

    if (tasks.length === 0) {
        let noTaskMessage = document.createElement("div");
        noTaskMessage.textContent = "Task is not defined for this date.";
        taskList.appendChild(noTaskMessage);
    } else {
        tasks.forEach(function (task, index) {
            let taskItem = document.createElement("div");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.onclick = function() {
                toggleTask(date, index);
            };

            let label = document.createElement("label");
            label.style.textDecoration = task.completed ? 'line-through' : 'none';
            label.textContent = task.task;

            let button = document.createElement("button");
            button.textContent = "Delete";
            button.onclick = function() {
                deleteTask(date, index);
            };

            taskItem.appendChild(checkbox)
;
            taskItem.appendChild(label);
            taskItem.appendChild(button);

            taskList.appendChild(taskItem);
        });
    }
}







   

// function displayTasks(date) {
//     let taskList = document.getElementById("taskList");
//     taskList.innerHTML = "";

//     let tasks = getTasksForDate(date);
//     tasks.forEach(function (task, index) {
//         let taskItem = document.createElement("div");
//         let checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = task.completed;
//         checkbox.onclick = function() {
//             toggleTask(date, index);
//         };
                
//         let label = document.createElement("label");
//         label.style.textDecoration = task.completed ? 'line-through' : 'none';
//         label.textContent = task.task;
           
        
//         let button = document.createElement("button");
//         button.textContent = "Delete";
//         button.onclick = function() {
//             deleteTask(date, index);
//         };

//         taskItem.appendChild(checkbox);
//         taskItem.appendChild(label);
//         taskItem.appendChild(button);

//         taskList.appendChild(taskItem);
//     });
// }

// function showTask(){
//    taskList.innerHTML = localStorage.getItem("data");
// }
// showTask();