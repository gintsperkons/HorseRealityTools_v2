import { storage } from "../components/storage.js";
var toolsData = {}
export var tools = {
  setCurrent: function (data) {
    setPriceData(data);


    if (!data) return;
    document.getElementById("autoTrain").checked = data["autoTrain"];
    document.getElementById("autoCare").checked = data["autoCare"];
    document.getElementById("autoAllTabs").checked = data["autoAllTabs"];
    document.getElementById("toolTrainPrimaryTerrainList").value =
      data["toolTrainPrimaryTerrainList"];
    document.getElementById("toolTrainPrimaryTimeList").value =
      data["toolTrainPrimaryTimeList"];
    document.getElementById("toolTrainSecondaryTerrainList").value =
      data["toolTrainSecondaryTerrainList"];
    document.getElementById("toolTrainSecondaryTimeList").value =
      data["toolTrainSecondaryTimeList"];
    document.getElementById("saleDefaultDurationList").value =
      data["saleDefaultDurationList"];
    document.getElementById("autoPriceFill").checked = data["autoPriceFill"];
    document.getElementById("ageColorSelect").value = data["ageColorSelect"];
    document.getElementById("minAge").value = data["minAge"];
    document.getElementById("maxAge").value = data["maxAge"];

  },
  setListeners: function () {
    document
      .getElementById("autoTrain")
      .addEventListener("change", handleCheckBoxEvents);
    document
      .getElementById("autoCare")
      .addEventListener("change", handleCheckBoxEvents);
    document
      .getElementById("autoAllTabs")
      .addEventListener("change", handleCheckBoxEvents);

    document
      .getElementById("toolTrainPrimaryTerrainList")
      .addEventListener("change", handleSelectListEvents);
    document
      .getElementById("toolTrainPrimaryTimeList")
      .addEventListener("change", handleSelectListEvents);
    document
      .getElementById("toolTrainSecondaryTerrainList")
      .addEventListener("change", handleSelectListEvents);
    document
      .getElementById("toolTrainSecondaryTimeList")
      .addEventListener("change", handleSelectListEvents);
    document
      .getElementById("saleDefaultDurationList")
      .addEventListener("change", handleSelectListEvents);
    document
      .getElementById("autoPriceFill")
      .addEventListener("change", handleCheckBoxEvents);

    document
      .getElementById("ageColorSelect")
      .addEventListener("change", handleSelectAgeColorEvents);
    document
      .getElementById("minAge")
      .addEventListener("input", handleAgeNumEvents);
    document
      .getElementById("maxAge")
      .addEventListener("input", handleAgeNumEvents);
    document.getElementById("breedList").addEventListener("change", breedListChange);
  },
};



const breedListChange = () => {
  let breedBasePriceSettings = toolsData["breedBasePriceSettings"]
  let breedListValue = document.getElementById("breedList").value;
  Object.keys(breedBasePriceSettings[breedListValue]).forEach(setting => {
    document.getElementById("breedBase_" + setting).value = breedBasePriceSettings[document.getElementById("breedList").value][setting]
    document.getElementById("breedBase_" + setting).addEventListener("input", handleBreedBasePriceSettingEvents);
  });
  saveBreedBasePriceSettings(breedBasePriceSettings);
}

const setPriceData = (toolData) => {
  let template = { price: 10000, gp: 500, gpPower: 2.5, stallionMp: 0, mareMp: 0.25, gPower: 1.6, vg: 1500, g: 500, a: 250 };
  toolsData = toolData;

  let breedBasePriceSettings = toolsData["breedBasePriceSettings"]
  if (!breedBasePriceSettings) {
    breedBasePriceSettings = {};
  }
  storage.getHorseData(function (data) {
    let breedList = new Set();
    Object.keys(data).forEach(horseID => {
      breedList.add(data[horseID]["breed"])
    });
    breedList.forEach(breed => {
      let optionItem = document.createElement("option");
      optionItem.value = breed;
      optionItem.textContent = breed;
      document.getElementById("breedList").appendChild(optionItem);
      if (!breedBasePriceSettings[breed]) {
        breedBasePriceSettings[breed] = template;
      }
    });
    breedListChange();
  });
}

function handleCheckBoxEvents(event) {
  storage.saveHorseToolSettings([{ "name": event.target.id, "data": event.target.checked }]);
}

function handleSelectListEvents(event) {
  console.log(event.target.id, event.target.value)
  storage.saveHorseToolSettings([{ "name": event.target.id, "data": event.target.value }]);
}

function handleSelectAgeColorEvents(event) {
  storage.saveHorseToolSettings([{ "name": event.target.id, "data": event.target.value }]);
}

function handleAgeNumEvents(event) {
  storage.saveHorseToolSettings([{ "name": event.target.id, "data": event.target.value }]);
}

function handleBreedBasePriceSettingEvents(event) {
  let breedBasePriceSettings = toolsData["breedBasePriceSettings"]
  breedBasePriceSettings[document.getElementById("breedList").value][event.target.id.replace("breedBase_", "")] = parseInt(event.target.value);
  saveBreedBasePriceSettings(breedBasePriceSettings);
}

function saveBreedBasePriceSettings(data) {
  storage.saveHorseToolSettings([{ "name": "breedBasePriceSettings", "data": data }]);
}
