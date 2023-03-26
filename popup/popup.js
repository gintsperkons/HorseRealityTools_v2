import { storage } from "../components/storage.js";
import { keybinds } from "../components/keybinds.js";
import { titles } from "../components/title.js";
import { tools } from "../components/tools.js";
import { templates } from "../components/templates.js";
import { exports } from "../components/exports.js";

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

const toolsCode = (data) => {
    tools.setCurrent(data["tools"]);
    tools.setListeners();
}

const templateCode = (data) => {
    templates.setCurrent(data["templates"]);
    templates.setListeners();
}

const exportCode = (data) => {
    exports.setListeners();
}

const callNeeded = () => {
    storage.getHorseConfig(titleCode);
    storage.getHorseConfig(keybindCode);
    storage.getHorseConfig(toolsCode);
    storage.getHorseConfig(templateCode);
    storage.getHorseConfig(exportCode);
};

callNeeded();