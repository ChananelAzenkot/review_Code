// create container div and let name it container//
const container = document.createElement("div");
container.classList.add("container");

// create div element and let name it divElement//
const divElement = document.createElement("div");
divElement.classList.add("card", "card_enter");

// posh container inside the page body//
document.body.appendChild(container);

// let counter mission start from 1//
let missions = [0];

// push for every mission key and value to the array//
if (localStorage.length > 0) {
  Object.keys(localStorage)
    .sort()
    .forEach(function (key) {
      missions.push(JSON.parse(localStorage.getItem(key)));
    });
}
showMissions();

const btnenter = document.getElementById("btnenter");

btnenter.addEventListener("click", () => {
  writeMissionOnScreen({ keyCode: "13" });
});

// take the value from the input and push it to the array//
function writeMissionOnScreen(eventDataFromBrowser) {
  if (eventDataFromBrowser.keyCode == "13") {
    const textBox = document.getElementById("txtMission");
    const currentDate = new Date()
      .toLocaleDateString("he-IL", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
      .replaceAll("/", ".");
    const mission = {
      date: currentDate,
      text: textBox.value.trim(),
    };
    missions.push(mission);
    textBox.value = "";
    saveMissions();
    showMissions();
  }
}
// clear all missions from the array//
function clearAllMissions() {
  localStorage.clear();
  missions = [0];
  showMissions();
}
// edit you mission in the page //
function editMission(index) {
  const bigedit = document.createElement("div");
  const fiximiss = document.createElement("input");
  const no = document.createElement("div");
  const yes = document.createElement("div");
  no.classList.add("no");
  yes.classList.add("yes");
  no.textContent = "no";
  yes.textContent = "yes";
  bigedit.classList.add("bigedit");
  document.body.appendChild(bigedit);
  bigedit.innerHTML = `Do You Want To Edit The Task ?`;
  document.getElementById("blur").style.display = "block";

  bigedit.appendChild(yes);
  bigedit.appendChild(no);
  bigedit.appendChild(fiximiss);
  fiximiss.classList.add("fiximiss");
  fiximiss.value = missions[index].text;
  fiximiss.addEventListener("keyup", () => {
    if (fiximiss.value.trim().length > 0) {
      missions[index] = {
        date: missions[index].date,
        text: fiximiss.value.trim(),
      };
    }
  });

  yes.addEventListener("click", () => {
    bigedit.style.display = "none";
    showMissions();
    saveMissions();
    document.getElementById("blur").style.display = "none";
  });
  no.addEventListener("click", () => {
    bigedit.style.display = "none";
    document.getElementById("blur").style.display = "none";
  });
}

// delete all  mission from the page//
function deleteMission(index) {
  missions.splice(index, 1);
  showMissions();
}

function completeMission(index) {
  missions[index].completed = !missions[index].completed;
  showMissions();
}

function showMissions() {
  container.innerHTML = "";
  const incompleteMissions = [];
  const completedMissions = [];
  for (let i = 1; i < missions.length; i++) {
    const mission = missions[i];
    const divElement = document.createElement("div");
    divElement.classList.add("card", "card_enter");
    divElement.innerHTML += `
      ${i}. ${mission.date} - ${mission.text} 
      <button id="btnF" onclick="deleteMission(${i})"> ❌ </button>
      <button id="btnF" onclick="completeMission(${i})"> ✅ </button>
      <button id="btnF" onclick="editMission(${i})"> 🖋️ </button>
      <br>
    `;
    if (mission.completed) {
      divElement.classList.add("completed");
      completedMissions.push(divElement);
    } else {
      incompleteMissions.push(divElement);
    }
  }
  incompleteMissions.forEach((mission) => container.appendChild(mission));
  completedMissions.forEach((mission) => container.appendChild(mission));
  saveMissions();
}

// save all missions in the local storage//
function saveMissions() {
  localStorage.clear();
  for (let i = 1; i < missions.length; i++) {
    const mission = missions[i];
    localStorage.setItem(i, JSON.stringify(mission));
  }
}
