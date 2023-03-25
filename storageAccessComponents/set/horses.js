import { main } from "../main.js";
export var horses = {
    handleDataRequests: function(request, sendResponse, horseData, setHorseData) {
        if (request["type"] === "horse") {
            horseData[request["item"]] = request["data"];
            sendResponse({ "status": "success" });
            main.saveHorseData({ "horseData": horseData }, setHorseData);
            return;
        }
    }

}