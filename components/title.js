import { storage } from "../components/storage.js";
export var titles = {
  setCurrentTab: function (tabName) {
    var tabList = document.getElementsByClassName("tabContent");
    for (const tab of tabList) {
      if (tab.id === tabName) {
        tab.style.display = "block";
      } else {
        tab.style.display = "none";
      }
    }
    titles.setCurrentColor(tabName);
    storage.saveHorseTabSettings("selectedTab", tabName);
  },

  setCurrentColor: function (tabName) {
    var titleList = document.getElementsByClassName("tabTitle");
    for (const title of titleList) {
      if (title.getAttribute("tab-name") === tabName) {
        title.style.color = "var(--color-link)";
      } else {
        title.style.color = "var(--color-primary)";
      }
    }
  },

  handleClick: function (e) {
    var tabName = e.srcElement.getAttribute("tab-name");
    document.getElementById(tabName).style.display = "block";
    titles.setCurrentTab(tabName);
  },

  setListeners: function () {
    var titleList = document.getElementsByClassName("tabTitle");
    for (const title of titleList) {
      title.addEventListener("click", this.handleClick);
    }
  },
};
