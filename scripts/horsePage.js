horseData = {};

const saveHorseData = () => {
    chrome.runtime.sendMessage({
        "mode": "set",
        "type": "horse",
        "item": document.getElementById("hid").value.trim(),
        "data": horseData
    }, function(response) {});
}

const getHorseData = () => {
    chrome.runtime.sendMessage({
        "mode": "get",
        "type": "horse",
        "item": document.getElementById("hid").value.trim(),
    }, function(response) {
        horseData = response;
        console.log(horseData);
    });
}


chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    sendResponse({ status: "success" });
    saveHorseData();
    getHorseData();
    console.log(obj);

});