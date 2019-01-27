class Game {

  constructor() {
    this.leftButton = document.querySelector("#left");
    this.rightButton = document.querySelector("#right");

    this.ownerScoreProgressBar = document.querySelector("#ownerScore").querySelector(".score");
    this.natureScoreText = document.querySelector("#nature").querySelector(".score");
    this.userScoreText = document.querySelector("#user").querySelector(".score");
    this.publicScoreText = document.querySelector("#public").querySelector(".score");

    this.questionText = document.querySelector("#question");
    
    this.leftActionText = document.querySelector("#left").querySelector(".action"); 
    this.rightActionText = document.querySelector("#right").querySelector(".action");

    this.authorText = document.querySelector("#author");
    this.profileText = document.querySelector("#profile");

    this.profileText.textContent = "Das Haus am See"

    this.quests = quests.slice();

    // general game state
    this.activeQuest = null;
    this.gameOver = false;

    // player state
    this.ownerScore = 0.5;
    this.natureScore = 0.5;
    this.userScore = 0.5;
    this.publicScore = 0.5;
    this.life = 100;
    this.age = 0;

    this.leftButton.addEventListener("click", () => {
      this.leftClicked();
    });

    this.rightButton.addEventListener("click", () => {
      this.rightClicked();
    });

    this.update();
    this.draw();
  }

  update() {
    if (this.quests.length <= 0) {
      this.activeQuest = null;
    } else {
      const rndIdx = this.getRandomInt(0, this.quests.length);
      this.activeQuest = this.quests[rndIdx];
      this.quests.splice(rndIdx, 1)
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

    // wenn life <= 0 -> gameOver
    if (this.life <= 0) {
      endText = endings[0]["life"];
      this.gameOver = true;
    }

    if (this.quests.length <= 0) {
      endText = endings[0]["life"];
      this.gameOver = true;
    }

    this.age += 1;
    this.questionText.textContent = endText;
  }

  draw() {
    if (this.gameOver) {
      this.leftActionText.textContent = "Ok";
      this.rightActionText.textContent = "Ok";
      return;
    }

    const text = this.activeQuest["text"];
    const npc = this.activeQuest["npc"];
    const choices = this.activeQuest["choices"];
    const [ leftChoice, rightChoice ] = choices;
    
    this.questionText.textContent = text;
    this.authorText.textContent = npc;
    this.profileText.textContent = this.age + (this.age === 1 ? " Year" : " Years");

    this.leftActionText.textContent = leftChoice["text"];
    this.rightActionText.textContent = rightChoice === undefined ? leftChoice["text"] : rightChoice["text"];

    this.ownerScoreProgressBar.setAttribute("offset", this.ownerScore);
    this.natureScoreText.textContent = this.natureScore;
    this.userScoreText.textContent = this.userScore;
    this.publicScoreText.textContent = this.publicScore;
  }

  leftClicked() {
    if (this.gameOver) {
      this.resetGame();
      return;
    }

    const choices = this.activeQuest["choices"];
    const [ leftChoice, rightChoice ] = choices;
    const impacts = leftChoice["impact"];

    this.applyScoreChanges(impacts);

    this.update();
    this.draw();
  }

  rightClicked() {
    if (this.gameOver) {
      this.resetGame();
      return;
    }

    const choices = this.activeQuest["choices"];
    const [ leftChoice, rightChoice ] = choices;

    let impacts = null;
    if (rightChoice === undefined) {
      impacts = leftChoice["impact"];
    } else {
      impacts = rightChoice["impact"];
    }
    
    this.applyScoreChanges(impacts);

    this.update();
    this.draw();
  }

  resetGame() {
    this.quests = quests.slice();

    this.activeQuest = null;
    this.gameOver = false;

    this.ownerScore = 0.5;
    this.natureScore = 0.5;
    this.userScore = 0.5;
    this.publicScore = 0.5;
    this.life = 100;

    this.age = 0;

    this.update();
    this.draw();
  }

  applyScoreChanges(impacts) {
    this.ownerScore = this.roundToTwo(
      this.ownerScore + (impacts["owner"] === undefined ? 0 : impacts["owner"]));
    this.natureScore = this.roundToTwo(
      this.natureScore + (impacts["nature"] === undefined ? 0 : impacts["nature"]));
    this.userScore = this.roundToTwo(
      this.userScore + (impacts["user"] === undefined ? 0 : impacts["user"]));
    this.publicScore = this.roundToTwo(
      this.publicScore + (impacts["public"] === undefined ? 0 : impacts["public"]));
    this.life += this.roundToTwo(impacts["life"] === undefined ? -1 : impacts["life"]);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
  }
}


new Game();