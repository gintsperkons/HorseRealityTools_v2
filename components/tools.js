import { storage } from "../components/storage.js";
export var tools = {
    setCurrent: function(data) {
        if (!data) return;
        document.getElementById("autoTrain").checked = data["autoTrain"];
        document.getElementById("autoCare").checked = data["autoCare"];
        document.getElementById("toolTrainPrimaryTerrainList").value = data["toolTrainPrimaryTerrainList"];
        document.getElementById("toolTrainPrimaryTimeList").value = data["toolTrainPrimaryTimeList"];
        document.getElementById("toolTrainSecondaryTerrainList").value = data["toolTrainSecondaryTerrainList"];
        document.getElementById("toolTrainSecondaryTimeList").value = data["toolTrainSecondaryTimeList"];
    },
    setListeners: function() {
        document.getElementById("autoTrain").addEventListener("change", handleCheckBoxEvents);
        document.getElementById("autoCare").addEventListener("change", handleCheckBoxEvents);

        document.getElementById("toolTrainPrimaryTerrainList").addEventListener("change", handleSelectListEvents);
        document.getElementById("toolTrainPrimaryTimeList").addEventListener("change", handleSelectListEvents);
        document.getElementById("toolTrainSecondaryTerrainList").addEventListener("change", handleSelectListEvents);
        document.getElementById("toolTrainSecondaryTimeList").addEventListener("change", handleSelectListEvents);

    },
}



function handleCheckBoxEvents(event) {
    storage.getHorseConfig(function(horseConfig) {
        if (!horseConfig) horseConfig = {};
        if (!horseConfig["tools"]) horseConfig["tools"] = {};
        horseConfig["tools"][event.target.id] = event.target.checked;
        storage.saveHorseConfig(horseConfig);
    })
    console.log(event);
};

function handleSelectListEvents(event) {
    storage.getHorseConfig(function(horseConfig) {
        if (!horseConfig) horseConfig = {};
        if (!horseConfig["tools"]) horseConfig["tools"] = {};
        horseConfig["tools"][event.target.id] = event.target.value;
        storage.saveHorseConfig(horseConfig);
    })
    console.log(event);
}