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

let navbar = document.querySelector(".navbar");
let startButton = document.querySelector("#start-button");
let container = document.querySelector(".container");
let newContainer = createNewElement("div", "question-container");
let checker = createNewElement("div", "checker");
let question = createNewElement("h1", "question");
let timer = document.querySelector(".time");
let submit = createNewElement("button", "submit");
let submitButton = document.querySelector(".submit");
let inputField = createNewElement("input", "final-score");
let initials = createNewElement("span", "initials");
let initialContainer = createNewElement("div", "initial-container");
let score = createNewElement("div", "score");
let announcer = createNewElement("div", "announcer");
let list = createNewElement("ul", "list");
let highScoreContainer = createNewElement("div", "highscore-container");
let buttonContainer = createNewElement("div", "button-container");
let goBackButton = createNewElement("button", "btn btn-success back");
let goBack = document.querySelector(".back");
let clearAll = createNewElement("button", "btn btn-danger clear");
let pokemonIntro = createNewElement("div", "pokemon-intro");
let pokemonHeading = createNewElement("h1", "heading");
let pokemonPara = createNewElement("p", "para");
let startButtonAgain = createNewElement("button", "start-button");
let viewButtonContainer = document.querySelector(".view-button-container");
let viewButton = createNewElement("button", "view", "view-button");
let counter = 0;
let secondsLeft = 75;
let scores = [];

function createNewElement(element, classTitle, id, onClickResponse) {
  let newItem = document.createElement(element);
  newItem.setAttribute("class", classTitle);
  newItem.setAttribute("id", id);
  newItem.setAttribute("onClick", onClickResponse);
  return newItem;
}

function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0 || secondsLeft < 0 || counter === questions.length) {
      if (secondsLeft < 0) {
        timer.textContent = 0;
      }
      clearInterval(timerInterval);
      localStorage.setItem("highscore", timer.textContent);
      timer.textContent = "";
      navbar.removeChild(viewButtonContainer);
      while (container.childNodes.length !== 0) {
        for (let i = 0; i <= container.childNodes.length; i++) {
          container.removeChild(container.childNodes[0]);
        }
      }
      question.textContent = "You are done!";
      newContainer.appendChild(question);
      announcer.textContent =
        "Your final score is " + localStorage.getItem("highscore");
      newContainer.appendChild(announcer);
      newContainer.appendChild(initialContainer);
      initials.textContent = "Your initials";
      initials.appendChild(inputField);
      initials.appendChild(submit);
      submit.textContent = "Submit";
      initialContainer.appendChild(initials);
      container.appendChild(newContainer);
      console.log(container.childNodes);
    }
    checker.textContent = "";
  }, 1000);
}

startButton.addEventListener("click", function(e) {
  let target = e.target;
  setTime();
  viewButton.textContent = "View Highscores";
  viewButtonContainer.appendChild(viewButton);
  container.removeChild(container.childNodes[1]);
  question.textContent = questions[0].title;
  newContainer.appendChild(question);
  container.appendChild(newContainer);
  for (let i = 0; i < 4; i++) {
    let button = createNewElement(
      "button",
      "btn btn-info",
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
    if (counter === questions.length || counter > questions.length) {
      for (let i = 0; i <= 4; i++) {
        newContainer.removeChild(newContainer.childNodes[0]);
      }
      console.log(newContainer);
      return;
    }
    question.textContent = questions[counter].title;
    for (let i = 0; i < 4; i++) {
      buttons[i].textContent = questions[counter].choices[i];
      buttons[i].setAttribute("id", questions[counter].choices[i]);
    }
  }
});

function reply_click(clicked_id) {
  if (clicked_id !== questions[counter].answer) {
    secondsLeft -= 15;
    checker.textContent = "You are wrong";
  } else {
    checker.textContent = "You are right";
  }
  newContainer.appendChild(checker);
  counter++;
}

submit.addEventListener("click", function(e) {
  localStorage.setItem("initials", inputField.value);
  for (let i = 0; i < scores.length; i++) {
    if (scores.length === 0) {
      break;
    } else {
      scores[i] = "";
    }
    if (scores[i] === "") {
      scores.shift();
    }
  }

  scores.push(
    localStorage.getItem("initials") + " " + localStorage.getItem("highscore")
  );
  for (let i = 0; i <= container.childNodes.length; i++) {
    container.removeChild(container.childNodes[0]);
  }
  // container.removeChild(container.childNodes[0]);
  question.textContent = "Highscores";
  container.appendChild(highScoreContainer);
  highScoreContainer.appendChild(question);
  renderScores();
  highScoreContainer.appendChild(list);
  goBackButton.textContent = "Go Back";
  clearAll.textContent = "Clear All";
  buttonContainer.appendChild(goBackButton);
  buttonContainer.appendChild(clearAll);
  highScoreContainer.appendChild(buttonContainer);
  console.log(scores);
});

function renderScores() {
  for (let i = 0; i < scores.length; i++) {
    let finalScore = scores[i];
    let listItem = createNewElement("li", "list-item");
    listItem.textContent = finalScore;
    list.appendChild(listItem);
    console.log(list);
  }
}

goBackButton.addEventListener("click", function(e) {
  container.removeChild(container.childNodes[0]);
  container.appendChild(pokemonIntro);
  pokemonHeading.textContent = "Pokemon Quiz Challenge";
  pokemonPara.textContent =
    "Are you the very best like no one every was? Take this quiz to find out if you really have what it takes to become a Pokemon master! Be careful of wrong answers!";
  startButtonAgain.textContent = "Start";
  pokemonIntro.appendChild(pokemonHeading);
  pokemonIntro.appendChild(pokemonPara);
  pokemonIntro.appendChild(startButtonAgain);
  counter = 0;
  secondsLeft = 75;
  console.log(startButtonAgain);
  console.log(container.childNodes);
});

startButtonAgain.addEventListener("click", function(e) {
  let target = e.target;
  setTime();
  navbar.appendChild(viewButtonContainer);
  viewButtonContainer.appendChild(viewButton);
  viewButton.textContent = "View Highscores";
  while (container.childNodes.length !== 0) {
    for (let i = 0; i < container.childNodes.length; i++) {
      container.removeChild(container.childNodes[0]);
    }
  }

  container.appendChild(newContainer);
  question.textContent = questions[counter].title;
  newContainer.appendChild(question);

  for (let i = 0; i < 4; i++) {
    let button = createNewElement(
      "button",
      "btn btn-info",
      questions[counter].choices[i],
      "reply_click(this.id)"
    );
    button.textContent = questions[counter].choices[i];
    newContainer.appendChild(button);
  }
  console.log(container);
});

clearAll.addEventListener("click", function(e) {
  while (list.childNodes.length !== 0) {
    for (let i = 0; i <= list.childNodes.length; i++) {
      list.removeChild(list.childNodes[0]);
    }
  }
  console.log(list.childNodes.length);
});

viewButton.addEventListener("click", function(e) {
  clearInterval(timerInterval);
  timer.textContent = "";
  while (newContainer.childNodes.length !== 0) {
    for (let i = 0; i < newContainer.childNodes.length; i++) {
      newContainer.removeChild(newContainer.childNodes[0]);
    }
  }
  while (container.childNodes.length !== 0) {
    for (let i = 0; i <= container.childNodes.length; i++) {
      container.removeChild(container.childNodes[0]);
    }
  }
  navbar.removeChild(viewButtonContainer);
  question.textContent = "Highscores";
  container.appendChild(highScoreContainer);
  highScoreContainer.appendChild(question);
  renderScores();
  highScoreContainer.appendChild(list);
  goBackButton.textContent = "Go Back";
  clearAll.textContent = "Clear All";
  buttonContainer.appendChild(goBackButton);
  buttonContainer.appendChild(clearAll);
  highScoreContainer.appendChild(buttonContainer);
});
