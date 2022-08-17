/*\
|*|  ________    _________    __      ___    ___  ______   ______________
|*| ||  __|\ \  / /|| ___ \  /  \    ||  \  ||  ||  __  \ ||  __|||  __  \
|*| || |__  \ \/ / || |__| |/ /\ \   ||   \ ||  || |  \  ||| |__ || |  \  \
|*| ||  __|  \  /  ||  ___// /__\ \  ||    \||  || |   | |||  __||| |__/  /
|*| || |__  / /\ \ || |   /   __   \ ||  |\     || |__/  ||| |__ ||  __  \
|*| ||____|/_/__\_\||_|__/___|  |___\||__| \____||______/ ||____|||_|  \__\
\*/

async function buildExpanderHTML(container, urlData, toggleClass, dataAttr, dataAttrValue_1, dataAttrValue_2, url_reset, url_expander) {
    
    /* Variables definition
    *
    * container, '.classCss' of title clickeable to open the content
    * urlData, url of json file with data
    * toggleClass, 'classCss' defined in stylesheet for open state
    * dataAttr, 'data-name' name of the attribute where the values will be injected
    * dataAttrValue_1, 'value 1' value of the attribute that will be injected
    * dataAttrValue_2, 'value 2' value of the attribute that will be injected
    * url_reset, url of reset.css file
    * url_expander, url of expander.css file
    *
    */
    
    addStyleSheet(url_reset, url_expander); // Inject cssStyles tag in document.head
    const section = document.querySelector('.'+container);

    const url = await fetch(urlData);
    const data = await url.json();

    data.expander.forEach(item => {
        if (item.title != '') {
            section.innerHTML += `
                <article class="${container}__container">
                    <h4 class="${container}__container__title">${item.title}</h4>
                    <p class="${container}__container__content">${item.content}</p>
                </article>
            `
        }else {
            return;
        }
    })

    const parameters = {
        expanderTitle: `${container}__container__title`,
        expanderContent: `${container}__container__content`,
        toggleClass: toggleClass,
        dataAttr: dataAttr,
        dataAttrValue_1: dataAttrValue_1,
        dataAttrValue_2: dataAttrValue_2
    };
    toggleArrayItem(...Object.values(parameters)); // Set values for toggleAction
}
function addStyleSheet(url_reset, url_expander) {
    const head = document.head;
    const link_reset = document.createElement('link');
    link_reset.setAttribute('rel', 'stylesheet');
    link_reset.setAttribute('href', url_reset);
    const link_expander = document.createElement('link');
    link_expander.setAttribute('rel', 'stylesheet');
    link_expander.setAttribute('href', url_expander);
    head.appendChild(link_reset);
    head.appendChild(link_expander);
}
function toggleArrayItem(expanderTitle, expanderContent, toggleClass, dataAttr, dataAttrValue_1, dataAttrValue_2) {
    const array_1 = document.querySelectorAll('.'+expanderTitle);
    const array_2 = document.querySelectorAll('.'+expanderContent);
    array_1.forEach((item, index) => {
        item.setAttribute(dataAttr, dataAttrValue_1);
        item.onclick = () => {
            array_2[index].classList.toggle(toggleClass);
            if (array_2[index].classList.contains(toggleClass)) {
                item.setAttribute(dataAttr, dataAttrValue_2);
            }else {
                item.setAttribute(dataAttr, dataAttrValue_1);
            }
        }
    })
}

/*\
|*| STEPS:
|*| --- Create an HTML element inside of body document (it is suggested to use SECTION tag)
|*| --- Add to that element a class called "expander" in lowercase
|*| --- Check below in Parameters Object the paths of CSS and JSON files and change as any you need
|*| --- Add the SCRIPT tag with this file.js to the end of the HTML body document
|*| 
|*| --- NOTE: 
|*| --- --- dataAttrValue are UNICODE characters, if you want to use another charset here i let you the URL where you can see more:
|*| --- --- https://www.htmlsymbols.xyz/unicode
\*/

const parameters = {
    container: "expander",
    urlData: "../json/data_expander.json",
    toggleClass: "open",
    dataAttr: "data-content",
    dataAttrValue_1: "\u{25BC}", 
    dataAttrValue_2: "\u{25B2}",
    url_reset: "./css/reset.css",
    url_expander: "./css/expander.css"
}
buildExpanderHTML(...Object.values(parameters))
