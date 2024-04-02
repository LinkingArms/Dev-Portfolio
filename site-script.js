function LoadArticle() {
  xmlParser = new DOMParser();
  fetch(
    `articles/${
      document.getElementsByTagName("article")[0].dataset.article
    }.xml`
  )
    .then((file) => file.text())
    .then((article) =>
      BuildArticle(xmlParser.parseFromString(article, "text/xml"))
    );
}

function BuildArticle(articleDoc) {
  body = document.getElementsByTagName("article")[0];
  content = Array.from(articleDoc.documentElement.childNodes).filter(
    (node) => node.nodeType == 1
  );
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
        body.childNodes[body.childNodes.length - 1].childNodes[0].classList.add(
          "paragraph-indent"
        );
        break;

      default:
        console.error(`${item.nodeName} is not a valid node type.`);
        break;
    }
  }
}

function LoadArticleList() {
  fetch("articles.json")
    .then((file) => file.json())
    .then((articleList) => BuildArticleList(articleList));
}

function BuildArticleList(articleList) {
  menu = document.getElementsByTagName("nav")[0];
  menu.append(document.createElement("ul"));
  for (const item of articleList.categories) {
    menu.childNodes[1].append(document.createElement("li"));
    if (item.content.length == 1) {
      menu.childNodes[1].childNodes[
        menu.childNodes[1].childNodes.length - 1
      ].append(document.createElement("button"));
      menu.childNodes[1].childNodes[
        menu.childNodes[1].childNodes.length - 1
      ].childNodes[0].append(item.content[0].title);
    } else {
        
    }
  }
}

function openMenu(elementID) {
  document.getElementById(elementID).classList.toggle(elementID + "-hidden");
  document.getElementById(elementID).classList.toggle(elementID + "-visible");
  document
    .getElementsByTagName("article")[0]
    .classList.toggle(`article-${elementID}-hidden`);
  document
    .getElementsByTagName("article")[0]
    .classList.toggle(`article-${elementID}-visible`);
  document
    .getElementsByTagName("header")[0]
    .classList.toggle(`header-${elementID}-hidden`);
  document
    .getElementsByTagName("header")[0]
    .classList.toggle(`header-${elementID}-visible`);
  document
    .getElementById("header-fade")
    .classList.toggle(`header-${elementID}-hidden`);
  document
    .getElementById("header-fade")
    .classList.toggle(`header-${elementID}-visible`);
  document
    .getElementById("footer-fade")
    .classList.toggle(`footer-${elementID}-hidden`);
  document
    .getElementById("footer-fade")
    .classList.toggle(`footer-${elementID}-visible`);
}

LoadArticle();
LoadArticleList();
