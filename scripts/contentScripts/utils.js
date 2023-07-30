const isMyHorse = () => {
  var ownerName = document
    .getElementsByClassName("horse_left")[0]
    .getElementsByClassName("right")[6]
    .innerHTML.split("\n")[2]
    .split("<br>")[0]
    .trim();
  var profileName = document
    .getElementsByClassName("arrow")[0]
    .textContent.split("(")[0]
    .trim();
  if (ownerName == profileName) {
    return true;
  }
  return false;
};
const getAgeFromText = (text) => {
  if (text.includes("yr") || (text.includes("mo") && !text.includes("month"))) {
    var age = 0;
    ageTextParts = text.split(" ");
    for (const part of ageTextParts) {
      if (part.includes("yr")) {
        age += part.replace("yr", "").trim() * 12;
      }
      if (part.includes("mo")) {
        age += part.replace("mo", "").trim() * 1;
      }
    }
    return age;
  }
  if (text.includes("year") || text.includes("month")) {
    var age = 0;
    ageTextParts = text.split(",");
    for (const part of ageTextParts) {
      if (part.includes("year")) {
        age += part.split("year")[0].trim() * 12;
      }
      if (part.includes("month")) {
        age += part.split("month")[0].trim() * 1;
      }
    }
    return age;
  }
};
const colorAgeIfOver = (minAge, maxAge, ageColor, tabType) => {
  if (tabType == "stallPage") {
    var ageList = document.querySelectorAll("span.age");
    for (const item of ageList) {
      var age = getAgeFromText(item.textContent.trim());
      if (age >= minAge && age <= maxAge) {
        item.style.backgroundColor = ageColor;
      }
    }
  }
};
