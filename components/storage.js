export const saveHorseConfig = (horseConfig) => {
    chrome.runtime.sendMessage({
        "mode": "set",
        "type": "config",
        "data": horseConfig
    }, function(response) {});
}

export const getHorseConfig = (callback) => {
    chrome.runtime.sendMessage({
        "mode": "get",
        "type": "config",
    }, callback);
}