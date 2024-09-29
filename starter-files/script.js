function displayCurrentDate() {
  const dateElement = document.getElementById("currentDate");
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];
  const date = today.getDate();
  const year = today.getFullYear();
  const formattedDate = `Today is ${dayName} ${monthName} ${date} ${year}`;
  dateElement.textContent = formattedDate;
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) =>
    addTaskToDOM(task.description, task.time, task.date, false)
  );
}

function addTask() {
  const description = document.getElementById("taskDescription").value;
  const time = document.getElementById("taskTime").value;
  const date = document.getElementById("taskDate").value;

  if (description && time && date) {
    addTaskToDOM(description, time, date, true);
    saveTaskToLocalStorage(description, time, date);
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskTime").value = "";
    document.getElementById("taskDate").value = "";
  } else {
    alert("Please enter all task details.");
  }
}

function addTaskToDOM(description, time, date, checkHighlight) {
  const taskList = document.getElementById("taskList");
  const listItem = document.createElement("li");
  listItem.className =
    "list-group-item d-flex justify-content-between align-items-center";

  const today = new Date().toISOString().split("T")[0];
  if (checkHighlight && date === today) {
    listItem.classList.add("highlight-current-date");
  }

  listItem.textContent = `${date} at ${time}: ${description} `;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "btn btn-danger btn-sm";
  removeButton.onclick = function () {
    taskList.removeChild(listItem);
    removeTaskFromLocalStorage(description, time, date);
  };

  listItem.appendChild(removeButton);
  taskList.appendChild(listItem);
}

function saveTaskToLocalStorage(description, time, date) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ description, time, date });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(description, time, date) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(
    (task) =>
      !(
        task.description === description &&
        task.time === time &&
        task.date === date
      )
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayCurrentDate();
loadTasks();
