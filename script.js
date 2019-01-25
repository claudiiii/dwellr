
class Game {

  constructor() {
    this.leftButton = document.querySelector("#left");
    this.rightButton = document.querySelector("#right");

    this.ownerScoreText = document.querySelector("#owner").querySelector(".score");
    this.natureScoreText = document.querySelector("#nature").querySelector(".score");
    this.userScoreText = document.querySelector("#user").querySelector(".score");
    this.publicScoreText = document.querySelector("#public").querySelector(".score");

    this.questionText = document.querySelector("#question"); 
    
    this.leftActionText = document.querySelector("#left").querySelector(".action"); 
    this.rightActionText = document.querySelector("#right").querySelector(".action");

    this.authorText = document.querySelector("#author");
    this.profileText = document.querySelector("#profile");

    // general game state
    this.questIdx = 0;

    // player state
    this.ownerScore = 0.5;
    this.natureScore = 0.5;
    this.userScore = 0.5;
    this.publicScore = 0.5;

    this.leftButton.addEventListener("click", () => {
      this.leftClicked();
    });

    this.rightButton.addEventListener("click", () => {
      this.rightClicked();
    });

    this.fillQuests();
  }

  fillQuests() {
    const text = quests[this.questIdx]["text"];
    const npc = quests[this.questIdx]["npc"];
    const choices = quests[this.questIdx]["choices"];
    const [ leftChoice, rightChoice ] = choices;
    
    this.questionText.textContent = text;
    this.authorText.textContent = npc;

    this.leftActionText.textContent = leftChoice["text"];
    this.rightActionText.textContent = rightChoice["text"];
  }

  leftClicked() {
    console.log("left");
  }

  rightClicked() {
    console.log("right");
  }

}


new Game();