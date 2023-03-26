var horseData = {};
var randomGirlName = "";
var randomBoyName = "";



chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    sendResponse({ status: "success" });
    storage.getHorseRandomName("mare", function(data) {
        randomGirlName = data["name"];
    });
    storage.getHorseRandomName("stallion", function(data) {
        randomBoyName = data["name"];
    });
    storage.getHorseConfig(tools.callNeeded);
    storage.getHorseData(document.getElementById("hid").value.trim(), function(data) {
        const temp = horseData;
        horseData = Object.assign({}, temp, data);
    });

    getHorseData.getTabDataBase("overAll");
    var intervalVal = setInterval(() => {
        for (const tabData of document.getElementsByClassName("tabtext")) {
            if (tabData.textContent.trim() != "") {
                clearInterval(intervalVal);
                getHorseData.getTabDataBase(tabData.id);
            }
        }
    }, 500);
    keybinds.callNeeded();
    templates.callNeeded();

    addListeners.addListeners();

});