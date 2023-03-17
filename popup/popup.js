import { getHorseConfig, saveHorseConfig } from "../components/storage.js";
import { setCurrentKeybinds } from "../components/keybinds.js";
import { handleTitleClick, setCurrentTab } from "../components/title.js";

function printCOf(r) {
    console.log(r);
}

const keybindCode = (data) => {
    setCurrentKeybinds(data["keybinds"]);
}

const titleCode = () => {

}

const callNeeded = () => {
    getHorseConfig(keybindCode);
    titleCode();
};

callNeeded();