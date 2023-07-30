import { storage } from "../components/storage.js";
import { keybinds } from "../components/keybinds.js";
import { titles } from "../components/title.js";
import { tools } from "../components/tools.js";
import { templates } from "../components/templates.js";
import { exports } from "../components/exports.js";

const keybindCode = (data) => {
  if (!data) data = {};
  if (!data["keybinds"]) data["keybinds"] = {};
  keybinds.setCurrent(data["keybinds"]);
  keybinds.addListeners();
};

const titleCode = (data) => {
  if (!data) data = {};
  if (!data["selectedTab"]) {
    data["selectedTab"] = "keybinds";
  }
  titles.setCurrentTab(data["selectedTab"]);
  titles.setListeners();
};

const toolsCode = (data) => {
  if (!data) data = {};
  tools.setCurrent(data["tools"]);
  tools.setListeners();
};

const templateCode = (data) => {
  if (!data) data = {};
  templates.setCurrent(data["templates"]);
  templates.setListeners();
};

const exportCode = (data) => {
  if (!data) data = {};
  exports.setListeners();
};

const callNeeded = (horseToolConfig) => {
  if (horseToolConfig["status"] == "working") {
    return;
  }
  if (horseToolConfig["data"] == undefined) {
    titleCode({});
    keybindCode({});
    toolsCode({});
    templateCode({});
    exportCode({});
    return;
  }
  titleCode(horseToolConfig["data"]["horseToolConfig"]);
  keybindCode(horseToolConfig["data"]["horseToolConfig"]);
  toolsCode(horseToolConfig["data"]["horseToolConfig"]);
  templateCode(horseToolConfig["data"]["horseToolConfig"]);
  exportCode(horseToolConfig["data"]["horseToolConfig"]);
};

storage.getHorseConfig(callNeeded);
