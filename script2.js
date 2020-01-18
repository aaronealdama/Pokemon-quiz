let highscoreContainer = document.querySelector(".highscore-container");
let goBack = document.querySelector(".back");
let clear = document.querySelector(".clear");
let container = document.querySelector(".container");
let score = createNewElement("div", "score");
let list = document.querySelector(".list");
let scores = [];

function createNewElement(element, classTitle, id, onClickResponse) {
  let newItem = document.createElement(element);
  newItem.setAttribute("class", classTitle);
  newItem.setAttribute("id", id);
  newItem.setAttribute("onClick", onClickResponse);
  return newItem;
}

window.addEventListener("load", function(e) {
  //   scores.push(
  //     localStorage.getItem("initials") + " " + localStorage.getItem("highscore")
  //   );
  //   score.textContent =
  //     localStorage.getItem("initials") + " " + localStorage.getItem("highscore");
  //   highscoreContainer.appendChild(score);
  //   console.log(container.childNodes[3]);
  renderScores();
  let finalScore =
    localStorage.getItem("initials") + " " + localStorage.getItem("highscore");
  let listItem = createNewElement("li", "list-item");
  listItem.textContent = finalScore;
  list.appendChild(listItem);
});

goBack.addEventListener("click", function(e) {
  window.location.href = "http://127.0.0.1:5500/Pokemon-quiz/index.html";
  scores.push(
    localStorage.getItem("initials") + " " + localStorage.getItem("highscore")
  );
});

function renderScores() {
  for (let i = 0; i < scores.length; i++) {
    let finalScore = scores[i];
    let listItem = createNewElement("li", "list-item");
    listItem.textContent = finalScore;
    list.appendChild(listItem);
  }
}
