import { Quote } from "./Quote.js";

class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: "dr house",
      category: "SERIALE",
    },
    {
      text: "bing bang theory",
      category: "SERIALE",
    },
    {
      text: "game of thrones",
      category: "SERIALE",
    },
    {
      text: "friends",
      category: "SERIALE",
    },
    {
      text: "cobra kai",
      category: "SERIALE",
    },
    {
      text: "eurobusiness",
      category: "GRA PLANSZOWA",
    },
    {
      text: "tajniacy",
      category: "GRA PLANSZOWA",
    },
    {
      text: "splendor",
      category: "GRA PLANSZOWA",
    },
    {
      text: "ticket to ride",
      category: "GRA PLANSZOWA",
    },
    {
      text: "podaj dalej",
      category: "GRA PLANSZOWA",
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;

    const { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 1;
      if (this.currentStep == this.lastStep) {
        this.loosing();
      }
    }
  }
  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const babel = (10).toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.style.color = "white";
      button.addEventListener("click", (event) => this.guess(label, event));
      button.addEventListener("click", () => {
        button.style.color = "gray";
        button.style.border = "none";
        button.style.transform = "none";
      });

      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if (!content.includes("_")) {
      this.winning();
    }
  }

  start() {
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
  }
  winning() {
    this.wordWrapper.innerHTML = "GRATULACJE, WYGRAŁEŚ! KONIEC GRY";
    this.lettersWrapper.innerHTML = "";
    btn.style.display = "block";
  }
  loosing() {
    this.wordWrapper.innerHTML = "NIESTETY, PRZEGRAŁEŚ! KONIEC GRY";
    this.lettersWrapper.innerHTML = "";
    btn.style.display = "block";
  }
}
const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});

game.start();

const btn = document.getElementById("start");
btn.addEventListener("click", () => {
  location.reload();
});
