var addListeners = {
    addListeners: function() {
        for (const tab of document.getElementsByClassName("tabclick")) {
            tab.addEventListener("click", handleTabTitleClick);
        }
    },
    addTabUpdater: function() {
        document.getElementById("tab_update").addEventListener("click", (event) => {
            templates.updateTab("update");
        })
    }

}

function handleTabTitleClick(event) {
    var tabData = document.getElementById(event.target.id + "2");

    if (tabData.textContent.trim() == "") {
        var intervalVal = setInterval(() => {
            getTabData(intervalVal, event.target.id + "2");
        }, 500);
        return;
    }
    getTabData(intervalVal, event.target.id + "2");
}



function getTabData(intervalVal, tabName) {
    clearInterval(intervalVal);
    getHorseData.getTabDataBase(tabName);
}