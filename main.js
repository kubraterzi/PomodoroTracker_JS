let timer_minute = document.getElementById("timer-minute");
let timer_second = document.getElementById("timer-second");

const totalTaskTime = 25 * 60 * 1000;
const totalBreakTime = 5 * 60 * 1000;

const taskTime = {
  name: "task",
  min: "0",
  sec: "05",
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
  changeDuration()
});

var interval;
const startButton = document.querySelector("#start-button");

const timer = () => {
  startButton.disabled = true;
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
      }0
       
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
  startButton.innerText="RESUME";
  startButton.disabled=false;
  
}

const nextDuration = (durationType) => {
  startButton.disabled = false
  document
    .getElementById("timer-area")
    .style.setProperty("--timerArea", durationType.bgColor);
  document.getElementById("pomodoro-info").innerText = durationType.title;
  document.getElementById("timer-minute").innerText = durationType.min;
  document.getElementById("timer-second").innerText = durationType.sec;

  console.log("geçtim")
  clearInterval(interval);
  console.log(interval)
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
  startButton.innerText="START"
  if (currentDuration == taskTime.name) {
    nextDuration(breakTime);
  } else {
    nextDuration(taskTime);
  }

};

const buttonHandle = (buttonContent) => {
  switch(buttonContent){
    case "PAUSE":
      timerPause();
      break;
    case "RESUME":
      timer();
      break;
  }
}