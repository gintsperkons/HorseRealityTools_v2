import { main } from "../main.js";
export var horses = {
  handleDataRequests: function (request, sendResponse, currentHorseId) {
    chrome.storage.local.get("horseData", (horseData) => {
      horseData = horseData["horseData"];
      if (!horseData) {
        horseData = {};
      }
      if (request["type"] === "horse") {
        if (request["item"] && request["item"] === "current") {
          sendResponse({ status: "complete", id: currentHorseId });
        } else if (request["item"]) {
          sendResponse(horseData[request["item"]]);
        } else {
          sendResponse(horseData);
        }
      }
    });
  },
};
