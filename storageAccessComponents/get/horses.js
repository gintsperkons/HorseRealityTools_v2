import { main } from "../main.js";
export var horses = {
    handleDataRequests: function(request, sendResponse, horseData) {
        if (request["type"] === "horse") {
            sendResponse(horseData[request["item"]]);
            return;
        }
    }
}