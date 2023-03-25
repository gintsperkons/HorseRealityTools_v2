import { main } from "../main.js";
export var configs = {
    handleDataRequests: function(request, sendResponse, horseConfig, setHorseConfig) {
        if (request["subType"] && request["data"]) {
            setHorseConfigSubType(request["subType"], request["data"], horseConfig, setHorseConfig);
            sendResponse({ "status": "success" });
            return;
        }
    }
}


const setHorseConfigSubType = (subtypeName, config, horseConfig, setHorseConfig) => {
    horseConfig[subtypeName] = config;
    main.saveHorseConfig({ "horseConfig": horseConfig }, setHorseConfig);
}