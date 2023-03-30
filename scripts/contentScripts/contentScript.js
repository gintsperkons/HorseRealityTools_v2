var horseData = {};
var randomGirlName = "";
var randomBoyName = "";

var tabContent = {
    horsePage: function(isMine) {
        if (isMine) {
            storage.getHorseRandomName("mare", function(data) {
                randomGirlName = data["name"];
            });
            storage.getHorseRandomName("stallion", function(data) {
                randomBoyName = data["name"];
            });

            storage.getHorseConfig(tools.callNeeded);
            templates.callNeeded();
        }

        //get horse data
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
        addListeners.addListeners();
    }
}




function handleDifferentPages(tabType) {
    if (tabType === "horsePage") {
        tabContent.horsePage(isMyHorse());
        keybinds.addHorsePageKeybinds();
    } else if (tabType === "stallPage") {

    } else if (tabType === "ridingschoolPage") {
        keybinds.addRidingSchoolPageKeybinds();
    } else if (tabType === "genericPage") {

    }
    keybinds.addGlobalKeybinds();
}


chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {

    sendResponse({ status: "success" });
    handleDifferentPages(obj.tabType);


});