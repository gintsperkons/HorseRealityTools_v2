import { main } from "../main.js";
export var configs = {
  handleDataRequests: function (request, sendResponse) {
    chrome.storage.sync.get("horseToolConfig", (data) => {
      main.respond(data, "complete", sendResponse);
    });
  },
};
