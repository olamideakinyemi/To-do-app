function getTxt() {
    var txtValue = document.getElementById("txt").value;
    localStorage.setItem("passValue", txtValue);
}

document.getElementById("result").innerHTML = localStorage.getItem("passValue");

const modal = document.querySelector(".modal");
const addtask = document.querySelector(".addtask");
const addtasktop = document.querySelector(".addtasktop");
const close = document.querySelector(".close");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnclickEvent(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

addtask.addEventListener("click", toggleModal);
addtasktop.addEventListener("click", toggleModal);

function updateClock() {
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

    if (hou == 0) {
        hou = 12;
    }

    if (hou >= 12) {
        hou = hou - 12;
        pe = "PM";
    }

    Number.prototype.pad = function (digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    };

    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
    var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
    for (var i = 0; i < ids.length; i++) document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
}
const tasks = [];
const noTaskListDoc = document.querySelector("#no-task-list");
const populatedTaskListDoc = document.querySelector("#taskcard");
var list = document.getElementById("todos-list");
var addInput = document.getElementById("new-task-input");
var addBtn = document.getElementById("add-task-button");
const taskSubmissionForm = document.querySelector("#new-task-form");
const label = document.getElementById("label");

const checkTaskState = (shouldRerender = true) => {
    if (!!tasks.length) {
        noTaskListDoc.style.display = "none";
        populatedTaskListDoc.style.display = "block";
        if (shouldRerender) renderTasks();
    } else {
        noTaskListDoc.style.display = "block";
        populatedTaskListDoc.style.display = "none";
    } 
        checkInputs()
};

function createTodo(e) {
    e.preventDefault();
    // trimming the value from input box to remove whitespaces and storing in text var
    var text = addInput.value.trim();
    // check if text is a valid input
    if (!!text) {
        var newTask = { taskName: text, isCompleted: false };
        tasks.push(newTask);
        if (tasks.length === 1) {
            checkTaskState();
        } else addTaskToDocument(newTask, tasks.length - 1);
        addInput.value = "";
    }
}

const toggleTasksCompletion = (i) => {
    const actualTask = tasks[i];
    actualTask.isCompleted = !actualTask.isCompleted;
};

const removeTask = (i) => {
    const removeElem = document.getElementById(i);
    tasks.splice(i, 1);
    removeElem.remove();
    checkTaskState(false);
};

function addTaskToDocument(task, i) {
    const individualTask = task;
    const checkBoxInput = document.createElement(`input`);
    checkBoxInput.classList.add("checkbox");
    checkBoxInput.type = "checkbox";
    checkBoxInput.checked = individualTask.isCompleted;
    checkBoxInput.addEventListener("input", () => toggleTasksCompletion(i));
    const paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.innerText = individualTask.taskName;

    const removeElem = document.createElement("span");
    removeElem.classList.add("remove");
    removeElem.innerHTML = "&cross;";
    removeElem.addEventListener("click", () => removeTask(i));

    const listItem = document.createElement("li");
    listItem.appendChild(checkBoxInput);
    listItem.appendChild(paragraph);
    listItem.appendChild(removeElem);
    listItem.setAttribute("id", i);

    populatedTaskListDoc.appendChild(listItem);

    toggleModal();
    checkTaskState(false);
}

const renderTasks = () => {
    for (let i = 0; i < tasks.length; i++) {
        const newTask = tasks[i];
        addTaskToDocument(newTask, i);
    }
};

function checkInputs() {
    if (tasks.length === 5) {
        document.getElementById("add-task-button").disabled = true;
        document.getElementById("new-task-input").disabled = true;
        document.getElementById("label").innerHTML = "you have reached task limit";
        label.style.color = "red";
        addBtn.style.background = "red";
    } else{
        document.getElementById("add-task-button").disabled = false;
        document.getElementById("label").innerHTML = "Enter task";
        document.getElementById("new-task-input").disabled = false;
        label.style.color = "gray";
        addBtn.style.background = "goldenrod";
    }
}



taskSubmissionForm.addEventListener("submit", createTodo);

window.onload = () => {
    checkTaskState();
    initClock();
};
