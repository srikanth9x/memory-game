//Emojis array
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

// Shuffling cards
cards.sort(() => 0.5 - Math.random()) 

// Selecting elements 
const grid = document.getElementById("grid")
let score = document.getElementById("score-num")
let timeLeft = document.getElementById("time-left-num")
let message1 = document.getElementById("message-1")
let message2 = document.getElementById("message-2")
let cardsChoosen = []
let cardsChoosenId = []
const cardsWon = [] 
let currentTime = 60

// Function for creating cards 
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

// Function to check match if cards
function checkMatch() {
  const allCards = document.querySelectorAll("#grid div")
  const option1Id = cardsChoosenId[0]
  const option2Id = cardsChoosenId[1]
  if (cardsChoosen[0] ===  cardsChoosen[1] && option1Id !== option2Id) {
    message1.textContent = "Boom! You got it!"
    message1.style.color = "#44BB44"
    allCards[option1Id].style.visibility = "hidden"
    allCards[option2Id].style.visibility = "hidden"
    cardsWon.push(cardsChoosen[0])
  } else {
    allCards[option1Id].textContent = "🧠"
    allCards[option2Id].textContent = "🧠"
    message1.textContent = "Oops, try again!"
    message1.style.color = "#FF4444"
  }
  if (cardsWon.length ===  cards.length/2) {
    message1.textContent = "Congratulations!"
    message1.style.color = "#44BB44"
    message2.textContent = "You crushed it, legend!"
    clearInterval(countDownTimerId) 
  }
  score.textContent = cardsWon.length
  cardsChoosen = []
  cardsChoosenId = []
}

// Function to flip a card
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

// Function to countdown time
function countDown() {  
  currentTime--  
  timeLeft.textContent = currentTime  
  if (currentTime === 0) {  
    clearInterval(countDownTimerId)  
    message1.textContent = "Game Over!"
    message1.style.color = "#FF4444"
    message2.textContent = "Refresh to try again!"
    const stopCards = document.querySelectorAll("#grid div")
    stopCards.forEach(card => {
      card.removeEventListener("click", flipCard)
    })
  }  
  if (currentTime === 10) {
    timeLeft.style.color = "#FF4444"
  }
}
let countDownTimerId = setInterval(countDown, 1000)


