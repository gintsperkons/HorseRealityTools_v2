var horseData = {};
var currentHorse;
var currentTab;
var lastValue = 0;
var failCount = 0;



const getRandomName = (gender) => {
    if (gender.trim() === "Stallion".trim()) {
        return randomBoyName;
    }
    return randomGirlName;
}

const getBestTraining = () => {
    advice = horseData["genetics"]["advice"];
    sentenceList = advice.trim().split(". ");
    lastWord = "";
    while (lastWord === "") {
        lastSentence = sentenceList.pop();
        lastSentence = lastSentence.replaceAll(",", "").replaceAll(".", "").replaceAll("-", "").replaceAll("'", "")
        for (const word of lastSentence.split(" ")) {
            for (const tt of trainingTypes) {
                if (word.trim() === tt.trim()) {
                    lastWord = tt.trim();
                }
            }

        }
    }

    return lastWord;
}

const achevementCountText = (template, base, num) => {
    if (num == 0) {
        return template.replace(base, "")
    }
    return template.replace(base, base.replace("{", "").replace("}", "").toUpperCase() + num);
}

const createErrorBoard = () => {
    if (!document.getElementById("errorMassagesUpdateTab")) {
        var element = document.createElement("p");
        element.id = "errorMassagesUpdateTab";
        document.getElementById("tab_update2").getElementsByClassName("table_con")[0].appendChild(element);
    }
}

const templateToText = (template) => {
    var errorText = ""
        // overall
    horseName = horseData["name"];
    template = template.replace("{name}", horseName);
    rName = getRandomName(horseData["gender"]);
    template = template.replace("{rname}", rName);
    //genetics
    try {
        gp = horseData["genetics"]["geneticPotential"];
        template = template.replace("{gp}", gp);
        document.getElementById("errorMassagesUpdateTab").textContent = "";
    } catch (error) {
        errorText = "Can not get genetics information!";
        console.log(error);
    }

    //training
    try {
        ctl = trainingLevelsToShorts[horseData["training"]["currentTrainingLevel"]];
        template = template.replace("{ctl}", ctl);
        cobt = ""
        if (horseData["training"]["currentTraining"].trim() === "Basic Training".trim()) {
            cobt = getBestTraining().trim();
        } else {
            cobt = horseData["training"]["currentTraining"].trim();
        }
        template = template.replace("{cobt}", trainingToShort[cobt]);
    } catch (error) {
        errorText = "Can not get training information!";
        console.log(error);
    }
    //achievements
    vg = 0;
    g = 0;
    a = 0;
    ba = 0;
    p = 0;
    try {
        for (const achieve of Object.keys(horseData["achievements"])) {
            if (horseData["achievements"][achieve].trim() === "Very good") {
                vg += 1;
            }
            if (horseData["achievements"][achieve].trim() === "Good") {
                g += 1;
            }
            if (horseData["achievements"][achieve].trim() === "Average") {
                a += 1;
            }
            if (horseData["achievements"][achieve].trim() === "Below average") {
                ba += 1;
            }
            if (horseData["achievements"][achieve].trim() === "Poor") {
                p += 1;
            }
        }
        template = achevementCountText(template, "{vg}", vg);
        template = achevementCountText(template, "{g}", g);
        template = achevementCountText(template, "{a}", a);
        template = achevementCountText(template, "{ba}", ba);
        template = achevementCountText(template, "{p}", p);
        template = template.replace("  ", " ").replace("   ", " ").replace("    ", " ").replace("     ", " ");
        document.getElementById("errorMassagesUpdateTab").textContent = "";
    } catch (error) {
        errorText = "Can not get achievements information!";
        console.log(error);
    }
    //health
    //offspring
    //summary
    //update

    createErrorBoard();
    document.getElementById("errorMassagesUpdateTab").textContent = errorText;
    return template
}



const addTemplateElements = (parent, conf, confName) => {



    el = document.createElement("option")
    el.textContent = "Select template"
    el.value = horseData["name"]
    if (confName === "taglineTemplate") {
        el.value = horseData["tagline"]
    }
    parent.appendChild(el)
    if (conf && conf[confName]) {
        for (const templateKey of Object.keys(conf[confName])) {
            template = conf[confName][templateKey]
            el = document.createElement("option")
            el.textContent = templateToText(template)
            el.value = template
            parent.appendChild(el)
        }

    }

}

const addUpdateData = (conf) => {
    if (!conf) {
        return
    }
    console.log("update")
    tab = document.getElementById(tabList["UPDATE"]);

    nameRow = tab.getElementsByClassName("even")[0];
    nameRowChildListNames = []
    for (const child of nameRow.childNodes) {
        nameRowChildListNames.push(child.localName)
    }

    if (!nameRowChildListNames.includes("select")) {
        nameList = document.createElement("select");
        nameList.style.width = "150px"
        nameList.setAttribute("id", "nameTemplateList");
        nameList.addEventListener("change", (r) => {
            val = document.querySelector("option[value='" + r.target.value + "']").textContent.trim()
            if (val === "Select template") {
                val = horseData["name"]
            }
            document.getElementById("changename").value = val;
        });
        nameRow.appendChild(nameList);
        addTemplateElements(nameList, conf["templates"], "nameTemplate")
    } else {
        nameList = document.getElementById("nameTemplateList");
        nameList.innerHTML = "";
        addTemplateElements(nameList, conf["templates"], "nameTemplate")
    }
    taglineRow = tab.getElementsByClassName("odd")[0];
    taglineRowChildListNames = []
    for (const child of taglineRow.childNodes) {
        taglineRowChildListNames.push(child.localName)
    }
    if (!taglineRowChildListNames.includes("select")) {
        taglineList = document.createElement("select");
        taglineList.style.width = "150px"
        taglineList.setAttribute("id", "taglineTemplateList");
        taglineList.addEventListener("change", (r) => {
            val = document.querySelector("option[value='" + r.target.value + "']").textContent.trim()
            if (val === "Select template") {
                val = horseData["tagline"]
            }
            document.getElementById("changetagline").value = val;
        });
        taglineRow.appendChild(taglineList);
        addTemplateElements(taglineList, conf["templates"], "taglineTemplate")
    } else {
        taglineList = document.getElementById("taglineTemplateList");
        taglineList.innerHTML = "";
        addTemplateElements(taglineList, conf["templates"], "taglineTemplate")
    }



}

function addUpdateDataWhenReady(event) {
    var intervalVal = setInterval(() => {
        if (document.getElementById("tab_update2").textContent.trim() != "") {
            clearInterval(intervalVal);
            storage.getHorseConfig(addUpdateData);
            addListeners.addTabUpdater();
        }
    }, 10);
}



function getUpdateTab() {
    if (document.getElementById("tab_update2").textContent.trim() != "") {
        storage.getHorseConfig(addUpdateData);
    }
    document.getElementById("tab_update").addEventListener("click", addUpdateDataWhenReady, { "once": true })
};




var templates = {
    callNeeded: function(result) {
        getUpdateTab();
    },
    updateTab: function(tab) {
        if (tab == "update") {
            storage.getHorseConfig(addUpdateData);
        }
    }
}