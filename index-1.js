const htmlElement = document.querySelector("[data-theme]");

let dataTheme = document.querySelector(".btn");

let isDarkMode = false;

function newTheme() {
  dataTheme.addEventListener("click", () => {
    if (!isDarkMode) {
      isDarkMode = true;
      htmlElement.setAttribute("data-theme", "dark");
      dataTheme.classList.add("next-btn");
      localStorage.setItem("theme", JSON.stringify(isDarkMode));
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

// API ----------------------------------------------------------

const subjects = document.querySelector(".quiz-subjects");

const API_URL = "https://quiz-api-topaz.vercel.app/api/v1/questions";

let question = document.querySelector(".question-span");

let q = document.querySelector(".question-span");

let questionNumber = document.querySelector(".question-p");

const submitAnswer = document.querySelector(".button-next");

let progress = document.querySelector(".progress");

const progressBar = document.querySelector(".progress-bar");

const frontEndQuiz = document.querySelector(".description-h1");

//  questions / next question ------------------------------------------

let correctAnsweresCounter = 0;

let correctAnsCount = localStorage.getItem("answers");

correctAnsweresCounter = correctAnsCount;

let arrCounter = 0;
submitAnswer.addEventListener("click", () => {
  arrCounter++;
  localStorage.setItem("counter", arrCounter);
  document.location.reload();
});

let newCounter = localStorage.getItem("counter");

if (newCounter) {
  arrCounter = newCounter;
  switch (newCounter) {
    case "1":
      progressBar.setAttribute("value", "20");
      break;
    case "2":
      progressBar.setAttribute("value", "30");
      break;
    case "3":
      progressBar.setAttribute("value", "40");
      break;
    case "4":
      progressBar.setAttribute("value", "50");
      break;
    case "5":
      progressBar.setAttribute("value", "60");
      break;
    case "6":
      progressBar.setAttribute("value", "70");
      break;
    case "7":
      progressBar.setAttribute("value", "80");
      break;
    case "8":
      progressBar.setAttribute("value", "90");
      break;
    case "9":
      progressBar.setAttribute("value", "100");
      break;
  }
} else {
  arrCounter = 0;
}

// answers ------------------------------------------------

let answersRender = (data) => {
  let arr = [];

  for (let i = 0; i < data.length; i++) {
    let dataTitle = localStorage.getItem("title");

    if (dataTitle === "HTML") {
      arr.push(data[0]);
    } else if (dataTitle === "CSS") {
      arr.push(data[1]);
    } else if (dataTitle === "JS") {
      arr.push(data[2]);
    } else if (dataTitle === "Accessibility") {
      arr.push(data[3]);
    }
  }

  //  answers counter / result window forwarding -----------------

  for (let j = 0; j < arr.length; j++) {
    let variant = "";
    if (j === 0) {
      variant = "A";
    } else if (j === 1) {
      variant = "B";
    } else if (j === 2) {
      variant = "C";
    } else if (j === 3) {
      variant = "D";
    }

    if (arrCounter < 10) {
      const currentAnswer = document.createElement("div");
      currentAnswer.classList.add("icon");
      currentAnswer.innerHTML = `
      <p>${variant}</p>
      `;
      subjects.append(currentAnswer);

      const answerText = document.createElement("h1");
      answerText.textContent = arr[j].questions[arrCounter].options[j];
      currentAnswer.append(answerText);
    } else {
      window.open("final-results.html", "_self");
    }
  }

  // question ---------------------------------------------

  for (let k = 0; k < arr.length - 3; k++) {
    const currentQuestion = document.createElement("span");
    currentQuestion.innerHTML = arr[k].questions[arrCounter].question;
    q.append(currentQuestion);

    let questionNumbertext = `
    Question ${+arrCounter + 1} of 10
    `;
    questionNumber.append(questionNumbertext);
  }

  let answers = document.querySelectorAll(".icon");

  let correctAnswer = "";

  for (let l = 0; l < arr.length - 3; l++) {
    correctAnswer = arr[l].questions[arrCounter].answer;
  }

  //  answers comparison --------------------------------------------

  for (let m = 0; m < answers.length; m++) {
    answers[m].addEventListener("click", () => {
      if (answers[m].children[1].textContent === correctAnswer) {
        answers[m].classList.add("correct-answer");
        subjects.style.pointerEvents = "none";
        correctAnsweresCounter++;
        localStorage.setItem("answers", correctAnsweresCounter);
      } else {
        answers[m].classList.add("wrong-answer");
        subjects.style.pointerEvents = "none";
      }
    });
  }
};

const quiz = async () => {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    answersRender(data);
    // render(data);
  } catch (error) {
    console.error(error);
  }
};

quiz();
