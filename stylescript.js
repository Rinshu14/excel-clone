let allAlignmentOption = document.querySelectorAll(".align-cell-content span");
let allColorOption = document.querySelectorAll(".cell-color-options span")
let body = document.querySelector("body");
let file = document.querySelector(".file");

let leftAlign = allAlignmentOption[0];
let centerAlign = allAlignmentOption[1];
let rightAlign = allAlignmentOption[2];

let bgColorPicker = allColorOption[0];
let fontColorPicker = allColorOption[1];

leftAlign.addEventListener("click", function () {
    if (lastCell) {

        lastCell.style.textAlign = "left";
        let Address = lastCell.getAttribute("data-address");
        dataObj[Address].align = "left";
    }
})
centerAlign.addEventListener("click", function () {
    if (lastCell) {
        lastCell.style.textAlign = "center";
        let Address = lastCell.getAttribute("data-address");
        dataObj[Address].align = "center";
    }
})
rightAlign.addEventListener("click", function () {
    if (lastCell) {
        lastCell.style.textAlign = "right";
        let Address = lastCell.getAttribute("data-address");
        dataObj[Address].align = "right";
    }
})

bgColorPicker.addEventListener("click", function () {
    let coloPickerElement = document.createElement("input");
    coloPickerElement.type = "color";

    body.append(coloPickerElement);
    coloPickerElement.click();

    coloPickerElement.addEventListener("input", function (e) {
        if (lastCell) {
            lastCell.style.backgroundColor = e.currentTarget.value;
            let address = lastCell.getAttribute("data-address");
            dataObj[address].bgColor = e.currentTarget.value;
        }
    })

})
fontColorPicker.addEventListener("click", function () {
    let colorPickerElement = document.createElement("input");
    colorPickerElement.type = "color";
    body.append(colorPickerElement);
    colorPickerElement.click();

    colorPickerElement.addEventListener("input", function (e) {
        console.log(e.currentTarget.value);
        if (lastCell) {
            lastCell.style.color = e.currentTarget.value;
            let address = lastCell.getAttribute("data-address");
            dataObj[address].color = e.currentTarget.value;
        }
    });
});
file.addEventListener("click", function () {
    let isopen = file.getAttribute("isopen")
    
    if (isopen == "false") {
        
        let dropdown = document.createElement("div");
        dropdown.innerHTML = `<div>SAve</div>
        <div>clear</div>`;
        dropdown.classList.add("file-dropdown");
        file.append(dropdown);
        file.setAttribute("isopen", "true");
    }
    else {
        document.querySelector(".file-dropdown").remove();
        file.setAttribute("isopen", "false");
    }

})