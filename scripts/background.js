horseData = {};
horseConfig = {};

const saveHorseConfig = () => {
    chrome.storage.sync.set({ "horseConfig": horseConfig }).then(() => {
        chrome.storage.sync.get("horseConfig", setHorseConfig);
    });
}

const saveHorseData = () => {
    chrome.storage.local.set({ "horseData": horseData }).then(() => {
        chrome.storage.local.get("horseData", setHorseData);
    });
}

const setHorseConfig = (config) => {
    if (!config["horseConfig"]) {
        horseConfig = {};
        return;
    }
    horseConfig = config["horseConfig"];

}
const setHorseData = (data) => {
    if (!data["horseData"]) {
        horseData = {};
        return;
    }
    horseData = data["horseData"];
}

const getHorseItem = (item) => {
    return horseData[item];
}

const setHorseItem = (item, data) => {
    horseData[item] = data;
    saveHorseData();
}


const handleDataRequests = (request, sender, sendResponse) => {
    if (request["mode"] === "get" && request["type"] === "horse") {
        sendResponse(getHorseItem(request["item"]));
        return;
    }
    if (request["mode"] === "set" && request["type"] === "horse") {
        setHorseItem(request["item"], request["data"]);
        sendResponse({ "status": "success" });
        return;
    }
    if (request["mode"] === "get" && request["type"] === "config") {
        sendResponse(horseConfig);
        return;
    }
    if (request["mode"] === "set" && request["type"] === "config") {
        setHorseConfig({ "horseConfig": request["data"] });
        sendResponse({ "status": "success" });
        return;
    }
    console.log(request);
    sendResponse({ "data": "dada" });
}



const callListeners = () => {
    chrome.runtime.onInstalled.addListener(function(details) {
        if (details.reason == "install") {

            chrome.storage.sync.get("horseConfig", setHorseConfig);
            chrome.storage.local.get("horseData", setHorseData);
        } else if (details.reason == "update") {

            chrome.storage.sync.get("horseConfig", setHorseConfig);
            chrome.storage.local.get("horseData", setHorseData);
        }
    });


    chrome.tabs.onUpdated.addListener((tabId, status, tab) => {


        if (status["status"] !== "complete" || !tab.url.includes("horsereality.com")) {
            return;
        }
        chrome.storage.sync.get("horseConfig", setHorseConfig);
        chrome.storage.local.get("horseData", setHorseData);

        let pattern = new RegExp("horsereality.com/horses/\\d+/.*");
        if (pattern.test(tab.url)) {
            chrome.tabs.sendMessage(tabId, {
                url: tab.url
            }, (response) => {
                console.log(response);
                if (response["status"] && response["status"] === "success") return;
                else console.log(response);
            });
        }


    });
    chrome.runtime.onMessage.addListener(handleDataRequests);

}

callListeners();