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
    addDeleteListeners: function() {

    },

    addListeners: function() {
        addClickListeners();
        addKeyListeners();
        this.addDeleteListeners();
    },
}

function addClickListeners() {

}

function addKeyListeners() {

}

function setKey(event) {

}