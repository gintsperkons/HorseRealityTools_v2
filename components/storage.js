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
        }, );
    },

    getRandomName: function(gender, callback) {
        chrome.runtime.sendMessage({
            "mode": "get",
            "type": "name",
            "gender": gender
        }, callback);
    }
}