function LoadArticle() {
    xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            BuildArticle(this.responseXML);
        }
    };
    xmlRequest.open("GET", `articles/${document.getElementsByTagName("article")[0].dataset.article}.xml`, true);
    xmlRequest.send();
}

function BuildArticle(articleDoc) {
    body = document.getElementsByTagName("article")[0];
    content = Array.from(articleDoc.documentElement.childNodes).filter((node) => node.nodeType == 1);
    for (const item of content) {
        switch (item.nodeName) {
            case "title":
                body.append(document.createElement("h1"));
                body.childNodes[body.childNodes.length - 1].append(item.innerHTML);
                break;
        
            case "section":
                body.append(document.createElement("h2"));
                body.childNodes[body.childNodes.length - 1].append(item.innerHTML);
                break;
                
            case "paragraph":
                body.append(document.createElement("p"));
                body.childNodes[body.childNodes.length - 1].append(
                    document.createElement("span"),
                    item.innerHTML
                );
                body.childNodes[body.childNodes.length - 1].childNodes[0].classList.add("paragraph-indent");
                break;
            
            default:
                console.error(`${item.nodeName}is not a valid node type.`);
                break;
        }
    }
}

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
    document.getElementsByTagName("article")[0].classList.toggle(`article-${elementID}-hidden`);
    document.getElementsByTagName("article")[0].classList.toggle(`article-${elementID}-visible`);
    document.getElementsByTagName("header")[0].classList.toggle(`header-${elementID}-hidden`);
    document.getElementsByTagName("header")[0].classList.toggle(`header-${elementID}-visible`);
    document.getElementById("header-fade").classList.toggle(`header-${elementID}-hidden`);
    document.getElementById("header-fade").classList.toggle(`header-${elementID}-visible`);
    document.getElementById("footer-fade").classList.toggle(`footer-${elementID}-hidden`);
    document.getElementById("footer-fade").classList.toggle(`footer-${elementID}-visible`);
}

LoadArticle();
IndentAll();