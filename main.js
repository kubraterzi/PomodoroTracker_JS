let timer_minute = document.getElementById("timer-minute");
let timer_second = document.getElementById("timer-second");

const totalTaskTime = 25 * 60 * 1000;
const totalBreakTime = 5 * 60 * 1000;

const taskTime = {
  min: "25",
  sec: "00",
  title: "Pomodoro Info",
  bgColor: "#d04643",
  hoverColor: "#ac3a38"
};
const breakTime = {
  min: "05",
  sec: "00",
  title: "Take a break",
  bgColor: "#56bd56",
  hoverColor: "#3a803a"
};

const longBreakTime = {
    min: "15",
    sec: "00",
    title: "Take a long break.",
    bgColor: "#56bd56",
    hoverColor: "#3a803a"
  };


let clickCounter = 0;
const nextButton = document.querySelector("#next-page-button");
nextButton.addEventListener("click", () => {
  if (clickCounter % 2 == 1 ) {
    nextDuration(taskTime);
  }else if(clickCounter  %2 == 0 && clickCounter != 6){ // 6 -> 4. pomodoro da uzun mola verir.(1 task + 1 mola = 1 pomodoro)
    nextDuration(breakTime);
  }else {
    nextDuration(longBreakTime)
  }

  clickCounter += 1;
  console.log(clickCounter);
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
      }
    }
  }, 1000);
};

const countDown = (second, interval) => {
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
  document.getElementById("timer-minute").innerText = "01";
  document.getElementById("timer-second").innerText = "00";
  startButton.disabled = false;
};

const nextDuration = (durationType) => {
  document.getElementById("timer-area").style.setProperty("--timerArea", durationType.bgColor);
  document.getElementById("pomodoro-info").innerText = durationType.title;
  document.getElementById("timer-minute").innerText = durationType.min;
  document.getElementById("timer-second").innerText = durationType.sec;
  hoverHandle(durationType)
};

const hoverHandle = (durationType) => {
  const buttons = document.querySelectorAll("div.button_container > button");
  buttons.forEach((button) => {
    button.style.setProperty("--hoverColor", durationType.hoverColor);
  });
};
