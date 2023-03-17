export function setCurrentKeybinds(data) {
    console.log(data)
    var elementList = document.getElementsByClassName("keySetButton");
    for (const element of elementList) {
        if (!data[element.getAttribute("bindname")]) {
            element.textContent = "Click to set key"
            continue;
        }
        element.textContent = data[element.getAttribute("bindname")];

    }
}