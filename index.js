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

// quiz subjects -----------------------------------------------

const subjects = document.querySelector(".quiz-subjects");

const API_URL = "https://quiz-api-topaz.vercel.app/api/v1/questions";

const quiz = async () => {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    render(data);
  } catch (error) {
    console.error(error);
  }
};

quiz();

const render = (data) => {
  for (let i = 0; i < data.length; i++) {
    const currentSubject = document.createElement("div");
    currentSubject.classList.add("icon");
    currentSubject.innerHTML = `
    <img src="${data[i].icon}" />
    <h1>${data[i].title}</h1>
    `;

    subjects.append(currentSubject);
  }

  chooseQuiz();
};

function chooseQuiz() {
  subjects.children[0].addEventListener("click", () => {
    let title = "HTML";
    localStorage.setItem("title", title);

    let icon = './assets/images/icon-html.svg"';
    localStorage.setItem("icon", icon);

    window.open("html-1.html", "_self");
  });

  subjects.children[1].addEventListener("click", () => {
    let title = "CSS";
    localStorage.setItem("title", title);

    let icon = './assets/images/icon-css.svg"';
    localStorage.setItem("icon", icon);

    window.open("html-1.html", "_self");
  });

  subjects.children[2].addEventListener("click", () => {
    let title = "JS";
    localStorage.setItem("title", title);

    let icon = './assets/images/icon-js.svg""';
    localStorage.setItem("icon", icon);

    window.open("html-1.html", "_self");
  });

  subjects.children[3].addEventListener("click", () => {
    let title = "Accessibility";
    localStorage.setItem("title", title);

    let icon = './assets/images/icon-accessibility.svg"';
    localStorage.setItem("icon", icon);

    window.open("html-1.html", "_self");
  });
}
