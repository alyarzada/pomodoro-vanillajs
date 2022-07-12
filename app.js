// queryselectors
const worktime_input = document.querySelector('.worktime-input');
const resttime_input = document.querySelector('.resttime-input');

const timeHolder = document.querySelector('.minute-text');
const secondHolder = document.querySelector('.second-text');
const colon = document.querySelector('.colon');
const btnclose = document.querySelector('.button-close');

const playBtn = document.querySelector('.play-btn');
const refreshBtn = document.querySelector('.refresh-btn');
const notification = document.querySelector('.notification');
const settingBtn = document.querySelector('.setting-btn');
const navToggler = document.querySelector('.nav-toggler');
const done = document.querySelector('.popup-close');
const popupSettings = document.querySelector('.pop-up-settings');
const musics = document.querySelector('.musics-wrapper');
const nav = document.querySelector('nav');

// audios
const finishMusic = new Audio(
  './assets/mixkit-sanctuary-or-cathedral-big-bells-602.wav'
);
const finishMusic2 = new Audio('./assets/2.wav');
const finishMusic3 = new Audio('./assets/3.wav');
const clickSound = new Audio('./assets/1 second tick sound.wav');

// declare global variables
let minute, second, interval, restTimeMinute, restTimeSecond, activeMusic;

// functions
const startTimerHandler = (e) => {
  switch (e.target.textContent) {
    case 'play':
      interval = setInterval(() => {
        if (minute === 0 && second === 0) {
          clearInterval(interval);
          activeMusic.play();
          notification.textContent = 'You can take a break !';
          timeHolder.classList.add('fade-animation');
          secondHolder.classList.add('fade-animation');
          colon.classList.add('fade-animation');
          e.target.setAttribute('disabled', null);
          settingBtn.setAttribute('disabled', null);

          setTimeout(() => {
            notification.classList.add('countdown-animation');
            notification.textContent = 'Rest time is starting...';
            setTimeout(() => {
              notification.textContent = '3';
              setTimeout(() => {
                notification.textContent = '2';
                setTimeout(() => {
                  notification.textContent = '1';
                }, 1000);
              }, 1000);
            }, 1000);
          }, 2000);

          setTimeout(() => {
            notification.classList.remove('countdown-animation');
            notification.classList.add('fade-in-animation');
            notification.textContent = 'Rest time started!';
            activeMusic.pause();
            timeHolder.classList.remove('fade-animation');
            secondHolder.classList.remove('fade-animation');
            colon.classList.remove('fade-animation');

            if (resttime_input.value.length > 0 && resttime_input.value >= 0) {
              restTimeMinute = parseInt(Math.floor(resttime_input.value));
            }
            restTimeSecond = 0;

            setTimeout(() => {
              notification.textContent = '';
            }, 2000);

            const restInterval = setInterval(() => {
              if (restTimeMinute === 0 && restTimeSecond === 0) {
                clearInterval(restInterval);
                activeMusic.play();
                notification.classList.remove('fade-in-animation');
                notification.textContent = 'Rest time is up!';
                e.target.setAttribute('disabled', null);
                settingBtn.setAttribute('disabled', null);

                setTimeout(() => {
                  document.location.reload();
                }, 5000);
              } else {
                restTimeSecond--;
              }

              if (restTimeSecond < 0) {
                restTimeSecond = 59;
                if (restTimeMinute !== 0) {
                  restTimeMinute -= 1;
                }
              }

              timeHolder.textContent = `${
                restTimeMinute < 10 ? `0` : ``
              }${restTimeMinute}`;
              secondHolder.textContent = `${
                restTimeSecond < 10 ? `0` : ``
              }${restTimeSecond}`;
            }, 1000);
          }, 6000);
        } else {
          second--;
        }

        if (second < 0) {
          second = 59;
          if (minute !== 0) {
            minute -= 1;
          }
        }

        clickSound.play();
        timeHolder.textContent = `${minute < 10 ? `0` : ``}${minute}`;
        secondHolder.textContent = `${second < 10 ? `0` : ``}${second}`;
        e.target.textContent = 'pause';
      }, 1000);
      break;
    case 'pause':
      clickSound.pause();
      e.target.textContent = 'play';
      clearInterval(interval);
  }
};

const refreshPageHandler = () => {
  document.location.reload();
};

const sidebarToggleHandler = () => {
  nav.classList.toggle('nav-open');
};

const popupShowHandler = () => {
  popupSettings.classList.add('pop-up-display');
};

const doneHandler = (e) => {
  e.preventDefault();

  if (parseInt(worktime_input.value) <= 0) {
    minute = 0;
    second = 0;
  } else if (parseInt(worktime_input.value) > 0) {
    minute = Math.floor(worktime_input.value);
    second = 0;
  }

  if (parseInt(resttime_input.value) <= 0) {
    restTimeMinute = 0;
    restTimeSecond = 0;
  } else if (parseInt(resttime_input.value) > 0) {
    restTimeMinute = Math.floor(resttime_input.value);
    restTimeSecond = 0;
  }

  timeHolder.textContent = `${minute < 10 ? `0` : ``}${minute}`;
  secondHolder.textContent = `${second < 10 ? `0` : ``}${second}`;

  popupSettings.classList.remove('pop-up-display');
  clearInterval(interval);
  playBtn.textContent = 'play';
};

const popupcloseHandler = () => {
  popupSettings.classList.remove('pop-up-display');
};

const selectMusicHandler = (e) => {
  switch (e.target.value) {
    case 'music1':
      activeMusic = finishMusic;
      break;
    case 'music2':
      activeMusic = finishMusic2;
      break;
    case 'music3':
      activeMusic = finishMusic3;
      break;
  }
}

// eventlisteners
window.addEventListener('DOMContentLoaded', () => {
  minute = 25;
  second = 0;
  restTimeMinute = 5;
  restTimeSecond = 0;
  activeMusic = finishMusic;
  timeHolder.textContent = minute;
  secondHolder.textContent = `${second < 10 ? `0` : ``}${second}`;
});

playBtn.addEventListener('click', startTimerHandler);
refreshBtn.addEventListener('click', refreshPageHandler);
navToggler.addEventListener('click', sidebarToggleHandler);
done.addEventListener('click', doneHandler);
settingBtn.addEventListener('click', popupShowHandler);
btnclose.addEventListener('click', popupcloseHandler);
musics.addEventListener('click', selectMusicHandler);