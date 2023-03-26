import { main } from "../main.js";
export var horses = {
    handleDataRequests: function(request, sendResponse, horseData, currentHorseId) {
        if (request["type"] === "horse") {
            if (request["item"] && request["item"] === "current") {
                sendResponse({ "status": "complete", "id": currentHorseId });
            } else if (request["item"]) {
                sendResponse(horseData[request["item"]]);
            } else {
                sendResponse(horseData);
            }
        }
    }
}