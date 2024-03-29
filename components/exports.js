import { storage } from "./storage.js";
export var exports = {
  setListeners: function () {
    const buttonList = document.getElementsByClassName("exportButton");
    for (const button of buttonList) {
      button.addEventListener("click", exportData);
    }
  },
};

function exportData(event) {
  storage.getCurrentHorse(function (response) {
    var horseId = response["id"];
    const exportConfig = event.target.getAttribute("exportconfig").split("-");
    storage.getHorseData(function (data) {
      var oneData = {};
      oneData[horseId] = data[horseId];
      if (exportConfig[0] == "JSON" && exportConfig[1] == "all") {
        exportJSON(data, "allHorses.json");
      } else if (exportConfig[0] == "JSON" && exportConfig[1] == "current") {
        if (response["id"] == "notHorse") {
          return;
        }
        exportJSON(oneData, response["id"] + ".json");
      } else if (exportConfig[0] == "CSV" && exportConfig[1] == "all") {
        exportCSV(data, "allHorses.csv");
      } else if (exportConfig[0] == "CSV" && exportConfig[1] == "current") {
        if (response["id"] == "notHorse") {
          return;
        }
        exportCSV(oneData, response["id"] + ".csv");
      }
    });
  });
}

function exportJSON(data, fileName) {
  save(data, fileName);
}

function exportCSV(data, fileName) {
  var result =
    "Name,Lifenumber,Gender,Breed,Birthday,Age,Horse height,lastUpdated,owner,ownerUrl,ownerRanch,bornRanch,bornRanchUrl,Tagline,Url," +
    "Pregnant," +
    "Current training,Current training level," +
    "Genetic potential,Acceleration,Agility,Balance,Bascule,Pulling power,Speed,Sprint,Stamina,Strength,Surefootedness,Advice,Best training," +
    "Walk,Trot,Canter,Gallop,Posture,Head,Neck,Back,Shoulders,Frontlegs,Hindquarters,Socks," +
    "Offsprings count," +
    "Fertility,Colic resistance,Hoof quality,Back problems,Respiratory disease,Resistance to lameness," +
    "\n";
  for (const key of Object.keys(data)) {
    if (data[key]) {
      result += data[key]["name"] + ",";
      result += data[key]["lifeNumber"] + ",";
      result += data[key]["gender"] + ",";
      result += data[key]["breed"] + ",";
      result += data[key]["birthDay"] + ",";
      result += data[key]["age"] + ",";
      result += data[key]["horseHeight"] + ",";
      result += timeConverter(data[key]["lastUpdated"]) + ",";
      result += data[key]["owner"] + ",";
      result += data[key]["ownerUrl"] + ",";
      result += data[key]["ownerRanch"] + ",";
      result += data[key]["bornRanch"] + ",";
      result += data[key]["bornRanchUrl"] + ",";
      result += data[key]["tagline"] + ",";
      result += data[key]["url"] + ",";
    } else {
      for (let i = 0; i < 14; i++) {
        result += "undefined" + ",";
      }
    }
    if (data[key]["summary"]) {
      result += (data[key]["summary"]["pregnant"] ? data[key]["summary"]["pregnant"].replaceAll(",", "") : "undefined");
      result +=  ",";
    } else {
      for (let i = 0; i < 1; i++) {
        result += "undefined" + ",";
      }
    }
    if (data[key]["training"]) {
      result += data[key]["training"]["currentTraining"] + ",";
      result += data[key]["training"]["currentTrainingLevel"] + ",";
    } else {
      for (let i = 0; i < 2; i++) {
        result += "undefined" + ",";
      }
    }
    if (data[key]["genetics"]) {
      result += data[key]["genetics"]["geneticPotential"] + ",";
      result += data[key]["genetics"]["acceleration"] + ",";
      result += data[key]["genetics"]["agility"] + ",";
      result += data[key]["genetics"]["balance"] + ",";
      result += data[key]["genetics"]["bascule"] + ",";
      result += data[key]["genetics"]["pullingPower"] + ",";
      result += data[key]["genetics"]["speed"] + ",";
      result += data[key]["genetics"]["sprint"] + ",";
      result += data[key]["genetics"]["stamina"] + ",";
      result += data[key]["genetics"]["strength"] + ",";
      result += data[key]["genetics"]["surefootedness"] + ",";
      result += (data[key]["genetics"]["advice"] ? data[key]["genetics"]["advice"].replaceAll(",", "") : "undefined") + ",";
      result += data[key]["genetics"]["bestTraining"] + ",";
    } else {
      for (let i = 0; i < 13; i++) {
        result += "undefined" + ",";
      }
    }
    if (data[key]["achievements"]) {
      result += data[key]["achievements"]["walk"] + ",";
      result += data[key]["achievements"]["trot"] + ",";
      result += data[key]["achievements"]["canter"] + ",";
      result += data[key]["achievements"]["gallop"] + ",";
      result += data[key]["achievements"]["posture"] + ",";
      result += data[key]["achievements"]["head"] + ",";
      result += data[key]["achievements"]["neck"] + ",";
      result += data[key]["achievements"]["back"] + ",";
      result += data[key]["achievements"]["shoulders"] + ",";
      result += data[key]["achievements"]["frontlegs"] + ",";
      result += data[key]["achievements"]["hindquarters"] + ",";
      result += data[key]["achievements"]["socks"] + ",";
    } else {
      for (let i = 0; i < 12; i++) {
        result += "undefined" + ",";
      }
    }
    if (data[key]["offsprings"]) {
      result += data[key]["offsprings"]["count"] + ",";
    } else {
      for (let i = 0; i < 1; i++) {
        result += "undefined" + ",";
      }
    }
    if (data[key]["health"]) {
      result += data[key]["health"]["fertility"] + ",";
      result += data[key]["health"]["colicResistance"] + ",";
      result += data[key]["health"]["hoofQuality"] + ",";
      result += data[key]["health"]["backProblems"] + ",";
      result += data[key]["health"]["respiratoryDisease"] + ",";
      result += data[key]["health"]["resistanceToLameness"] + ",";
    } else {
      for (let i = 0; i < 6; i++) {
        result += "undefined" + ",";
      }
    }
    result += "\n";
  }
  save(result, fileName);
}

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

function save(data, filename) {
  (function (console) {
    console.save = function (data, filename) {
      if (!data) {
        console.error("Console.save: No data");
        return;
      }

      if (!filename) filename = "console.json";

      if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4);
      }

      var blob = new Blob([data], { type: "text/json" }),
        e = document.createEvent("MouseEvents"),
        a = document.createElement("a");

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    };
  })(console);
  console.save(data, filename);
}
