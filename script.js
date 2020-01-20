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
// array containing my questions and answers to the quiz

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
let startButtonAgain = createNewElement(
  "button",
  "start-button btn btn-primary"
);
let viewButtonContainer = document.querySelector(".view-button-container");
let viewButton = createNewElement("button", "view", "view-button");
let counter = 0; // initial counter which will be key in generating content
let secondsLeft = questions.length * 15; // initial value for the timer
let scores = []; // scores array which is where all the local storage data will go

function createNewElement(element, classTitle, id, onClickResponse) {
  let newItem = document.createElement(element);
  newItem.setAttribute("class", classTitle);
  newItem.setAttribute("id", id);
  newItem.setAttribute("onClick", onClickResponse);
  return newItem;
} // function that creates and sets multiple attributes to created elements

function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;
    if (secondsLeft === 0 || secondsLeft < 0 || counter === questions.length) {
      if (secondsLeft < 0) {
        timer.textContent = 0;
      } // if secondsLeft is less than or equal to 0 or counter is 5 generate the done page
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
    }
    checker.textContent = "";
  }, 1000);
} // set timer function that counts down and also checks conditions when met generate the done screen

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
      "reply_click(this.id)" // function reply_click which is specified on the onclick attribute of the button with it's id
    );
    button.textContent = questions[counter].choices[i];
    newContainer.appendChild(button);
    console.log(button);
  }
});
// start button event listener that generates the first question content into the page

newContainer.addEventListener("click", function(e) {
  let target = e.target;
  let buttons = document.querySelectorAll(".btn");
  if (target.matches("button")) {
    if (counter === questions.length || counter > questions.length) {
      for (let i = 0; i <= 4; i++) {
        newContainer.removeChild(newContainer.childNodes[0]);
      }
      return;
    } // if counter is at or greater than questions length, buttons are removed from page
    question.textContent = questions[counter].title;
    for (let i = 0; i < 4; i++) {
      buttons[i].textContent = questions[counter].choices[i];
      buttons[i].setAttribute("id", questions[counter].choices[i]);
    } // changes the text content in the buttons depending on the counter
  }
}); // newContainer event listener which updates the question and buttons content

function reply_click(clicked_id) {
  if (clicked_id !== questions[counter].answer) {
    secondsLeft -= 15;
    checker.textContent = "You are wrong";
  } else {
    checker.textContent = "You are right";
  }
  newContainer.appendChild(checker);
  counter++;
} // reply_click function which responds to the button clicked id value, if the id value matches the answer displays "you are right" or "you are wrong" to a new container

submit.addEventListener("click", function(e) {
  localStorage.setItem("initials", inputField.value); // pushes value of input field to local storage
  for (let i = 0; i < scores.length; i++) {
    if (scores.length === 0) {
      break;
    } else {
      scores[i] = "";
    }
    if (scores[i] === "") {
      scores.shift();
    }
  } // removes whitespaces from the scores array while keeping the current score user has into the array

  scores.push(
    localStorage.getItem("initials") + " " + localStorage.getItem("highscore")
  ); // pushes initials and highscore into the array
  for (let i = 0; i <= container.childNodes.length; i++) {
    container.removeChild(container.childNodes[0]);
  }
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
}); // generates highscores page

function renderScores() {
  for (let i = 0; i < scores.length; i++) {
    let finalScore = scores[i];
    let listItem = createNewElement("li", "list-item");
    listItem.textContent = finalScore;
    list.appendChild(listItem);
  }
} // function appends new list items connected to the scores in local storage

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
  secondsLeft = questions.length * 15;
}); // go back button regenerates the content in the index page and resets counter to 0 and seconds left to 75

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
  } // event listener tied to the start button generated from the go back button
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
  } // for loop which creates the buttons again
});

clearAll.addEventListener("click", function(e) {
  while (list.childNodes.length !== 0) {
    for (let i = 0; i <= list.childNodes.length; i++) {
      list.removeChild(list.childNodes[0]);
    }
  }
}); // event listener which clears all the high scores

viewButton.addEventListener("click", function(e) {
  clearInterval(timerInterval);
  timer.textContent = "";
  while (newContainer.childNodes.length !== 0) {
    for (let i = 0; i < newContainer.childNodes.length; i++) {
      newContainer.removeChild(newContainer.childNodes[0]);
    }
  } // while loop which removes the buttons from the new container so when the start button is run and the buttons are created there will only be 4
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
}); // event listener which removes content and updates it with content for the highscores page
