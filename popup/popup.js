import { storage } from "../components/storage.js";
import { keybinds } from "../components/keybinds.js";
import { titles } from "../components/title.js";

const keybindCode = (data) => {
    if (!data["keybinds"]) data["keybinds"] = {};
    keybinds.setCurrent(data["keybinds"]);
    keybinds.addListeners();
}

const titleCode = (data) => {
    if (!data["selectedTab"]) {
        data["selectedTab"] = "keybinds"
    }
    titles.setCurrentTab(data["selectedTab"]);
    titles.setListeners();
}

const callNeeded = () => {
    storage.getHorseConfig(keybindCode);
    storage.getHorseConfig(titleCode);
};

callNeeded();