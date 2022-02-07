let timer_minute = document.getElementById("timer-minute");
let timer_second = document.getElementById("timer-second");

// let break_minute = document.getElementById("break-minute");
// let break_second = document.getElementById("break-second");

const totalTaskTime = 25 * 60 * 1000;
const totalBreakTime = 5 * 60 * 1000;

let clickCounter = 0;
const nextButton = document.querySelector("#next-page-button");
nextButton.addEventListener("click", () => {
  clickCounter += 1;
  console.log(clickCounter);
});

var interval;
const startButton = document.querySelector("#start-button")

const timer = () => {
  startButton.disabled=true;
  startButton.style.setProperty("background-color", "#ac3a38")

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

const toClickNext = () => {
  changeCssFormatOfTimer();
};

const timerStop = () => {
  clearInterval(interval);
  document.getElementById("timer-minute").innerText="01";
  document.getElementById("timer-second").innerText="00";
  startButton.disabled=false;
};

const changeCssFormatOfTimer = () => {
  document.getElementById("timer-area").style.setProperty("--timerArea", "#56bd56");
  document.getElementById("pomodoro-info").innerText = "Take a Break";
  hoverHandle();
};

const hoverHandle = (durationType) => {
  const buttons = document.querySelectorAll("div.button_container > button");
  buttons.forEach((button) => {
    button.style.setProperty("--hoverColor", "#3a803a");
  });
  document.getElementById("timer-minute").innerText = "05";
  document.getElementById("timer-second").innerText = "00";
};
