const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

let fullCups = localStorage.getItem('fullCups') ? parseInt(localStorage.getItem('fullCups')) : 0;

updateBigCup()

smallCups.forEach((cup, idx) => {
  if (idx < fullCups) {
    cup.classList.add('full')
  }

  cup.addEventListener('click', () => highlightCups(idx))
})

function highlightCups(idx) {
  if (idx === smallCups.length - 1 && smallCups[idx].classList.contains('full')) idx--
  else if (
    smallCups[idx].classList.contains('full') &&
    !smallCups[idx].nextElementSibling.classList.contains('full')
  ) {
    idx--
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add('full')
    } else {
      cup.classList.remove('full')
    }
  })

  fullCups = idx + 1;
  localStorage.setItem('fullCups', fullCups);

  updateBigCup()
}

function updateBigCup() {
  const totalCups = smallCups.length

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden'
    percentage.style.height = 0
  } else {
    percentage.style.visibility = 'visible'
    percentage.style.height = `${(fullCups / totalCups) * 330}px`
    percentage.innerText = `${((fullCups / totalCups) * 100).toFixed(0)}%`
  }

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden'
    remained.style.height = 0
  } else {
    remained.style.visibility = 'visible'
    liters.innerText = `${(4 - (250 * fullCups) / 1000).toFixed(2)}L`
  }
}
