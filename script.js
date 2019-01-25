
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
    this.gameOver = false;

    // player state
    this.ownerScore = 0.5;
    this.natureScore = 0.5;
    this.userScore = 0.5;
    this.publicScore = 0.5;
    this.life = 100;

    this.leftButton.addEventListener("click", () => {
      this.leftClicked();
    });

    this.rightButton.addEventListener("click", () => {
      this.rightClicked();
    });

    this.draw();
  }

  update() {
    if (this.questIdx >= quests.length) {
      return;
    }

    let endText = "";
    if (this.ownerScore >= 1) {
      endText = endings[0]["owner"]["dusk"];
      this.gameOver = true;
    } else if (this.ownerScore <= 0) {
      endText = endings[0]["owner"]["dawn"];
      this.gameOver = true;
    }

    if (this.natureScore >= 1) {
      endText = endings[0]["nature"]["dusk"];
      this.gameOver = true;
    } else if (this.natureScore <= 0) {
      endText = endings[0]["nature"]["dawn"];
      this.gameOver = true;
    }

    if (this.userScore >= 1) {
      endText = endings[0]["user"]["dusk"];
      this.gameOver = true;
    } else if (this.userScore <= 0) {
      endText = endings[0]["user"]["dawn"];
      this.gameOver = true;
    }

    if (this.publicScore >= 1) {
      endText = endings[0]["public"]["dusk"];
      this.gameOver = true;
    } else if (this.publicScore <= 0) {
      endText = endings[0]["public"]["dawn"];
      this.gameOver = true;
    }

    this.questionText.textContent = endText;
  }

  draw() {
    if (this.questIdx >= quests.length) {
      return;
    } else if (this.gameOver) {
      this.leftActionText.textContent = "Ok";
      this.rightActionText.textContent = "Ok";
      return;
    }

    const text = quests[this.questIdx]["text"];
    const npc = quests[this.questIdx]["npc"];
    const choices = quests[this.questIdx]["choices"];
    const [ leftChoice, rightChoice ] = choices;
    
    this.questionText.textContent = text;
    this.authorText.textContent = npc;

    this.leftActionText.textContent = leftChoice["text"];
    this.rightActionText.textContent = rightChoice === undefined ? leftChoice["text"] : rightChoice["text"];

    this.ownerScoreText.textContent = this.ownerScore;
    this.natureScoreText.textContent = this.natureScore;
    this.userScoreText.textContent = this.userScore;
    this.publicScoreText.textContent = this.publicScore;
  }

  leftClicked() {
    console.log("left");
    if (this.questIdx >= quests.length) {
      return;
    } else if (this.gameOver) {
      this.resetGame();
      return;
    }

    const choices = quests[this.questIdx]["choices"];
    const [ leftChoice, rightChoice ] = choices;
    const impacts = leftChoice["impact"];

    this.applyScoreChanges(impacts);

    this.questIdx++;
    this.update();
    this.draw();
  }

  rightClicked() {
    console.log("right");
    if (this.questIdx >= quests.length) {
      return;
    } else if (this.gameOver) {
      this.resetGame();
      return;
    }

    const choices = quests[this.questIdx]["choices"];
    const [ leftChoice, rightChoice ] = choices;

    let impacts = null;
    if (rightChoice === undefined) {
      impacts = leftChoice["impact"];
    } else {
      impacts = rightChoice["impact"];
    }
    
    this.applyScoreChanges(impacts);

    this.questIdx++;
    this.update();
    this.draw();
  }

  resetGame() {
    this.questIdx = 0;
    this.gameOver = false;

    this.ownerScore = 0.5;
    this.natureScore = 0.5;
    this.userScore = 0.5;
    this.publicScore = 0.5;
    this.life = 100;

    this.update();
    this.draw();
  }

  applyScoreChanges(impacts) {
    this.ownerScore += impacts["owner"] === undefined ? 0 : impacts["owner"];
    this.natureScore += impacts["nature"] === undefined ? 0 : impacts["nature"];
    this.userScore += impacts["user"] === undefined ? 0 : impacts["user"];
    this.publicScore += impacts["public"] === undefined ? 0 : impacts["public"];
    this.life += impacts["life"] === undefined ? -1 : impacts["life"];
  }

}


new Game();