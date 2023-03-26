import { storage } from "../components/storage.js";
export var keybinds = {
    setCurrent: function(data) {
        var elementList = document.getElementsByClassName("keySetButton");
        for (const element of elementList) {
            if (!data[element.getAttribute("bindname")]) {
                element.textContent = "Click to set key"
                continue;
            }
            element.textContent = data[element.getAttribute("bindname")];

        }
    },

    addListeners: function() {
        addClickListeners();
        addDeleteListeners();
    },
}

function addDeleteListeners() {
    const buttonList = document.getElementsByClassName("keyRemoveButton");
    for (const button of buttonList) {
        button.addEventListener("click", deleteKey);
    }
}

function deleteKey(event) {
    const item = event.target.parentElement.getAttribute("bindname");
    var button = document.querySelector("button[bindname='" + item + "']");
    button.textContent = "Click to set key";
    storage.getHorseConfig(function(horseConfig) {
        if (!horseConfig) horseConfig = {};
        if (!horseConfig["keybinds"]) horseConfig["keybinds"] = {};
        delete horseConfig["keybinds"][item];
        storage.saveHorseConfig(horseConfig);
    })
}

function addClickListeners() {
    const buttonList = document.getElementsByClassName("keySetButton");
    for (const button of buttonList) {
        button.addEventListener("click", addKeyListeners);
    }
}

function addKeyListeners(event) {
    console.log(event);
    event.srcElement.textContent = "Press a key";
    event.srcElement.addEventListener("keyup", setKey, { once: true });
}

function setKey(event) {
    var key = event.code
    var item = event.srcElement.getAttribute("bindname");
    event.srcElement.textContent = key;

    storage.getHorseConfig(function(horseConfig) {
        if (!horseConfig) horseConfig = {};
        if (!horseConfig["keybinds"]) horseConfig["keybinds"] = {};
        horseConfig["keybinds"][item] = key;
        storage.saveHorseConfig(horseConfig);
    })
}