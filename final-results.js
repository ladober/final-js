const htmlElement = document.querySelector("[data-theme]");

let dataTheme = document.querySelector(".btn");

let isDarkMode = false;

function newTheme() {
  dataTheme.addEventListener("click", () => {
    if (!isDarkMode) {
      isDarkMode = true;
      htmlElement.setAttribute("data-theme", "dark");
      dataTheme.classList.add("next-btn");
      localStorage.setItem(
        "theme",
        // JSON.stringify(dataTheme.getAttribute("data-theme"))
        JSON.stringify(isDarkMode)
      );
    } else if (isDarkMode) {
      isDarkMode = false;
      htmlElement.setAttribute("data-theme", "light");
      dataTheme.classList.remove("next-btn");
      localStorage.setItem("theme", JSON.stringify(isDarkMode));
    }
  });
}

let newtheme = JSON.parse(localStorage.getItem("theme", isDarkMode));

if (newtheme) {
  htmlElement.setAttribute("data-theme", "dark");
  dataTheme.classList.add("next-btn");
}

newTheme();

// Final Score-----------------------------------------------

const submitAnswer = document.querySelector(".button-next");

const finalResultP = document.querySelector(".final-results-p");

const finalResultsH1 = document.querySelector(".final-results-h1");

const finalResult = "You Scored...";
finalResultP.append(finalResult);
const scoredText = "Quiz Completed";
finalResultsH1.append(scoredText);

// Correct Answers Text -----------------------------------------------

const totalAnswers = document.querySelector(".total-answers");

const iconImage = localStorage.getItem("icon");

const titleText = localStorage.getItem("title");

const finalScore = localStorage.getItem("answers");

console.log(finalScore);

const titleAssets = document.createElement("div");
titleAssets.innerHTML = `
<div class="assets">
<img src="${iconImage}" />
<h1>${titleText}</h1>
</div>

<div class="final-score">
<h1>${finalScore}</h1>
<p>out of 10</p>
</div>
`;

totalAnswers.append(titleAssets);

//  --------------------------------------------------------------------

let totalCorrectAnswers = localStorage.getItem("answers");

// const  = document.createElement()

// Play Again Button -----------------------------------------------

const playAgain = document.querySelector(".button-next");

playAgain.addEventListener("click", () => {
  localStorage.clear();
  window.open("index.html", "_self");
});
