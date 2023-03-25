var storage = {
    saveHorseData: function(item, data) {
        chrome.runtime.sendMessage({
            "mode": "set",
            "type": "horse",
            "item": item,
            "data": data
        }, function(response) {});
    },
    getHorseData: function(item, callback) {
        chrome.runtime.sendMessage({
            "mode": "get",
            "type": "horse",
            "item": item,
        }, callback);
    },
    getHorseRandomName: function(gender, callback) {
        chrome.runtime.sendMessage({
            "mode": "get",
            "type": "name",
            "gender": gender,
        }, callback);
    }
}