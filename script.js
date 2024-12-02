const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const countdownDisplay = document.getElementById('time-remaining');
const resetButton = document.getElementById('reset');
const currentDateDisplay = document.getElementById('date-display');

let fullCups = localStorage.getItem('fullCups') ? parseInt(localStorage.getItem('fullCups')) : 0;

updateBigCup();
displayCurrentDate();
startCountdown();

smallCups.forEach((cup, idx) => {
  if (idx < fullCups) {
    cup.classList.add('full');
  }

  cup.addEventListener('click', () => highlightCups(idx));
});

resetButton.addEventListener('click', resetCups);

function highlightCups(idx) {
  if (idx === smallCups.length - 1 && smallCups[idx].classList.contains('full')) idx--;
  else if (
    smallCups[idx].classList.contains('full') &&
    !smallCups[idx].nextElementSibling.classList.contains('full')
  ) {
    idx--;
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  fullCups = idx + 1;
  localStorage.setItem('fullCups', fullCups);
  updateBigCup();
}

function updateBigCup() {
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${((fullCups / totalCups) * 100).toFixed(0)}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${(3 - (250 * fullCups) / 1000).toFixed(2)}L`;
  }
}

function resetCups() {
  fullCups = 0;
  localStorage.removeItem('fullCups');
  smallCups.forEach(cup => cup.classList.remove('full'));
  updateBigCup();
}

function displayCurrentDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDateDisplay.innerText = now.toLocaleDateString(undefined, options);
}

function startCountdown() {
  const now = new Date();
  const resetTime = new Date();
  resetTime.setHours(24, 0, 0, 0);

  if (now >= resetTime) {
    resetTime.setDate(resetTime.getDate() + 1);
  }

  const updateCountdown = () => {
    const currentTime = new Date();
    const timeDifference = resetTime - currentTime;

    if (timeDifference <= 0) {
      resetCups();
      startCountdown();
    } else {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      countdownDisplay.innerText = `${hours}h ${minutes}m ${seconds}s`;
    }
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
