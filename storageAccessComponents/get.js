import { names } from "./get/names.js";
import { horses } from "./get/horses.js";
import { configs } from "./get/configs.js";
export var get = {
    handleDataRequests: function(request, sendResponse, horseData, horseConfig) {
        if (request["type"] === "name") {
            names.handleDataRequests(request, sendResponse);
        } else if (request["type"] === "horse") {
            horses.handleDataRequests(request, sendResponse, horseData);
        } else if (request["type"] === "config") {
            configs.handleDataRequests(request, sendResponse, horseConfig);
        }
    }

}