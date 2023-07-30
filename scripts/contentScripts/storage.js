var storage = {
  saveHorseData: function (item, data) {
    chrome.runtime.sendMessage(
      {
        mode: "set",
        type: "horse",
        item: item,
        data: data,
      },
      function (response) {}
    );
  },
  saveHorseToolSettings: function (data) {
    chrome.runtime.sendMessage(
      {
        mode: "set",
        type: "config",
        subType: "tool",
        data: data,
      },
      function (response) {}
    );
  },
  getHorseData: function (item, callback) {
    chrome.runtime.sendMessage(
      {
        mode: "get",
        type: "horse",
        item: item,
      },
      callback
    );
  },
  getHorseRandomName: function (gender, callback) {
    chrome.runtime.sendMessage(
      {
        mode: "get",
        type: "name",
        gender: gender,
      },
      callback
    );
  },
  getHorseConfig: function (callback) {
    chrome.runtime.sendMessage(
      {
        mode: "get",
        type: "config",
      },
      callback
    );
  },
};

const trainingTypes = [
  "Dressage",
  "Jumping",
  "Reining",
  "Eventing",
  "Endurance",
  "Racing",
  "Driving",
];

const trainingToShort = {
  "Basic Training": "bat",
  Dressage: "dre",
  "Western Reining": "rei",
  Reining: "rei",
  "Flat Racing": "rac",
  Racing: "rac",
  Dressage: "dre",
  Driving: "dri",
  Endurance: "end",
  Eventing: "eve",
  "Show Jumping": "jum",
  Jumping: "jum",
};

const trainingLevelsToShorts = {
  //Basic
  "Handling": "Base1",
  "Basic Commands": "Base2",
  "Ground Training": "Base3",
  "Riding": "Base4",
  //Dressage
  "Training Level": "TrL",
  "First Level": "FiL",
  "Second Level": "SeL",
  "Third Level": "ThL",
  "Fourth Level": "FoL",
  "Prix. St. George": "PSG",
  "Intermediate I": "INT1",
  "Intermediate II": "Int2",
  "Grand Prix": "GrP",
  //Driving
  "Training Level": "TrL",
  "First Level": "FiL",
  "Second Level": "SeL",
  "Third Level": "ThL",
  "Fourth Level": "FoL",
  "CAI - B": "CAI-B",
  "CAI - A": "CAI-A",
  "Championships": "Champ",
  //Endurance
  "First Level": "FiL",
  "Second Level": "SeL",
  "Third Level": "ThL",
  "Fourth Level": "FoL",
  "CEI 1": "CEI1",
  "CEI 2": "CEI2",
  "CEI 3": "CEI3",
  "CEI 4": "CEI4",
  //Eventing
  "Training Level": "TrL",
  "First Level": "FiL",
  "Second Level": "SeL",
  "Third Level": "ThL",
  "Fourth Level": "FoL",
  "CC 1": "CC1",
  "CC 2": "CC2",
  "CC 3": "CC3",
  "CC 4": "CC4",
  //Racing
  "Routine 1": "R1",
  "Routine 2": "R2",
  "Routine 3": "R3",
  "Routine 4": "R4",
  "Routine 5": "R5",
  //Jumping
  "Training Level": "TrL",
  "First Level": "FiL",
  "Second Level": "SeL",
  "Third Level": "ThL",
  "Fourth Level": "FoL",
  "IRC 1": "IRC1",
  "IRC 2": "IRC2",
  "IRC 3": "IRC3",
  "IRC 4": "IRC4",
  "Grand Prix": "GrP",
  //Reining
  "Training Level": "TrL",
  "First Level": "FiL",
  "Second Level": "SeL",
  "Third Level": "ThL",
  "Fourth Level": "FoL",
  "ISC 1": "ISC1",
  "ISC 2": "ISC2",
  "ISC 3": "ISC3",
  "ISC 4": "ISC4",
  "Grand Prix": "GrP",
  "Base Complete": "BaseC",
  "Finish": "Fin",
};

const tabList = {
  SUMMARY: "tab_summary2",
  TRAINING: "tab_training2",
  GENETICS: "tab_genetics2",
  ACHIEVEMENTS: "tab_achievements2",
  OFFSPRING: "tab_offspring2",
  HEALTH: "tab_health2",
  UPDATE: "tab_update2",
};
