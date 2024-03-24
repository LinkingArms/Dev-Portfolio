function IndentAll() {
    let paragraphs = document.getElementsByTagName("article")[0].getElementsByTagName("p");
    for (let i = 0; i < paragraphs.length; i++) {
        document.getElementsByTagName("article")[0].getElementsByTagName("p")[i].prepend(
            document.createElement("span")
        );
        document.getElementsByTagName("article")[0].getElementsByTagName("p")[i].getElementsByTagName("span")[0].classList.add("paragraph-indent");
    }
}

function openMenu(elementID) {
    document.getElementById(elementID).classList.toggle(elementID + "-hidden");
    document.getElementById(elementID).classList.toggle(elementID + "-visible");
    document.getElementsByTagName("article")[0].classList.toggle("article-" + elementID + "-hidden");
    document.getElementsByTagName("article")[0].classList.toggle("article-" + elementID + "-visible");
    document.getElementsByTagName("header")[0].classList.toggle("header-" + elementID + "-hidden");
    document.getElementsByTagName("header")[0].classList.toggle("header-" + elementID + "-visible");
    document.getElementById("header-fade").classList.toggle("header-" + elementID + "-hidden");
    document.getElementById("header-fade").classList.toggle("header-" + elementID + "-visible");
    document.getElementById("footer-fade").classList.toggle("footer-" + elementID + "-hidden");
    document.getElementById("footer-fade").classList.toggle("footer-" + elementID + "-visible");
}

IndentAll();