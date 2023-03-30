var horsePagePattern = new RegExp("horsereality.com/horses/\\d+/.*");


const autoCare = () => {
    setTimeout(function() {
        tab = document.getElementById("tab_summary2").getElementsByClassName("table_con")[0]
        if (tab) {
            careList = tab.getElementsByClassName("half_block")[0].getElementsByClassName("horse_blocks");
            for (let i = 0; i < careList.length; i++) {
                careList[i].click();
            }
        }
    }, 1500);
    setTimeout(function() {
        arrowName = ""
        result = document.getElementsByClassName("horse_arrows")[0].getElementsByTagName("a");
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
            horseConfig["tools"]["autoCare"] = false
            console.log("autoCareTurnedOff")
            storage.saveHorseConfig(horseConfig);
        }
    }, 3000);

}



const autoTrain = () => {
    setTimeout(function() {
        tab = document.getElementById("tab_training2").getElementsByClassName("table_con")[0]

        levelList = document.getElementsByClassName("grid_4 training_right")[0].getElementsByClassName("block")[3].getElementsByClassName("trainbar")
        lastVal = levelList[levelList.length - 1].getElementsByClassName("value")[0].textContent.replace("%", "").trim()


        if (tab) {
            terrainList = tab.getElementsByClassName("horsetraining")[0]
            timeList = tab.getElementsByClassName("horsetraining")[1]
            taskList = tab.getElementsByClassName("horsetraining")[2]
            energy = document.getElementById("energy").textContent.trim().split(" ")[1].replace("%", "").trim()

            terrainList = terrainList.getElementsByClassName("terrain-click")
            timeList = timeList.getElementsByClassName("duration-click")
            taskList = taskList.getElementsByClassName("traincon")

            if (!horseConfig["tools"]) {
                return
            }
            tempTextList = ["toolTrainPrimaryTerrainList", "toolTrainSecondaryTerrainList", " toolTrainPrimaryTimeList", "toolTrainSecondaryTimeList"];
            for (const text of tempTextList) {
                if (!horseConfig["tools"][text.trim()]) {
                    return
                }
            }

            terrainTypePrimary = horseConfig["tools"]["toolTrainPrimaryTerrainList"]
            terrainTypeSecondary = horseConfig["tools"]["toolTrainSecondaryTerrainList"]
            durationTypePrimary = horseConfig["tools"]["toolTrainPrimaryTimeList"]
            durationTypeSecondary = horseConfig["tools"]["toolTrainSecondaryTimeList"]

            if (terrainTypePrimary != 3) {
                terrainList[terrainTypePrimary].click()
                timeList[durationTypePrimary].click()
                itemFinal = "";
                for (let i = 0; i < taskList.length; i++) {
                    elem = taskList[i];
                    val = taskList[i].getElementsByClassName("trainbar")[0].getElementsByClassName("value")[0].textContent.trim().replace("%", "");

                    if (val < 100) {
                        itemFinal = elem;
                        break
                    }
                    itemFinal = elem
                }
                itemFinalval = itemFinal.getElementsByClassName("trainbar")[0].getElementsByClassName("value")[0].textContent.trim().replace("%", "");
                if (lastVal != 100 && itemFinalval == 100) {
                    return
                }
                if (itemFinalval < 100) {
                    itemFinal.getElementsByClassName("action-train")[0].click();
                    return
                }

            }

            if (terrainTypePrimary == 3) {
                terrainList[terrainTypePrimary].click()
                itemFinal = "";
                itemFinal = tab.getElementsByClassName("duration-click")[durationTypePrimary].getElementsByClassName("_train-round")[0]
                itemFinal.click();
                return
            }
            if (terrainTypeSecondary != 3) {
                terrainList[terrainTypeSecondary].click()
                timeList[durationTypeSecondary].click()
                itemFinal = "";
                for (let i = 0; i < taskList.length; i++) {
                    elem = taskList[i];
                    val = taskList[i].getElementsByClassName("trainbar")[0].getElementsByClassName("value")[0].textContent.trim().replace("%", "");

                    if (val < 100) {
                        itemFinal = elem;
                        break
                    }
                    itemFinal = elem
                }
                itemFinalval = itemFinal.getElementsByClassName("trainbar")[0].getElementsByClassName("value")[0].textContent.trim().replace("%", "");
                if (itemFinalval <= 100) {
                    itemFinal.getElementsByClassName("action-train")[0].click();
                    return
                }
            }

            if (terrainTypeSecondary == 3) {
                terrainList[terrainTypeSecondary].click()
                itemFinal = "";
                itemFinal = tab.getElementsByClassName("duration-click")[durationTypeSecondary].getElementsByClassName("_train-round")[0]
                itemFinal.click();
            }
        }
    }, 1500);
    setTimeout(function() {
        result = document.getElementsByClassName("horse_arrows")[0].getElementsByTagName("a");
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
            horseConfig["tools"]["autoTrain"] = false
            console.log("autoTrainTurnedOff")
            storage.saveHorseConfig(horseConfig);
        }
    }, 3000);

}

var tools = {
    callNeeded: function(result) {
        if (!result) {
            horseConfig = {};
            return;
        } else {
            horseConfig = result;
        }
        if (!horseConfig["tools"]) {
            horseConfig["tools"] = {}
        }
        if (horseConfig["tools"]) {
            if (horseConfig["tools"]["autoCare"]) {
                if (document.getElementById("tab_summary2").textContent.trim() == "") {
                    setTimeout(function() {
                        document.getElementById("tab_summary").click();
                    }, 1500);
                    setTimeout(function() {
                        autoCare()
                    }, 3000);
                } else {
                    autoCare()
                }
            }
        }
        if (horseConfig["tools"]["autoTrain"]) {
            if (document.getElementById("tab_training2").textContent.trim() == "") {
                setTimeout(function() {
                    document.getElementById("tab_training").click();
                }, 1500);
                setTimeout(function() {
                    autoTrain()
                }, 3000);
            } else {
                autoTrain()
            }
        }
    }
}