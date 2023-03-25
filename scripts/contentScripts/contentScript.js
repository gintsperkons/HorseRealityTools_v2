var horseData = {};





chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    sendResponse({ status: "success" });
    //storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
    storage.getHorseData(document.getElementById("hid").value.trim(), function(response) { console.log(response); });
    storage.getHorseRandomName("stallion", function(response) { console.log(response); });

});