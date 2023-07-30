import { horses } from "./set/horses.js";
import { configs } from "./set/configs.js";
export var set = {
  handleDataRequests: function (request, sendResponse) {
    if (request["type"] === "horse") {
      horses.handleDataRequests(request, sendResponse);
    } else if (request["type"] === "config") {
      configs.handleDataRequests(request, sendResponse);
    }
  },
};
