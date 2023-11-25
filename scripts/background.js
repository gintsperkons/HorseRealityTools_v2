import { main } from "../storageAccessComponents/main.js";

var currentHorseId = "notHorse";

const handleDataRequests = (request, sender, sendResponse) => {
  if (request["mode"] === "get") {
    main.get.handleDataRequests(request, sendResponse, currentHorseId);
    return true;
  }
  if (request["mode"] === "set") {
    main.set.handleDataRequests(request, sendResponse);
    return true;
  }
  sendResponse({ status: "missing" });
};

const callListeners = () => {
  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install" || details.reason == "update") {
      console.log("onInstall");
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, status, tab) => {
    if (
      status["status"] !== "complete" ||
      !tab.url.includes("horsereality.com")
    )
      return;

    var hasPattern = false;
    var tabType = "";

    var patternDict = {
      "horsereality.com/horses/\\d+/.*": "horsePage",
      "horsereality.com/horses/stall/.+": "stallPage",
      "horsereality.com/ridingschool": "ridingschoolPage",
      "horsereality.com/laboratory":"laboratoryPage",
      "horsereality.com/market/office/my-sales/horses/create":"sellPage",
      "horsereality.com": "genericPage"
    };

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
      chrome.tabs.sendMessage(
        tabId,
        {
          url: tab.url,
          tabType: tabType,
        },
        (response) => {
          if (response["status"] && response["status"] === "success") return;
          else console.log(response);
        }
      );
    }
  });

  chrome.tabs.onActivated.addListener(function (event) {
    chrome.tabs.get(event.tabId, function (tab) {
      currentHorseId = getHorseId(tab.url);
    });
    chrome.storage.local.get("horseData", (horseData) => {
      horseData = horseData["horseData"];
      const nowDate = Math.floor(Date.now() / 1000);
      const monthInSeconds = 2629743;
      var newDict = {};
      for (let key of Object.keys(horseData)) {
        if (!horseData[key]["lastUpdated"]) {
          continue;
        }
        if (horseData[key]["lastUpdated"] + monthInSeconds <= nowDate) {
          continue;
        }
        newDict[key] = horseData[key];
      }

      chrome.storage.local.set({ horseData: newDict });
    });
  });
  chrome.runtime.onMessage.addListener(handleDataRequests);
};

callListeners();

function getHorseId(url) {
  const pattern = RegExp("horsereality.com/horses/\\d+/.*");
  if (!pattern.test(url)) {
    return "notHorse";
  }
  return url.split("/")[4].trim();
}
