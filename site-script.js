function LoadArticle() {
  let xmlParser = new DOMParser();
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
  let body = document.getElementsByTagName("article")[0];
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
  let menu = document.getElementsByTagName("nav")[0];
  menu.append(document.createElement("ul"));
  menu = menu.childNodes[0];
  for (const item of articleList.categories) {
    let listItem = menu.childNodes.length;
    menu.append(document.createElement("li"));
    let menuItem = menu.childNodes[listItem];
    if (item.content.length == 1) {
      menuItem.append(document.createElement("button"));
      menuItem.childNodes[0].append(item.content[0].title);
      menuItem.id = `${item.content[0].title}-head`;
    } else {
      menuItem.append(document.createElement("div"));
      menuItem = menuItem.childNodes[0];
      menuItem.append(document.createElement("button"));
      menuItem.childNodes[0].append(item.name);
      menuItem.id = `${item.name}-head`;
      menuItem.childNodes[0].onclick = function () {
        openSubcategory(`${item.name}-head`);
      };
      menuItem.classList.add("submenu-hidden");
      menuItem.append(document.createElement("ul"));
      let menuList = menuItem.childNodes[1];
      for (const subitem of item.content) {
        let menuListItem = menuList.childNodes.length;
        menuList.append(document.createElement("li"));
        menuList.childNodes[menuListItem].append(
          document.createElement("button")
        );
        menuList.childNodes[menuListItem].childNodes[0].append(subitem.title);
      }
    }
  }
}

function openSubcategory(categoryName) {
  document.getElementById(categoryName).classList.toggle("submenu-hidden");
  document.getElementById(categoryName).classList.toggle("submenu-visible");
}

function openMenu(elementID) {
  let menu = document.getElementById(elementID);
  menu.classList.toggle(elementID + "-hidden");
  menu.classList.toggle(elementID + "-visible");
  for (
    let i = 0;
    i < document.getElementsByTagName("body")[0].childNodes.length;
    i++
  ) {
    let bodyElement = document.getElementsByTagName("body")[0].childNodes[i];
    if (bodyElement.nodeName.charAt(0) == "#") {
      continue;
    }
    if (
      bodyElement.classList.contains(
        `body-${elementID}-${
          menu.dataset.isVisible === "true" ? "visible" : "hidden"
        }`
      )
    ) {
      bodyElement.classList.toggle(`body-${elementID}-hidden`);
      bodyElement.classList.toggle(`body-${elementID}-visible`);
    }
  }
  menu.dataset.isVisible = menu.dataset.isVisible === "true" ? "false" : "true";
}

LoadArticle();
LoadArticleList();
