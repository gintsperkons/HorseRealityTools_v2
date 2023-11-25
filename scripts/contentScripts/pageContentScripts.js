
//gets tab content data and calls some functions
var tabContent = {
    horsePage: function (isMine) {
        storage.getHorseData(
            document.getElementById("hid").value.trim(),
            function (data) {
                if (isMine) {
                    storage.getHorseRandomName("mare", function (data) {
                        randomGirlName = data["name"];
                    });
                    storage.getHorseRandomName("stallion", function (data) {
                        randomBoyName = data["name"];
                    });

                    storage.getHorseConfig(tools.callNeeded);
                    templates.callNeeded();
                }

                //merge horse data
                const temp = horseData;
                horseData = Object.assign({}, temp, data);

                getHorseData.getTabDataBase("overAll");
                var intervalVal = setInterval(() => {
                    for (const tabData of document.getElementsByClassName("tabtext")) {
                        if (tabData.textContent.trim() != "") {
                            clearInterval(intervalVal);
                            getHorseData.getTabDataBase(tabData.id);
                        }
                    }
                }, 500);
            }
        );
        addListeners.addListeners();
    },
    salePage: function () {
        storage.getHorseConfig((data) => {
            horseConfig = data["data"]["horseToolConfig"];
            tools.setSaleDuration(data["data"]["horseToolConfig"]);
            if(data["data"]["horseToolConfig"]["tools"]["autoPriceFill"]){
                document.getElementById("price").value = calculateHorsePrice(horseData);
            }
        });
        if (document.getElementById("horseSelectForMarket").value) {
            addHorsePrice()
        }
        document.getElementById("horseSelectForMarket").addEventListener("change", function () {
            addHorsePrice()
        })


    },
};



const addHorsePrice = () => {
    storage.getHorseData(document.getElementById("horseSelectForMarket").value, function (data) {
        priceDiv = document.getElementById("calculatedPrice")
        const temp = horseData;
        horseData = Object.assign({}, temp, data);
        if (priceDiv) {
            priceDiv.textContent = "Calculated price: " + Math.round(calculateHorsePrice(horseData));
        } else {
            priceDiv = document.createElement("div");
            priceDiv.id = "calculatedPrice";
            priceDiv.textContent = "Calculated price: " + Math.round(calculateHorsePrice(horseData));
            document.getElementsByClassName("col-md-6")[0].appendChild(priceDiv);
        }
        if(horseConfig["tools"]["autoPriceFill"]){
            document.querySelector("[name='buyout_price']").value = Math.round(calculateHorsePrice(horseData)/1000)*1000;
        }
    })
}


const calculateHorsePrice = (horseData) => {
    let priceBaseTemplate = {
        "Trakehner Horse": { price: 10000, gp: 800, gpPower: 2.5, stallionMp: 0, mareMp: 0.25, gPower: 1.6, vg: 1500, g: 500, a: 250 },
        "Shire Horse": { price: 10000, gp: 595, gpPower: 2.5, stallionMp: 0, mareMp: 0.25, gPower: 1.6, vg: 1500, g: 500, a: 250 },
        "Camargue Horse": { price: 10000, gp: 605, gpPower: 2.5, stallionMp: 0, mareMp: 0.25, gPower: 1.6, vg: 1500, g: 500, a: 250 },
        "Pantaneiro": { price: 1000, gp: 600, gpPower: 2.5, stallionMp: 0, mareMp: 0.25, gPower: 1.6, vg: 1500, g: 500, a: 250 },
    }
    priceBase = horseConfig["tools"]["breedBasePriceSettings"];
    console.log(priceBase)
    const horsePriceConsts = priceBase[horseData["breed"]];
    let totalPrice = 0;
    totalPrice += horsePriceConsts["price"];
    let gpPriceDiff = horseData["genetics"]["geneticPotential"] - horsePriceConsts["gp"];
    let gpPrice = Math.pow(gpPriceDiff, horsePriceConsts["gpPower"]) * 2;
    totalPrice += gpPrice;
    let genderMultiplier = horseData["gender"] == "Stallion" ? horsePriceConsts["stallionMp"] : horsePriceConsts["mareMp"];
    totalPrice += gpPrice * genderMultiplier;
    const geneticsPriceItems = ["acceleration", "agility", "balance", "bascule", "pullingPower", "speed", "sprint", "stamina", "strength", "surefootedness"]
    geneticsPriceItems.forEach(gItem => {
        totalPrice += Math.pow(horseData["genetics"][gItem], horsePriceConsts["gPower"]) / 10;
    });
    const achievements = ["back", "canter", "frontlegs", "gallop", "head", "hindquarters", "neck", "posture", "shoulders", "socks", "trot", "walk"]
    achievements.forEach(aItem => {
        switch (horseData["achievements"][aItem]) {
            case "Very good":
                totalPrice += horsePriceConsts["vg"];
                break;
            case "Good":
                totalPrice += horsePriceConsts["g"];
                break;
            case "Average":
                totalPrice += horsePriceConsts["a"];
                break;
            default:
                0;
        }
    });
    return totalPrice;
}