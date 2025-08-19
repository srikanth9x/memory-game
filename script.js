//emojis array
const cards = [
  {
    emoji: "🍎"
  },
  {
    emoji: "🥊"
  },
  {
    emoji: "🐞"
  },
  {
    emoji: "🚨"
  },
  {
    emoji: "🧨"
  },
  {
    emoji: "👹"
  },
  {
    emoji: "🍄"
  },
  {
    emoji: "🎀"
  },
  {
    emoji: "🌹"
  },
  {
    emoji: "☎️"
  },
  {
    emoji: "🍎"
  },
  {
    emoji: "🥊"
  },
  {
    emoji: "🐞"
  },
  {
    emoji: "🚨"
  },
  {
    emoji: "🧨"
  },
  {
    emoji: "👹"
  },
  {
    emoji: "🍄"
  },
  {
    emoji: "🎀"
  },
  {
    emoji: "🌹"
  },
  {
    emoji: "☎️"
  }
]
// shuffling cards
cards.sort(() => 0.5 - Math.random()) 

// Selecting elements 
const grid = document.getElementById("grid")
const score = document.getElementById("score-num")
const timeLeft = document.getElementById("time-left-num")
const message = document.getElementById("message")
let cardsChoosen = []
let cardsChoosenId = []
const cardsWon = [] 
let currentTime = 60

// function for creating cards 
function createCards() {
  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement("div")
    card.setAttribute("class", "card")
    card.setAttribute("data-id", i)
    card.textContent = "🧠"
    card.addEventListener("click", flipCard)
    grid.appendChild(card)
  }
}
createCards()

// function to check match if cards
function checkMatch() {
  const allCards = document.querySelectorAll("#grid div")
  const option1Id = cardsChoosenId[0]
  const option2Id = cardsChoosenId[1]
  if (cardsChoosen[0] ===  cardsChoosen[1] && option1Id !== option2Id) {
    message.textContent = "Boom! You got it!"
    message.style.color = "#44bb44"
    allCards[option1Id].style.visibility = "hidden"
    allCards[option2Id].style.visibility = "hidden"
    cardsWon.push(cardsChoosen[0])
  } else {
    allCards[option1Id].textContent = "🧠"
    allCards[option2Id].textContent = "🧠"
    message.textContent = "Oops, try again!"
    message.style.color = "#ff4444"
  }
  if (cardsWon.length ===  cards.length/2) {
    message.innerHTML = " Congratulations!<br><span style='color:#444444'>You crushed it, legend!</span>";
    message.style.color = "#44bb44"
    clearInterval(countDownTimerId) 
  }
  score.textContent = cardsWon.length
  cardsChoosen = []
  cardsChoosenId = []
}

// function to flip a card
function flipCard() {
  const cardId = this.getAttribute("data-id")
  if(cardsChoosenId.includes(cardId) || cardsChoosen.length === 2) return;
  cardsChoosen.push(cards[cardId].emoji)
  cardsChoosenId.push(cardId)
  this.textContent = cards[cardId].emoji
  if (cardsChoosen.length === 2) {
    setTimeout( checkMatch, 200) 
  }
}

// function to countdown time
function countDown() {  
  currentTime--  
  timeLeft.textContent = currentTime  
  if (currentTime === 0) {  
    clearInterval(countDownTimerId)  
    message.innerHTML = "Game Over!<br><span style='color:#444444'>Refresh to try again!</span>";
    message.style.color = "#ff4444"
    const stopCards = document.querySelectorAll("#grid div")
    stopCards.forEach(card => {
      card.removeEventListener("click", flipCard)
    })
  }  
  if (currentTime === 10) {
    timeLeft.style.color = "#ff4444"
  }
}
let countDownTimerId = setInterval(countDown, 1000)


