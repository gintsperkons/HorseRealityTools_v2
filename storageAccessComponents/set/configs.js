import { main } from "../main.js";
export var configs = {
  handleDataRequests: function (request, sendResponse) {
    chrome.storage.sync.get("horseToolConfig", (r) => {
      var horseConfig = r["horseToolConfig"];
      if (!horseConfig) {
        horseConfig = {};
      }
      if (request["subType"] == "title") {
        horseConfig[request["item"]] = request["data"];
      } else if (request["subType"] == "keybind") {
        if (!horseConfig["keybinds"]) {
          horseConfig["keybinds"] = {};
        }
        horseConfig["keybinds"][request["item"]] = request["data"];
      } else if (request["subType"] == "tool") {
        if (!horseConfig["tools"]) {
          horseConfig["tools"] = {};
        }
        for (const item of request["data"]) {
          horseConfig["tools"][item["name"]] = item["data"];
        }
        
      } else if (request["subType"] == "template") {
        if (!horseConfig["templates"]) {
          horseConfig["templates"] = {};
        }
        horseConfig["templates"][request["item"]] = request["data"];
      } else if (request["subType"] == "keybindDel") {
        if (!horseConfig["keybinds"]) {
          horseConfig["keybinds"] = {};
        }
        delete horseConfig["keybinds"][request["item"]];
      } else if (request["subType"] == "templateDel") {
        if (!horseConfig["templates"]) {
          horseConfig["templates"] = {};
          return;
        }
        delete horseConfig["templates"][request["item"]][request["data"]];
      }
      chrome.storage.sync.set({
        horseToolConfig: horseConfig,
      });
    });
  },
};
