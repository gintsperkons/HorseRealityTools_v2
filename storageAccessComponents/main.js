import {get } from "./get.js";
import {set } from "./set.js";
export var main = {
    saveHorseConfig: function(data, callback) {
        chrome.storage.sync.set(data).then(() => {
            chrome.storage.sync.get("horseConfig", callback);
        });
    },
    saveHorseData: function(data, callback) {
        chrome.storage.local.set(data).then(() => {
            chrome.storage.local.get("horseData", callback);
        });
    },
    set: set,
    get: get,





}