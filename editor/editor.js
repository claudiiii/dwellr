const addQuestBtn = document.querySelector("#add-quest");
const downloadQuestBtn = document.querySelector("#download-quest");
const deleteQuestBtn = document.querySelector("#delete-quest");
const questUpload = document.querySelector("#quest-upload");
const questList = document.querySelector("#quest-list");

const questText = document.querySelector("#quest_text");
const questAuthor = document.querySelector("#quest_author");

const choiceLeft = document.querySelector("#choice1_text");
const choiceRight = document.querySelector("#choice2_text");

const leftOwner = document.querySelector("#impact1-owner");
const rightOwner = document.querySelector("#impact2-owner");

const leftNature = document.querySelector("#impact1-nature");
const rightNature = document.querySelector("#impact2-nature");

const leftUser = document.querySelector("#impact1-user");
const rightUser = document.querySelector("#impact2-user");

const leftPublic = document.querySelector("#impact1-public");
const rightPublic = document.querySelector("#impact2-public");

const leftLife = document.querySelector("#impact1-lifepoints");
const rightLife = document.querySelector("#impact2-lifepoints");

let quests = [];

let activeQuest = null;

addQuestBtn.addEventListener("click", () => {

  addQuest({
    "text": questText.value,
    "npc": questAuthor.value,
    "choices": [
      {
        "text": choiceLeft.value,
        "impact": {
          "owner": leftOwner.value / 100,
          "nature": leftNature.value / 100,
          "user": leftUser.value / 100,
          "public": leftPublic.value / 100,
          "life": leftLife.value
        }
      },
      {
        "text": choiceRight.value,
        "impact": {
          "owner": rightOwner.value / 100,
          "nature": rightNature.value / 100,
          "user": rightUser.value / 100,
          "public": rightPublic.value / 100,
          "life": leftLife.value
        }
      }
    ]
  });

  renderQuests();
  resetForm();
});

deleteQuestBtn.addEventListener("click", () => {
  deleteQuest();
  renderQuests();
  resetForm();
});

function downloadObjectAsJson(exportObj, exportName){
  const dataStr = "data:text/javascript;charset=utf-8," + encodeURIComponent("const quests = " + JSON.stringify(exportObj) + ";");
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".js");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

downloadQuestBtn.addEventListener("click", () => {
  downloadObjectAsJson(quests, "quests")
});

function parseQuestFile(file) {
  const cleaned = file.replace("const quests = ", "").replace(";", "");
  questData = JSON.parse(cleaned);
  for (let quest of questData) {
    addQuest(quest);
  }
  renderQuests();
}

questUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    const contents = e.target.result;
    parseQuestFile(contents);
  };

  reader.readAsText(file);
});

function selectQuest(id) {
  activeQuest = id;
  const selectedQuest = quests[id];

  console.log(selectedQuest);

  questText.value = selectedQuest["text"];
  questAuthor.value = selectedQuest["npc"];

  choiceLeft.value = selectedQuest["choices"][0]["text"];
  choiceRight.value = selectedQuest["choices"][1]["text"];

  leftOwner.value = selectedQuest["choices"][0]["impact"]["owner"] * 100;
  rightOwner.value = selectedQuest["choices"][1]["impact"]["owner"] * 100;

  leftNature.value = selectedQuest["choices"][0]["impact"]["nature"] * 100;
  rightNature.value = selectedQuest["choices"][1]["impact"]["nature"] * 100;

  leftUser.value = selectedQuest["choices"][0]["impact"]["user"] * 100;
  rightUser.value = selectedQuest["choices"][1]["impact"]["user"] * 100;

  leftPublic.value = selectedQuest["choices"][0]["impact"]["public"] * 100;
  rightPublic.value = selectedQuest["choices"][0]["impact"]["public"] * 100;

  leftLife.value = ~~selectedQuest["choices"][0]["impact"]["life"];
  rightLife.value = ~~selectedQuest["choices"][0]["impact"]["life"];
}

function resetForm() {
  questText.value = "";
  questAuthor.value = "";

  choiceLeft.value = "";
  choiceRight.value = "";

  leftOwner.value = 0;
  rightOwner.value = 0;

  leftNature.value = 0;
  rightNature.value = 0;

  leftUser.value = 0;
  rightUser.value = 0;

  leftPublic.value = 0;
  rightPublic.value = 0;

  leftLife.value = -1;
  rightLife.value = -1;

  console.log(quests);
}

function addQuest(questObj) {

  if (activeQuest !== null) {
    quests.splice(activeQuest, 1);
  }

  quests.push(questObj);

  activeQuest = null;
}

function deleteQuest() {
  if (activeQuest !== null) {
    quests.splice(activeQuest, 1);
  }

  activeQuest = null;
}

function renderQuests() {
  questList.innerHTML = "";

  quests.forEach((quest, i) => {
    questList.innerHTML += `<button type="button" class="list-group-item list-group-item-action"  onclick="selectQuest(${i});">${quest["text"]}</button>`
  });
}