const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const restartBtn = document.getElementById('restart-btn');
const timeRemaining = document.getElementById('time-remaining');

let fullCups = localStorage.getItem('fullCups') ? parseInt(localStorage.getItem('fullCups')) : 0;

updateBigCup();
displayCountdown();

smallCups.forEach((cup, idx) => {
  if (idx < fullCups) {
    cup.classList.add('full');
  }

  cup.addEventListener('click', () => highlightCups(idx));
});

restartBtn.addEventListener('click', resetCups);

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
  smallCups.forEach(cup => cup.classList.remove('full'));
  fullCups = 0;
  localStorage.removeItem('fullCups');
  updateBigCup();
}

function displayCountdown() {
  const now = new Date();
  let targetTime = new Date();

  targetTime.setHours(24, 0, 0, 0);

  if (now >= targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const interval = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = targetTime - currentTime;

    if (timeDiff <= 0) {
      clearInterval(interval);
      resetCups();
      displayCountdown();
    } else {
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);
      timeRemaining.innerText = `${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}
