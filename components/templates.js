import { storage } from "../components/storage.js";
export var templates = {
  setCurrent: function (data) {
    if (!data) return;

    for (const item of document.getElementsByClassName("templateList")) {
      if (!data[item.getAttribute("name")]) {
        continue;
      }
      for (var key of Object.keys(data[item.getAttribute("name")])) {
        var el = document.createElement("option");
        el.setAttribute("data", data[item.getAttribute("name")][key]);
        el.value = key;
        el.textContent = key;
        item.appendChild(el);
      }
    }
  },
  setListeners: function () {
    for (const input of document.getElementsByClassName("templateInput")) {
      input.addEventListener("input", inputTextChange);
    }
    for (const templateList of document.getElementsByClassName(
      "templateList"
    )) {
      templateList.addEventListener("change", selectElementChangeValue);
    }
    for (const but of document.getElementsByClassName("removeTemplateButton")) {
      but.addEventListener("click", (event) => {
        const target = event.target.parentElement.getAttribute("templatename");
        var el = document.getElementById(
          but.getAttribute("templateName") + "List"
        );
        removeTemplate(target + "List", el.value);
        document.getElementById(target).value = "";
        el.value = "addNew";
      });
    }
  },
};

function inputTextChange(event) {
  storage.getHorseConfig(function (horseConfig) {
    horseConfig = horseConfig["data"]["horseToolConfig"];
    if (!horseConfig["templates"]) horseConfig["templates"] = {};
    if (!horseConfig["templates"][event.target.id])
      horseConfig["templates"][event.target.id] = {};

    var count = 0;
    if (document.getElementById(event.target.id + "List").value == "addNew") {
      count = 1;

      while (true) {
        if (!horseConfig["templates"][event.target.id][count]) {
          if (
            !document
              .getElementById(event.target.id + "List")
              .querySelector("option[value='" + count + "']")
          ) {
            var el = document.createElement("option");
            el.value = count;
            el.textContent = count;
            document.getElementById(event.target.id + "List").appendChild(el);
          }
          document.getElementById(event.target.id + "List").value = count;
          break;
        }
        count = 1 + count * 1;
      }
    } else {
      count = document.getElementById(event.target.id + "List").value;
      if (count == "addNew") {
        count = 1;
      }
    }
    var listItem = document
      .getElementById(event.target.id + "List")
      .querySelector("option[value='" + count + "']");
    listItem.setAttribute("data", event.target.value);
    listItem.value = count;

    horseConfig["templates"][event.target.id][count] = event.target.value;
    storage.saveHorseTemplateSettings(
      event.target.id,
      horseConfig["templates"][event.target.id]
    );
  });
}

function selectElementChangeValue(event) {
  var inputId = event.target.id.replace("List", "");
  var el = document.getElementById(inputId);
  if (event.target.value == "addNew") {
    el.value = "";
    return;
  }
  var dataElement = event.target.querySelector(
    "option[value='" + event.target.value + "']"
  );

  el.value = dataElement.getAttribute("data");
}

function removeTemplate(list, value) {
  if (value == "addNew") {
    return;
  }
  list = list.replace("List", "");
  document
    .getElementById(list + "List")
    .querySelector("option[value='" + value + "']")
    .remove();
  storage.deleteHorseTemplateSettingsItem(list, value);
}
