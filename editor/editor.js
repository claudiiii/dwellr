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

const constraints = {
  life : {
    min : document.querySelector("#min-lifepoints"),
    max : document.querySelector("#max-lifepoints")
  },
  age : {
    min : document.querySelector("#min-age"),
    max : document.querySelector("#max-age")
  },
  owner : {
    min : document.querySelector("#min-owner"),
    max : document.querySelector("#max-owner")
  },
  nature : {
    min : document.querySelector("#min-nature"),
    max : document.querySelector("#max-nature")
  },
  user : {
    min : document.querySelector("#min-user"),
    max : document.querySelector("#max-user")
  },
  public : {
    min : document.querySelector("#min-public"),
    max : document.querySelector("#max-public")
  }
};

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
    ],
    "language": "DE",
    "constraints": {
      "life":{
        "min": constraints.life.min.value,
        "max": constraints.life.max.value
      },
      "age":{
        "min": constraints.age.min.value,
        "max": constraints.age.max.value
      },
      "owner":{
        "min": constraints.owner.min.value / 100,
        "max": constraints.owner.max.value / 100
      },
      "nature":{
        "min": constraints.nature.min.value / 100,
        "max": constraints.nature.max.value / 100
      },
      "user":{
        "min": constraints.user.min.value / 100,
        "max": constraints.user.max.value / 100
      },
      "public":{
        "min": constraints.public.min.value / 100,
        "max": constraints.public.max.value / 100
      }
    }
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

  if(selectedQuest["constraints"] != null){
    constraints.life.min.value = selectedQuest["constraints"]["life"]["min"];
    constraints.life.max.value = selectedQuest["constraints"]["life"]["max"];
    constraints.age.min.value = selectedQuest["constraints"]["age"]["min"];
    constraints.age.max.value = selectedQuest["constraints"]["age"]["max"];
    constraints.owner.min.value = selectedQuest["constraints"]["owner"]["min"] * 100;
    constraints.owner.max.value = selectedQuest["constraints"]["owner"]["max"] * 100;
    constraints.nature.min.value = selectedQuest["constraints"]["nature"]["min"] * 100;
    constraints.nature.max.value = selectedQuest["constraints"]["nature"]["max"] * 100;
    constraints.user.min.value = selectedQuest["constraints"]["user"]["min"] * 100;
    constraints.user.max.value = selectedQuest["constraints"]["user"]["max"] * 100;
    constraints.public.min.value = selectedQuest["constraints"]["public"]["min"] * 100;
    constraints.public.max.value = selectedQuest["constraints"]["public"]["max"] * 100;
  }else{
    resetForm();
  }

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
  rightPublic.value = selectedQuest["choices"][1]["impact"]["public"] * 100;

  leftLife.value = ~~selectedQuest["choices"][0]["impact"]["life"];
  rightLife.value = ~~selectedQuest["choices"][1]["impact"]["life"];
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

  constraints.life.min.value = 0;
  constraints.life.max.value = 1000;
  constraints.age.min.value = 0;
  constraints.age.max.value = 1000;
  constraints.owner.min.value = 0;
  constraints.owner.max.value = 100;
  constraints.nature.min.value = 0;
  constraints.nature.max.value = 100;
  constraints.user.min.value = 0;
  constraints.user.max.value = 100;
  constraints.public.min.value = 0;
  constraints.public.max.value = 100;

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