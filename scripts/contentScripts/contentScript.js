var horseData = {};
var randomGirlName = "";
var randomBoyName = "";



function handleDifferentPages(tabType) {
  if (tabType === "horsePage") {
    tabContent.horsePage(isMyHorse());
    keybinds.addHorsePageKeybinds();
  } else if (tabType === "stallPage") {
    storage.getHorseConfig((data) => {
      toolsData = data["data"]["horseToolConfig"]["tools"];
      colorAgeIfOver(
        toolsData["minAge"],
        toolsData["maxAge"],
        toolsData["ageColorSelect"],
        tabType
      );
    });
  } else if (tabType === "ridingschoolPage") {
    keybinds.addRidingSchoolPageKeybinds();
  } else if (tabType === "laboratoryPage") {
    keybinds.addLaboratoryPageKeybinds();

  } else if (tabType === "sellPage") {
    tabContent.salePage();
    console.log("salePage");
  } else if (tabType === "genericPage") {

  }
  keybinds.addGlobalKeybinds();
}

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
  sendResponse({ status: "success" });
  handleDifferentPages(obj.tabType);
});
