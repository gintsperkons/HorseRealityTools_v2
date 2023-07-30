var getHorseData = {
    getTabDataBase: function(tabId) {
        if (tabId == "overAll") {
            getOveralData();
            updateLast();
        } else if (tabId == "tab_summary2") {
            getSummaryData();
        } else if (tabId == "tab_training2") {
            getTrainingData();
        } else if (tabId == "tab_genetics2") {
            getGeneticData();
        } else if (tabId == "tab_achievements2") {
            getAchievementData();
        } else if (tabId == "tab_offspring2") {
            getOffspringData();
        } else if (tabId == "tab_health2") {
            getHealthData();
        } else if (tabId == "tab_update2") {
            getUpdateData();
        }
    }
}

const updateLast = () => {
    if (!horseData) {
        horseData = {};
    }
    let nowDate = Math.floor(Date.now() / 1000);
    horseData["lastUpdated"] = nowDate;
    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}

const getOveralData = () => {
    let tab = document.getElementsByClassName("horse_left")[0];
    horseData["name"] = tab.getElementsByTagName("h1")[0].textContent.trim();
    horseData["tagline"] = tab.getElementsByTagName("p")[0].textContent.trim();
    horseData["gender"] = tab.getElementsByTagName("h1")[0].getElementsByTagName("img")[0].getAttribute("alt").trim();
    let infotext = tab.getElementsByClassName("infotext")[0];
    horseData["lifeNumber"] = infotext.getElementsByClassName("right")[0].textContent.replace("#", "").trim();
    horseData["breed"] = infotext.getElementsByClassName("right")[1].textContent.trim();
    var age = 0;
    var ageTextParts = infotext.getElementsByClassName("right")[2].textContent.trim().split(",");

    for (const part of ageTextParts) {
        if (part.includes("year")) {
            age += part.split("year")[0].trim() * 12
        }
        if (part.includes("month")) {
            age += part.split("month")[0].trim() * 1
        }
    }
    horseData["age"] = age;
    horseData["birthDay"] = infotext.getElementsByClassName("right")[3].textContent.trim();
    horseData["horseHeight"] = infotext.getElementsByClassName("right")[4].textContent.trim();
    horseData["owner"] = infotext.getElementsByClassName("right")[6].innerHTML.split("\n")[2].split("<br>")[0].trim();
    horseData["ownerRanch"] = infotext.getElementsByClassName("right")[6].innerHTML.split("<br>")[1].replace("</a>", "").trim();
    horseData["ownerUrl"] = document.getElementsByClassName("horse_left")[0].getElementsByClassName("right")[6].getElementsByTagName("a")[0].href.trim();
    horseData["bornRanch"] = document.getElementsByClassName("horse_left")[0].getElementsByTagName("a")[0].textContent.trim();
    horseData["bornRanchUrl"] = document.getElementsByClassName("horse_left")[0].getElementsByTagName("a")[0].href.trim()
    splitURL = document.URL.split("/")
    delete splitURL[5]
    link = ""
    for (let i = 0; i < 5; i++) {
        link += splitURL[i] + "/";
    }
    horseData["url"] = link
    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}
const getSummaryData = () => {
    if (!horseData["summary"]) {
        horseData["summary"] = {};
    }
    tab = document.getElementById(tabList["SUMMARY"])
    blockList = tab.getElementsByClassName("half_block")[1].getElementsByClassName("horse_blocks")
    for (let block of blockList) {
        imgText = block.getElementsByTagName("img")[0].getAttribute("alt")
        textDiv = block.getElementsByClassName("horse_blocktext")[0]
        if (!textDiv) {
            continue
        }
        if (imgText.trim() === "Breed this mare") {
            horseData["summary"]["pregnant"] = textDiv.textContent.trim()
        }
    }
    if (horseData["summary"]["pregnant"] === "" || !horseData["summary"]["pregnant"]) {
        horseData["summary"]["pregnant"] = "Can't or isn't breed"
    }
    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}

const getTrainingData = () => {
    var currentProgress = -1;
    if (!horseData["training"]) {
        horseData["training"] = {};
    }
    tab = document.getElementById(tabList["TRAINING"])
    horseData["training"]["currentTraining"] = tab.getElementsByClassName("training_right")[0].getElementsByClassName("top")[2].textContent.trim()
    levelList = tab.getElementsByClassName("training_right")[0].getElementsByClassName("block")[3].getElementsByClassName("barcon")
    for (let level of levelList) {
        horseData["training"]["currentTrainingLevel"] = level.getElementsByClassName("traintext")[0].textContent.trim()
        currentProgress = level.getElementsByClassName("trainbar")[0].textContent.trim().replace("%", "")
        if (currentProgress < 100) {
            break
        }
    }
    if (currentProgress == -1) {
        horseData["training"]["currentTraining"] = "undefined";
        horseData["training"]["currentTrainingLevel"] = "undefined";
    }
    if (currentProgress == 100 && trainingLevelsToShorts[horseData["training"]["currentTrainingLevel"]] === "Base4") {
        horseData["training"]["currentTrainingLevel"] = "Base Complete";
    }
    finalLevelNames = ["GrP", "R5", "CC4", "CEI4", "Champ"]
    for (const name of finalLevelNames) {
        if (currentProgress == 100 && (trainingLevelsToShorts[horseData["training"]["currentTrainingLevel"]] === name)) {
            horseData["training"]["currentTrainingLevel"] = "Finish";
            break;
        }
    }

    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}

const getGeneticData = () => {
    if (!horseData["genetics"]) {
        horseData["genetics"] = {};
    }
    tab = document.getElementById(tabList["GENETICS"])
    genetics = tab.getElementsByClassName("genetics")[1]
    tableGP = tab.getElementsByClassName("genetic_table_row")[14]
    horseData["genetics"]["geneticPotential"] = genetics.getElementsByClassName("top")[0].getElementsByClassName("right")[0].textContent.trim().split(" ")[2].trim()
    horseData["genetics"]["acceleration"] = tableGP.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[0].textContent.trim()
    horseData["genetics"]["agility"] = tableGP.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[1].textContent.trim()
    horseData["genetics"]["balance"] = tableGP.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[2].textContent.trim()
    horseData["genetics"]["bascule"] = tableGP.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[3].textContent.trim()
    horseData["genetics"]["pullingPower"] = tableGP.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[4].textContent.trim()
    horseData["genetics"]["speed"] = tableGP.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[0].textContent.trim()
    horseData["genetics"]["sprint"] = tableGP.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[1].textContent.trim()
    horseData["genetics"]["stamina"] = tableGP.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[2].textContent.trim()
    horseData["genetics"]["strength"] = tableGP.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[3].textContent.trim()
    horseData["genetics"]["surefootedness"] = tableGP.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[4].textContent.trim()
    horseData["genetics"]["advice"] = tab.getElementsByClassName("genetic_table_row")[15].textContent.trim().split("\n")[0].trim()
    horseData["genetics"]["bestTraining"]
    wordListTemp = ["Dressage", "Jumping", "Reining", "Eventing", "Endurance", "Racing", "Driving"]
    text = horseData["genetics"]["advice"].split("I think")[1]
    words = text.trim().replaceAll(",", "").replaceAll(".", "").split(" ")
    for (let i = 0; i < words.length; i++) {
        if (wordListTemp.includes(words[i])) {
            horseData["genetics"]["bestTraining"] = words[i].trim()
        }
    }
    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}

const getAchievementData = () => {
    if (!horseData["achievements"]) {
        horseData["achievements"] = {};
    }
    tab = document.getElementById(tabList["ACHIEVEMENTS"])
    table = tab.getElementsByClassName("genetic_table_row")[0]
    horseData["achievements"]["walk"] = table.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[0].textContent.trim()
    horseData["achievements"]["trot"] = table.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[1].textContent.trim()
    horseData["achievements"]["canter"] = table.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[2].textContent.trim()
    horseData["achievements"]["gallop"] = table.getElementsByClassName("left")[0].getElementsByClassName("genetic_stats")[3].textContent.trim()
    horseData["achievements"]["posture"] = table.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[0].textContent.trim()
    horseData["achievements"]["head"] = table.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[1].textContent.trim()
    horseData["achievements"]["neck"] = table.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[2].textContent.trim()
    horseData["achievements"]["back"] = table.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[3].textContent.trim()
    horseData["achievements"]["shoulders"] = table.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[4].textContent.trim()
    horseData["achievements"]["frontlegs"] = table.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[5].textContent.trim()
    horseData["achievements"]["hindquarters"] = table.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[6].textContent.trim()
    horseData["achievements"]["socks"] = table.getElementsByClassName("right")[0].getElementsByClassName("genetic_stats")[7].textContent.trim()

    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}

const getOffspringData = () => {
    if (!horseData["offsprings"]) {
        horseData["offsprings"] = {};
    }
    tab = document.getElementById(tabList["OFFSPRING"])
    horseData["offsprings"]["count"] = tab.getElementsByClassName("stable_block")[0].getElementsByClassName("row_960").length

    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}

const getHealthData = () => {
    if (!horseData["health"]) {
        horseData["health"] = {};
    }
    tab = document.getElementById(tabList["HEALTH"])

    textList = tab.getElementsByTagName("p")[0].innerHTML.split("<br>")
    try {
        horseData["health"]["fertility"] = textList[0].split("</strong>")[1].trim()
    } catch {
        horseData["health"]["fertility"] = "unknown"
    }
    try {
        horseData["health"]["colicResistance"] = textList[4].split("</strong>")[1].trim()
        horseData["health"]["hoofQuality"] = textList[5].split("</strong>")[1].trim()
        horseData["health"]["backProblems"] = textList[6].split("</strong>")[1].trim()
        horseData["health"]["respiratoryDisease"] = textList[7].split("</strong>")[1].trim()
        horseData["health"]["resistanceToLameness"] = textList[8].split("</strong>")[1].trim();
    } catch {
        horseData["health"]["colicResistance"] = "unknown";
        horseData["health"]["hoofQuality"] = "unknown";
        horseData["health"]["backProblems"] = "unknown";
        horseData["health"]["respiratoryDisease"] = "unknown";
        horseData["health"]["resistanceToLameness"] = "unknown";
    }

    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}

const getUpdateData = () => {
    if (!horseData["update"]) {
        horseData["update"] = {};
    }
    tab = document.getElementById(tabList["UPDATE"])

    storage.saveHorseData(document.getElementById("hid").value.trim(), horseData);
}