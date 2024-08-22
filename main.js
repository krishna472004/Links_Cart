let input = document.getElementById("input");
let saveInp = document.querySelector(".btn-inp");
let output = document.querySelector("ul");
let del = document.querySelector(".delete");
let cop = document.querySelector(".copy");
let tab = document.querySelector(".tab");
let list = [];
let leads = JSON.parse(localStorage.getItem("Links"));

if (leads) {
    list = leads;
    render();
}

saveInp.addEventListener("click", function() {
    list.push(input.value);
    localStorage.setItem("Links", JSON.stringify(list));
    render();
});

function render() {
    let text = "";
    for (let i = 0; i < list.length; i++) {
        text += `
        <li><a href="${list[i]}" target="_blank">${list[i]}</a></li>
        `;
    }
    output.innerHTML = text;
}

del.addEventListener("click", function() {
    list = [];
    render();
    localStorage.clear();
});

cop.addEventListener("click", function() {
    let clip = list.join("\n\n");
    navigator.clipboard.writeText(clip);
});

tab.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            list.push(tabs[0].url);
            localStorage.setItem("Links", JSON.stringify(list));
            render();
        }
    });
});

// Initial render call
render();
