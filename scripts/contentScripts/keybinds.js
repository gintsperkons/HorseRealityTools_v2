var horsePagePattern = new RegExp("horsereality.com/horses/\\d+/.*");
var keybinds = {
    addHorsePageKeybinds: function() {
        document.addEventListener("keyup", handleHorsePageKeyEvents);
    },
    addRidingSchoolPageKeybinds: function() {
        document.addEventListener("keyup", handleRidingSchoolPageKeyEvents);
    },
    addGlobalKeybinds: function() {
        document.addEventListener("keyup", handleGlobalKeyEvents);
    }
}
const testsBeforeKeybinds = (event, horseConfig) => {
    var target = event.target.tagName;
    if (target == "INPUT") {
        return;
    }
    if (!horseConfig) {
        horseConfig = {};
        return;
    }
    if (!horseConfig["keybinds"]) {
        return;
    }
};

const handleRidingSchoolPageKeyEvents = (e) => {
    storage.getHorseConfig((horseConfig) => {
        if (testsBeforeKeybinds(e, horseConfig)) return;
        if (e.code === horseConfig["keybinds"]["ridingSchoolTask"]) {
            if (!document.getElementsByClassName("timer_jobs")) {
                var jobList = document.getElementsByClassName("job-item");
                lastJob = jobList[jobList.length - 1];
                var button = lastJob.getElementsByClassName("btn")[0];
                button.click();
            }
        }

    })
}

const handleGlobalKeyEvents = (e) => {
    storage.getHorseConfig((horseConfig) => {
        if (testsBeforeKeybinds(e, horseConfig)) return;
        if (e.code === horseConfig["keybinds"]["horsePageAll"] && window.location.href != "https://v2.horsereality.com/horses/stall/all") {
            window.open("https://v2.horsereality.com/horses/stall/all", "_self");
        } else if (e.code === horseConfig["keybinds"]["marketHomePage"] && window.location.href != "https://v2.horsereality.com/market") {
            window.open("https://v2.horsereality.com/market", "_self");
        } else if (e.code === horseConfig["keybinds"]["bankPage"] && window.location.href != "https://v2.horsereality.com/bank") {
            window.open("https://v2.horsereality.com/bank", "_self");
        } else if (e.code === horseConfig["keybinds"]["laboratoryPage"] && window.location.href != "https://v2.horsereality.com/laboratory") {
            window.open("https://v2.horsereality.com/laboratory", "_self");
        } else if (e.code === horseConfig["keybinds"]["ridingSchoolPage"] && window.location.href != "https://v2.horsereality.com/ridingschool") {
            window.open("https://v2.horsereality.com/ridingschool", "_self");
        } else if (e.code === horseConfig["keybinds"]["vetarinaryPage"] && window.location.href != "https://v2.horsereality.com/veterinary") {
            window.open("https://v2.horsereality.com/veterinary", "_self");
        } else if (e.code === horseConfig["keybinds"]["currencyExchangePage"] && window.location.href != "https://www.horsereality.com/currency-exchange") {
            window.open("https://www.horsereality.com/currency-exchange", "_self");
        } else if (e.code === horseConfig["keybinds"]["cityPage"] && window.location.href != "https://v2.horsereality.com/city") {
            window.open("https://v2.horsereality.com/city", "_self");
        } else if (e.code === horseConfig["keybinds"]["wikiPage"] && window.location.href != "https://horsereality.wiki") {
            window.open("https://horsereality.wiki", "_self");
        } else if (e.code === horseConfig["keybinds"]["profilePage"] && window.location.href != document.getElementsByClassName("user-nav")[0].getElementsByClassName("btn")[0].href) {
            document.getElementsByClassName("user-nav")[0].getElementsByClassName("btn")[0].click();
        }
    })
}

const handleHorsePageKeyEvents = (e) => {
    storage.getHorseConfig((horseConfig) => {
        if (testsBeforeKeybinds(e, horseConfig)) return;

        if (e.code === horseConfig["keybinds"]["trainHorse"]) {
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
                        console.log(horseConfig["tools"][text.trim()])
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
        } else if (e.code === horseConfig["keybinds"]["careForHorse"]) {
            tab = document.getElementById("tab_summary2").getElementsByClassName("table_con")[0]
            if (tab) {
                careList = tab.getElementsByClassName("half_block")[0].getElementsByClassName("horse_blocks");
                for (let i = 0; i < careList.length; i++) {
                    careList[i].click();
                }
            }
        } else if (e.code === horseConfig["keybinds"]["tabSummary"]) {
            document.getElementById("tab_summary").click();
        } else if (e.code === horseConfig["keybinds"]["tabTraining"]) {
            document.getElementById("tab_training").click();
        } else if (e.code === horseConfig["keybinds"]["tabGenetics"]) {
            document.getElementById("tab_genetics").click();
        } else if (e.code === horseConfig["keybinds"]["tabAchievements"]) {
            document.getElementById("tab_achievements").click();
        } else if (e.code === horseConfig["keybinds"]["tabOffspring"]) {
            document.getElementById("tab_offspring").click();
        } else if (e.code === horseConfig["keybinds"]["tabHealth"]) {
            document.getElementById("tab_health").click();
        } else if (e.code === horseConfig["keybinds"]["tabUpdate"] && isMyHorse()) {
            document.getElementById("tab_update").click();
        } else if (e.code === horseConfig["keybinds"]["nextHorse"]) {
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
        } else if (e.code === horseConfig["keybinds"]["previousHorse"]) {
            result = document.getElementsByClassName("horse_arrows")[0].getElementsByTagName("a");
            if (result.length == 1) {
                arrowName = result[0].getElementsByTagName("img")[0].className;
                if (arrowName == "left") {
                    result[0].click();
                }
            }
            if (result.length == 2) {
                result[0].click();
            }
        }

    })



}