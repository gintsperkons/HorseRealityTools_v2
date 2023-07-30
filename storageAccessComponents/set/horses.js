import { main } from "../main.js";
export var horses = {
  handleDataRequests: function (request, sendResponse) {
    if (request["type"] === "horse") {
      chrome.storage.local.get("horseData", (horseData) => {
        horseData = horseData["horseData"];
        if (!horseData) {
          horseData = {};
        }
        horseData[request["item"]] = request["data"];
        sendResponse({ status: "success" });
        chrome.storage.local.set({ horseData: horseData });
      });
    }
  },
};
