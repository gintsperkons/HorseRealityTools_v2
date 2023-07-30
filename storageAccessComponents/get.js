import { names } from "./get/names.js";
import { horses } from "./get/horses.js";
import { configs } from "./get/configs.js";
export var get = {
  handleDataRequests: function (request, sendResponse, currentHorseId) {
    if (request["type"] === "name") {
      names.handleDataRequests(request, sendResponse);
    } else if (request["type"] === "horse") {
      horses.handleDataRequests(request, sendResponse, currentHorseId);
    } else if (request["type"] === "config") {
      configs.handleDataRequests(request, sendResponse);
    }
  },
};
