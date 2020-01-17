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
let checker = createNewElement("div", "checker");
let question = createNewElement("h1", "question");
let timer = document.querySelector(".time");
let counter = 0;
let secondsLeft = 75;

function createNewElement(element, classTitle, id, onClickResponse) {
  let newItem = document.createElement(element);
  newItem.setAttribute("class", classTitle);
  newItem.setAttribute("id", id);
  newItem.setAttribute("onClick", onClickResponse);
  return newItem;
}

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0 || secondsLeft < 0) {
      clearInterval(timerInterval);
    }
    checker.textContent = "";
  }, 1000);
}

startButton.addEventListener("click", function(e) {
  let target = e.target;
  setTime();
  container.removeChild(container.childNodes[1]);
  question.textContent = questions[0].title;
  newContainer.appendChild(question);
  container.appendChild(newContainer);
  for (let i = 0; i < 4; i++) {
    let button = createNewElement(
      "button",
      "btn",
      questions[counter].choices[i],
      "reply_click(this.id)"
    );
    button.textContent = questions[counter].choices[i];
    newContainer.appendChild(button);
    console.log(button);
  }
});

newContainer.addEventListener("click", function(e) {
  let target = e.target;
  let buttons = document.querySelectorAll(".btn");
  if (target.matches("button")) {
    question.textContent = questions[counter].title;
    for (let i = 0; i < 4; i++) {
      buttons[i].textContent = questions[counter].choices[i];
      buttons[i].setAttribute("id", questions[counter].choices[i]);
    }
  }
});

function reply_click(clicked_id) {
  console.log(clicked_id);
  if (clicked_id !== questions[counter].answer) {
    secondsLeft -= 15;
    checker.textContent = "You are wrong";
  } else {
    checker.textContent = "You are right";
  }
  newContainer.appendChild(checker);
  console.log(questions[counter].answer);
  counter++;
}
