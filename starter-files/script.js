document.addEventListener("DOMContentLoaded", () => {
  const studyDurationInput = document.getElementById("studyDuration");
  const breakDurationInput = document.getElementById("breakDuration");
  const startButton = document.getElementById("startButton");
  const progressBar = document.getElementById("progressBar");
  const logList = document.getElementById("logList");

  let studyDuration, breakDuration;
  let remainingTime, sessionDuration;
  let interval;
  let isBreak = false;
  let cycleStarted = false;

  function loadDurations() {
    const savedStudyDuration = localStorage.getItem("studyDuration");
    const savedBreakDuration = localStorage.getItem("breakDuration");
    if (savedStudyDuration) {
      studyDurationInput.value = savedStudyDuration;
    }
    if (savedBreakDuration) {
      breakDurationInput.value = savedBreakDuration;
    }
  }

  function saveDurations() {
    localStorage.setItem("studyDuration", studyDurationInput.value);
    localStorage.setItem("breakDuration", breakDurationInput.value);
  }

  function loadLogs() {
    const logs = JSON.parse(localStorage.getItem("sessionLogs")) || [];
    logs.forEach((log) => {
      const listItem = document.createElement("li");
      listItem.textContent = log;
      logList.appendChild(listItem);
    });
  }

  function saveLog(log) {
    const logs = JSON.parse(localStorage.getItem("sessionLogs")) || [];
    logs.push(log);
    localStorage.setItem("sessionLogs", JSON.stringify(logs));
  }

  function startCycle() {
    if (cycleStarted) {
      return;
    }
    cycleStarted = true;
    startSession(false);
  }

  function startSession(isBreakSession) {
    isBreak = isBreakSession;
    const duration = isBreak ? breakDuration : studyDuration;
    sessionDuration = duration * 60;
    remainingTime = sessionDuration;

    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", 0);

    interval = setInterval(() => {
      remainingTime--;
      updateProgress();

      if (remainingTime <= 0) {
        clearInterval(interval);
        logSession(isBreak ? "Break" : "Study", duration);

        if (isBreak) {
          alert("Session complete!");
          cycleStarted = false;
        } else {
          startSession(true);
        }
      }
    }, 1000);
  }

  function updateProgress() {
    const progressPercentage =
      ((sessionDuration - remainingTime) / sessionDuration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute("aria-valuenow", `${progressPercentage}`);
  }

  function logSession(type, duration) {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const logEntry = `Date: ${date} Time: ${time} ${type}: ${duration} minutes`;
    const listItem = document.createElement("li");
    listItem.textContent = logEntry;
    logList.appendChild(listItem);

    saveLog(logEntry);
  }

  startButton.addEventListener("click", () => {
    studyDuration = parseInt(studyDurationInput.value, 10);
    breakDuration = parseInt(breakDurationInput.value, 10);

    if (
      isNaN(studyDuration) ||
      isNaN(breakDuration) ||
      studyDuration <= 0 ||
      breakDuration <= 0
    ) {
      alert("Please enter valid durations.");
      return;
    }

    saveDurations();
    startCycle();
  });

  loadDurations();
  loadLogs();
});
