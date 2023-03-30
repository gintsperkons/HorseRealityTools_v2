const isMyHorse = () => {
    var ownerName = document.getElementsByClassName("horse_left")[0].getElementsByClassName("right")[6].innerHTML.split("\n")[2].split("<br>")[0].trim()
    var profileName = document.getElementsByClassName("arrow")[0].textContent.trim()
    if (ownerName == profileName) {
        return true;
    }
    return false;
}