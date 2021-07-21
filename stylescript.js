let allAlignmentOption = document.querySelectorAll(".align-cell-content span");
let allColorOption = document.querySelectorAll(".cell-color-options span")
let body = document.querySelector("body");
let file = document.querySelector(".file");
let title=document.querySelector(".title-section").innerText;
console.log(title);
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
        console.log(dataObj[Address])
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
        dropdown.innerHTML = `<div>SAVE</div>
        <div>CLEAR</div>`;
        dropdown.classList.add("file-dropdown");
        file.append(dropdown);
        file.setAttribute("isopen", "true");
    

let alloptions = dropdown.querySelectorAll("div");
console.log(alloptions)
let save = alloptions[0];
let clear = alloptions[1];
console.log(save);
console.log(clear);
save.addEventListener("click",function(){
    localStorage.setItem(title,JSON.stringify(dataObj));
})
clear.addEventListener("click",function(){
    localStorage.setItem(title,"");
})}
else {
    document.querySelector(".file-dropdown").remove();
    file.setAttribute("isopen", "false");
}
})

let allfontstyle=document.querySelectorAll(".bold-italics-underline>span")

let bold=allfontstyle[0];

let italic=allfontstyle[1];
let underline=allfontstyle[2];

bold.addEventListener("click",function(){
    if (lastCell) {
        
       
        let address = lastCell.getAttribute("data-address");
       
        
        if(dataObj[address].fontweight == "bold")
        {
            
            dataObj[address].fontweight = "normal" 
            lastCell.style.fontWeight ="normal";
        }
        else
        {
            dataObj[address].fontweight = "bold" 
        lastCell.style.fontWeight ="bold";
        }
        
    }   
})
italic.addEventListener("click",function(){
    if (lastCell) {
       


        let address = lastCell.getAttribute("data-address");
       
        
        if(dataObj[address].fontstyle == "italic")
        {
            
            dataObj[address].fontstyle = "normal" 
            lastCell.style.fontStyle ="normal";
        }
        else
        {
            dataObj[address].fontstyle = "italic" 
        lastCell.style.fontStyle ="italic";
        }



        
    }   
})
underline.addEventListener("click",function(){
    if (lastCell) {
        
        let address = lastCell.getAttribute("data-address");
       
        
        if(dataObj[address].textdecoration == "underline")
        {
            
            dataObj[address].textdecoration = "none" 
            lastCell.style.textDecoration ="none";
        }
        else
        {
            dataObj[address].textdecoration = "underline" 
        lastCell.style.textDecoration ="underline";
        }

 
        
        
        
        
        // lastCell.style.textDecoration ="underline";
        // let address = lastCell.getAttribute("data-address");
        // dataObj[address].underline = "underline";
    }   
})