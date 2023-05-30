changeLagnuage(currentLang);

showTimeToRelease();

function showTimeToRelease(){
  let time = 0;
  const daysContainer = document.querySelector('.days-left');
  const hoursContainer = document.querySelector('.hours-left');
  const minutesContainer = document.querySelector('.minutes-left');
  const secondsContainer = document.querySelector('.seconds-left');
  let releaseTime = new Date(2023, 11, 12);
  let intervalId = setInterval(() => {
    let time = releaseTime - Date.now();
    daysContainer.textContent = ` ${moment(time).format('DDD')}, `;
    hoursContainer.textContent = ` ${moment(time).format('HH')}, `;
    minutesContainer.textContent = ` ${moment(time).format('mm')}, `;
    secondsContainer.textContent = ` ${moment(time).format('ss')}`;
});
  if(time < 0) {
    clearInterval(intervalId);
  }
}

