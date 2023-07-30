import { storage } from "../components/storage.js";
export var tools = {
  setCurrent: function (data) {
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
      .getElementById("ageColorSelect")
      .addEventListener("change", handleSelectAgeColorEvents);
    document
      .getElementById("minAge")
      .addEventListener("input", handleAgeNumEvents);
    document
      .getElementById("maxAge")
      .addEventListener("input", handleAgeNumEvents);
  },
};

function handleCheckBoxEvents(event) {
  storage.saveHorseToolSettings([{"name":event.target.id, "data":event.target.checked}]);
}

function handleSelectListEvents(event) {
  storage.saveHorseToolSettings(event.target.id, event.target.value);
}

function handleSelectAgeColorEvents(event) {
  storage.saveHorseToolSettings(event.target.id, event.target.value);
}

function handleAgeNumEvents(event) {
  storage.saveHorseToolSettings(event.target.id, event.target.value);
}
