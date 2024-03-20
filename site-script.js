function openMenu(elementID) {
    document.getElementById(elementID).classList.toggle(elementID + "-hidden")
    document.getElementById(elementID).classList.toggle(elementID + "-visible")
}