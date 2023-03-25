import { main } from "../main.js";
export var configs = {
    handleDataRequests: function(request, sendResponse, horseConfig) {
        sendResponse(horseConfig);
    }
}