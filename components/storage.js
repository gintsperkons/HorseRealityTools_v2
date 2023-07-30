export var storage = {
  getHorseConfig: function (callback) {
    chrome.runtime.sendMessage(
      {
        mode: "get",
        type: "config",
      },
      callback
    );
  },
  saveHorseKeySettings: function (item, key) {
    chrome.runtime.sendMessage(
      {
        mode: "set",
        type: "config",
        subType: "keybind",
        item: item,
        data: key,
      },
      function (response) {}
    );
  },
  deleteHorseKeySettings: function (item) {
    chrome.runtime.sendMessage(
      {
        mode: "set",
        type: "config",
        subType: "keybindDel",
        item: item,
      },
      function (response) {}
    );
  },

  saveHorseTabSettings: function (tab, data) {
    chrome.runtime.sendMessage(
      {
        mode: "set",
        type: "config",
        subType: "title",
        item: tab,
        data: data,
      },
      function (response) {}
    );
  },
  saveHorseToolSettings: function (data) {
    chrome.runtime.sendMessage(
      {
        mode: "set",
        type: "config",
        subType: "tool",
        data: data,
      },
      function (response) {}
    );
  },

  saveHorseTemplateSettings: function (listName, data) {
    chrome.runtime.sendMessage(
      {
        mode: "set",
        type: "config",
        subType: "template",
        item: listName,
        data: data,
      },
      function (response) {}
    );
  },
  deleteHorseTemplateSettingsItem: function (listName, data) {
    chrome.runtime.sendMessage(
      {
        mode: "set",
        type: "config",
        subType: "templateDel",
        item: listName,
        data: data,
      },
      function (response) {}
    );
  },

  getRandomName: function (gender, callback) {
    chrome.runtime.sendMessage(
      {
        mode: "get",
        type: "name",
        gender: gender,
      },
      callback
    );
  },
  getCurrentHorse: function (callback) {
    chrome.runtime.sendMessage(
      {
        mode: "get",
        type: "horse",
        item: "current",
      },
      callback
    );
  },
  getHorseData: function (callback) {
    chrome.runtime.sendMessage(
      {
        mode: "get",
        type: "horse",
      },
      callback
    );
  },
};
