import { main } from "../storageAccessComponents/main.js";

var horseData = {};
var horseConfig = {};
var currentHorseId = "notHorse";

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

const handleDataRequests = (request, sender, sendResponse) => {

    if (request["mode"] === "get") {
        main.get.handleDataRequests(request, sendResponse, horseData, horseConfig, currentHorseId);
        return;
    }
    if (request["mode"] === "set") {
        main.set.handleDataRequests(request, sendResponse, horseData, horseConfig, setHorseData, setHorseConfig);
        return;
    }
    console.log(request);
    sendResponse({ "status": "missing" });
}






const callListeners = () => {
    chrome.runtime.onInstalled.addListener(function(details) {
        if (details.reason == "install" || details.reason == "update") {

            chrome.storage.sync.get("horseConfig", setHorseConfig);
            chrome.storage.local.get("horseData", setHorseData);
        }
    });

    chrome.tabs.onUpdated.addListener((tabId, status, tab) => {

        if (status["status"] !== "complete" || !tab.url.includes("horsereality.com")) return;

        chrome.storage.sync.get("horseConfig", setHorseConfig);
        chrome.storage.local.get("horseData", setHorseData);

        var hasPattern = false;
        var tabType = "";

        var patternDict = { "horsereality.com/horses/\\d+/.*": "horsePage" }

        for (let [key, value] of Object.entries(patternDict)) {
            var pattern = new RegExp(key);
            if (pattern.test(tab.url)) {
                tabType = value;
                hasPattern = true;
                break;
            }
        }

        currentHorseId = getHorseId(tab.url);
        if (hasPattern) {
            chrome.tabs.sendMessage(tabId, {
                url: tab.url,
                tabType: tabType
            }, (response) => {
                if (response["status"] && response["status"] === "success") return;
                else console.log(response);
            });
        }


    });

    chrome.tabs.onActivated.addListener(function(event) {
        chrome.tabs.get(event.tabId, function(tab) {
            currentHorseId = getHorseId(tab.url);
        });
        const nowDate = Math.floor(Date.now() / 1000);
        const monthInSeconds = 2629743;
        var newDict = {}
        for (let key of Object.keys(horseData)) {
            if (!horseData[key]["lastUpdated"]) {
                continue;
            }
            if ((horseData[key]["lastUpdated"] + monthInSeconds <= nowDate)) {
                continue;
            }
            newDict[key] = horseData[key];
        }
        setHorseData({ "horseData": newDict });

    });
    chrome.runtime.onMessage.addListener(handleDataRequests);

}

callListeners();



function getHorseId(url) {
    const pattern = RegExp("horsereality.com/horses/\\d+/.*");
    if (!pattern.test(url)) {
        return "notHorse";
    }
    return url.split("/")[4].trim();
}