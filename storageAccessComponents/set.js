import { horses } from "./set/horses.js"
import { configs } from "./set/configs.js";
export var set = {
    handleDataRequests: function(request, sendResponse, horseData, horseConfig, setHorseData, setHorseConfig) {
        if (request["type"] === "horse") {
            horses.handleDataRequests(request, sendResponse, horseData, setHorseData);
        } else if (request["type"] === "config") {
            configs.handleDataRequests(request, sendResponse, horseConfig, setHorseConfig)
        }


    }
}