export var storage = {
    saveHorseConfig: function(horseConfig) {
        chrome.runtime.sendMessage({
            "mode": "set",
            "type": "config",
            "data": horseConfig
        }, function(response) {});
    },

    getHorseConfig: function(callback) {
        chrome.runtime.sendMessage({
            "mode": "get",
            "type": "config",
        }, callback);
    },

    saveTabSettings: function(subtype, tabName) {
        chrome.runtime.sendMessage({
            "mode": "set",
            "type": "config",
            "subType": subtype,
            "data": tabName
        }, function(response) {});
    },

    getRandomName: function(gender, callback) {
        chrome.runtime.sendMessage({
            "mode": "get",
            "type": "name",
            "gender": gender
        }, callback);
    },
    getCurrentHorse: function(callback) {
        chrome.runtime.sendMessage({
            "mode": "get",
            "type": "horse",
            "item": "current"
        }, callback);
    },
    getHorseData: function(callback) {
        chrome.runtime.sendMessage({
            "mode": "get",
            "type": "horse"
        }, callback);
    },
}