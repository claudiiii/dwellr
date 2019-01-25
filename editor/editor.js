const addQuestBtn = document.querySelector("#add-quest");
const downloadQuestBtn = document.querySelector("#download-quest");

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

const quests = [];

addQuestBtn.addEventListener("click", () => {

  quests.push({
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