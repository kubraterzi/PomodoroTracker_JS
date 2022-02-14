let timer_minute = document.getElementById("timer-minute");
let timer_second = document.getElementById("timer-second");
let tasks = [];
let todoCount = 0;

const taskTime = {
  name: "task",
  min: "05",
  sec: "00",
  title: "Pomodoro Info",
  bgColor: "#d04643",
  hoverColor: "#ac3a38",
};
const breakTime = {
  name: "break",
  min: "0",
  sec: "05",
  title: "Take a break",
  bgColor: "#56bd56",
  hoverColor: "#3a803a",
};

const longBreakTime = {
  name: "l_break",
  min: "15",
  sec: "00",
  title: "Take a long break",
  bgColor: "#56bd56",
  hoverColor: "#3a803a",
};

let clickCounter = 0;
let currentDuration = taskTime.name;

const nextButton = document.querySelector("#next-page-button");
nextButton.addEventListener("click", () => {
  changeDuration();
});

var interval;
const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");
let currentStartButtonText = "START";
let currentStopButtonText = "STOP";

const timer = () => {
  currentStartButtonText = "PAUSE";
  printButtonText(startButton, currentStartButtonText);
  printButtonText(stopButton, "STOP");

  interval = setInterval(() => {
    let currentTimerSecond =
      +timer_minute.innerText * 60 + +timer_second.innerText;

    const result = countDown(currentTimerSecond);
    if (result) {
      timer_minute.innerText = result.min;
      if (result.sec < 10) {
        timer_second.innerText = "0" + result.sec;
      } else {
        timer_second.innerText = result.sec;
      }
    }
    if (currentTimerSecond == 0) {
      changeDuration();
    }
  }, 1000);
};

const countDown = (second) => {
  if (second > 0) {
    second--;
    return {
      min: Math.floor(second / 60),
      sec: second % 60,
    };
  } else {
    clearInterval(interval);
  }
};

const timerStop = () => {
  clearInterval(interval);
  currentStartButtonText = "START";
  printButtonText(startButton, currentStartButtonText);

  switch (currentDuration) {
    case "task":
      document.getElementById("timer-minute").innerText = taskTime.min;
      document.getElementById("timer-second").innerText = taskTime.sec;
      break;
    case "break":
      document.getElementById("timer-minute").innerText = breakTime.min;
      document.getElementById("timer-second").innerText = breakTime.sec;
      break;
    case "l_break":
      document.getElementById("timer-minute").innerText = longBreakTime.min;
      document.getElementById("timer-second").innerText = longBreakTime.sec;
      break;
  }
  startButton.disabled = false;
};

const timerPause = () => {
  clearInterval(interval);
  currentStartButtonText = "RESUME";
  printButtonText(startButton, currentStartButtonText);
  currentStopButtonText = "DONE";
  printButtonText(stopButton, currentStopButtonText);
};

const nextDuration = (durationType) => {
  startButton.disabled = false;
  document
    .getElementById("timer-area")
    .style.setProperty("--timerArea", durationType.bgColor);
  document.getElementById("pomodoro-info").innerText = durationType.title;
  document.getElementById("timer-minute").innerText = durationType.min;
  document.getElementById("timer-second").innerText = durationType.sec;
  clearInterval(interval);
  currentDuration = durationType.name;
  hoverHandle(durationType);
};

const hoverHandle = (durationType) => {
  const buttons = document.querySelectorAll("div.button_container > button");
  buttons.forEach((button) => {
    button.style.setProperty("--hoverColor", durationType.hoverColor);
  });
};

const changeDuration = () => {
  printButtonText(startButton, "START");
  currentStartButtonText = "START";
  if (currentDuration == taskTime.name) {
    doneTask();
    nextDuration(breakTime);
  } else {
    nextDuration(taskTime);
  }
};

const timerStartHandle = () => {
  const actions = {
    START: timer,
    RESUME: timer,
    PAUSE: timerPause,
  };
  actions[currentStartButtonText]();
};

const timerStopHandle = () => {
  const actions = {
    DONE: doneTask,
    STOP: timerStop,
  };
  actions[currentStopButtonText]();
};

const printButtonText = (selectedButton, buttonText) => {
  selectedButton.innerText = buttonText;
};

const doneTask = () => {
  console.log("done!");
  printButtonText(stopButton, "STOP");
  timerStop();
  removeTodoItem();

};

const addTodo = () => {
  const categoryName = document.querySelector("#taskCategory").value;
  const taskDescription = document.querySelector("#taskDescription").value;
  tasks.push({
    taskCategory: categoryName,
    taskDescription: taskDescription,
  });
  createNewELement(categoryName, taskDescription);
};

const createNewELement = (taskCategory, taskDescription) => {
  todoCount++;
  const allTodos = document.querySelector("#todo-list");
  let todoListItem = document.createElement("div");
  todoListItem.classList.add("todo_list_item");
  todoListItem.setAttribute("data-index", todoCount);

  let todosCategory = document.createElement("div");
  todosCategory.classList.add("todos_category");
  todosCategory.innerText = taskCategory;

  let todosDescription = document.createElement("div");
  todosDescription.classList.add("todos_description");
  todosDescription.innerText = taskDescription;

  let removeItem = document.createElement("div");
  removeItem.classList.add("remove_todo_item");
  removeItem.append('<i class="fa-solid fa-xmark"></i>');
  removeItem.addEventListener("click", removeTodoItem);


  todoListItem.appendChild(todosCategory);
  todoListItem.appendChild(todosDescription);
  todoListItem.appendChild(removeItem);
  allTodos.appendChild(todoListItem);
};


const removeTodoItem = () => {
  let removeElement = document.querySelectorAll(".todo_list_item");
  removeElement[0].remove();
  todoCount--;
}