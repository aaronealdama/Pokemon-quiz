let questions = [
  {
    title: "What is the maximum level of a Pokemon?",
    choices: ["70", "80", "90", "100"],
    answer: "100"
  },
  {
    title: "How many pokemon can you carry?",
    choices: ["4", "5", "6", "7"],
    answer: "6"
  },
  {
    title: "What is the strongest Pokeball?",
    choices: ["Masterball", "Pokeball", "Ultraball", "Quickball"],
    answer: "Masterball"
  },
  {
    title: "Who is the strongest legendary pokemon?",
    choices: ["Reshiram", "Rayquaza", "Mewtwo", "Arceus"],
    answer: "Arceus"
  },
  {
    title: "Who must you beat in order to complete the game?",
    choices: [
      "Headboss of evil organization",
      "The champion",
      "The 8th gym leader",
      "Your rival"
    ],
    answer: "The champion"
  }
];

let startButton = document.getElementById("start-button");
let container = document.querySelector(".container");
let newContainer = createNewElement("div", "question-container");
let question = createNewElement("h1", "question");
let timer = document.querySelector(".time");
let counter = 0;
let secondsLeft = 75;

function createNewElement(element, classTitle) {
  let newItem = document.createElement(element);
  newItem.setAttribute("class", classTitle);
  return newItem;
}

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

startButton.addEventListener("click", function(e) {
  setTime();
  container.removeChild(container.childNodes[1]);
  console.log(question);
  question.textContent = questions[0].title;
  newContainer.appendChild(question);
  container.appendChild(newContainer);
  for (let i = 0; i < 4; i++) {
    let button = createNewElement("button", "btn");
    button.textContent = questions[0].choices[i];
    newContainer.appendChild(button);
  }
  counter++;
});

newContainer.addEventListener("click", function(e) {
  let target = e.target;
  let buttons = document.querySelectorAll(".btn");
  if (target.matches("button")) {
    question.textContent = questions[counter].title;
    for (let i = 0; i < 4; i++) {
      buttons[i].textContent = questions[counter].choices[i];
    }
    counter++;
  }
});
