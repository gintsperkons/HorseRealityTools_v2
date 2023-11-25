var horsePagePattern = new RegExp("horsereality.com/horses/\\d+/.*");
var timeOutIntervalStep = 1500;
var currentTimeOutInterval = 0;

const getNextInterval = () => {
  currentTimeOutInterval = currentTimeOutInterval + timeOutIntervalStep;
  return currentTimeOutInterval;
};

const clickTraining = () => {
  setTimeout(function () {
    tab = document
      .getElementById("tab_training2")
      .getElementsByClassName("table_con")[0];

    levelList = document
      .getElementsByClassName("grid_4 training_right")[0]
      .getElementsByClassName("block")[3]
      .getElementsByClassName("trainbar");
    lastVal = levelList[levelList.length - 1]
      .getElementsByClassName("value")[0]
      .textContent.replace("%", "")
      .trim();

    if (tab) {
      terrainList = tab.getElementsByClassName("horsetraining")[0];
      timeList = tab.getElementsByClassName("horsetraining")[1];
      taskList = tab.getElementsByClassName("horsetraining")[2];
      energy = document
        .getElementById("energy")
        .textContent.trim()
        .split(" ")[1]
        .replace("%", "")
        .trim();

      terrainList = terrainList.getElementsByClassName("terrain-click");
      timeList = timeList.getElementsByClassName("duration-click");
      taskList = taskList.getElementsByClassName("traincon");

      if (!horseConfig["tools"]) {
        return;
      }
      tempTextList = [
        "toolTrainPrimaryTerrainList",
        "toolTrainSecondaryTerrainList",
        " toolTrainPrimaryTimeList",
        "toolTrainSecondaryTimeList",
      ];
      for (const text of tempTextList) {
        if (!horseConfig["tools"][text.trim()]) {
          return;
        }
      }

      terrainTypePrimary = horseConfig["tools"]["toolTrainPrimaryTerrainList"];
      terrainTypeSecondary =
        horseConfig["tools"]["toolTrainSecondaryTerrainList"];
      durationTypePrimary = horseConfig["tools"]["toolTrainPrimaryTimeList"];
      durationTypeSecondary =
        horseConfig["tools"]["toolTrainSecondaryTimeList"];

      if (terrainTypePrimary != 3) {
        terrainList[terrainTypePrimary].click();
        timeList[durationTypePrimary].click();
        itemFinal = "";
        for (let i = 0; i < taskList.length; i++) {
          elem = taskList[i];
          val = taskList[i]
            .getElementsByClassName("trainbar")[0]
            .getElementsByClassName("value")[0]
            .textContent.trim()
            .replace("%", "");

          if (val < 100) {
            itemFinal = elem;
            break;
          }
          itemFinal = elem;
        }
        itemFinalval = itemFinal
          .getElementsByClassName("trainbar")[0]
          .getElementsByClassName("value")[0]
          .textContent.trim()
          .replace("%", "");
        if (lastVal != 100 && itemFinalval == 100) {
          return;
        }
        if (itemFinalval < 100) {
          if (itemFinal.getElementsByClassName("action-train")[0]) {
            itemFinal.getElementsByClassName("action-train")[0].click();
          }
          return;
        }
      }

      if (terrainTypePrimary == 3) {
        terrainList[terrainTypePrimary].click();
        itemFinal = "";
        itemFinal = tab
          .getElementsByClassName("duration-click")
          [durationTypePrimary].getElementsByClassName("_train-round")[0];
        itemFinal.click();
        return;
      }
      if (terrainTypeSecondary != 3) {
        terrainList[terrainTypeSecondary].click();
        timeList[durationTypeSecondary].click();
        itemFinal = "";
        for (let i = 0; i < taskList.length; i++) {
          elem = taskList[i];
          val = taskList[i]
            .getElementsByClassName("trainbar")[0]
            .getElementsByClassName("value")[0]
            .textContent.trim()
            .replace("%", "");

          if (val < 100) {
            itemFinal = elem;
            break;
          }
          itemFinal = elem;
        }
        itemFinalval = itemFinal
          .getElementsByClassName("trainbar")[0]
          .getElementsByClassName("value")[0]
          .textContent.trim()
          .replace("%", "");
        if (itemFinalval <= 100) {
          itemFinal.getElementsByClassName("action-train")[0].click();
          return;
        }
      }

      if (terrainTypeSecondary == 3) {
        terrainList[terrainTypeSecondary].click();
        itemFinal = "";
        itemFinal = tab
          .getElementsByClassName("duration-click")
          [durationTypeSecondary].getElementsByClassName("_train-round")[0];
        itemFinal.click();
      }
    }
  }, getNextInterval());
};

const clickAllCare = () => {
  setTimeout(function () {
    tab = document
      .getElementById("tab_summary2")
      .getElementsByClassName("table_con")[0];
    if (tab) {
      careList = tab
        .getElementsByClassName("half_block")[0]
        .getElementsByClassName("horse_blocks");
      for (let i = 0; i < careList.length; i++) {
        careList[i].click();
      }
    }
  }, getNextInterval());
};

const clickNextArrow = () => {
  arrowName = "";
  result = document
    .getElementsByClassName("horse_arrows")[0]
    .getElementsByTagName("a");
  if (result.length == 1) {
    arrowName = result[0].getElementsByTagName("img")[0].className;
    if (arrowName == "right") {
      result[0].click();
    }
  }
  if (result.length == 2) {
    result[1].click();
  }
  if (arrowName == "left" && result.length == 1) {
    horseConfig["tools"]["autoCare"] = false;
    console.log("autoCareTurnedOff");
    horseConfig["tools"]["autoTrain"] = false;
    console.log("autoTrainTurnedOff");
    horseConfig["tools"]["autoAllTabs"] = false;
    console.log("autoAllTabsTurnedOff");
    storage.saveHorseToolSettings([
      { name: "autoCare", data: false },
      { name: "autoTrain", data: false },
      { name: "autoAllTabs", data: false },
    ]);
  }
};

const autoAllTabs = () => {
  setTimeout(function () {
    document.getElementById("tab_summary").click();
  }, getNextInterval());
  if (horseConfig["tools"]["autoCare"]) {
    clickAllCare();
  }
  setTimeout(function () {
    document.getElementById("tab_training").click();
  }, getNextInterval());
  if (horseConfig["tools"]["autoTrain"]) {
    clickTraining();
  }
  setTimeout(function () {
    document.getElementById("tab_genetics").click();
  }, getNextInterval());
  setTimeout(function () {
    document.getElementById("tab_achievements").click();
  }, getNextInterval());
  setTimeout(function () {
    document.getElementById("tab_offspring").click();
  }, getNextInterval());
  setTimeout(function () {
    document.getElementById("tab_health").click();
  }, getNextInterval());
  setTimeout(function () {
    document.getElementById("tab_update").click();
  }, getNextInterval());
};

var tools = {
  setSaleDuration: function (result) {
    if (!result) {
      horseConfig = {};
      console.log("No Horse Configuration Found!");
      return;
    } else {
      horseConfig = result;
    }
    if (!horseConfig["tools"]) {
      horseConfig["tools"] = {};
      console.log("No Tools Settings Found!");
      return;
    }
    if (horseConfig["tools"]["saleDefaultDurationList"]>0) {
      document.querySelector("select[name='duration']").value = horseConfig["tools"]["saleDefaultDurationList"]
    }
    console.log(horseConfig["tools"])
  },

  callNeeded: function (result) {
    result = result["data"]["horseToolConfig"];
    if (!result) {
      horseConfig = {};
      console.log("No Horse Configuration Found!");
      return;
    } else {
      horseConfig = result;
    }
    if (!horseConfig["tools"]) {
      horseConfig["tools"] = {};
      console.log("No Tools Settings Found!");
      return;
    }

    if (
      !horseConfig["tools"]["toolTrainPrimaryTerrainList"] ||
      !horseConfig["tools"]["toolTrainPrimaryTimeList"] ||
      !horseConfig["tools"]["toolTrainSecondaryTerrainList"] ||
      !horseConfig["tools"]["toolTrainSecondaryTimeList"]
    ) {
      console.log("Incorrect Auto Train Primary and Secondary Configurations!");
      return;
    }
    if (horseConfig["tools"]["autoAllTabs"]) {
      autoAllTabs();
    }
    if (
      !horseConfig["tools"]["autoAllTabs"] &&
      horseConfig["tools"]["autoCare"]
    ) {
      setTimeout(function () {
        document.getElementById("tab_summary").click();
      }, getNextInterval());
      clickAllCare();
    }
    if (
      !horseConfig["tools"]["autoAllTabs"] &&
      horseConfig["tools"]["autoTrain"]
    ) {
      setTimeout(function () {
        document.getElementById("tab_training").click();
      }, getNextInterval());
      clickTraining();
    }
    if (
      horseConfig["tools"]["autoAllTabs"] ||
      horseConfig["tools"]["autoCare"] ||
      horseConfig["tools"]["autoTrain"]
    ) {
      setTimeout(function () {
        clickNextArrow();
      }, getNextInterval());
    }
  },
};
