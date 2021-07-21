
let rowNumberSection = document.querySelector(".row-number-section");
let lastCell;//it contains address of  the cell that is selected
let formulaBarSelectionCellArea = document.querySelector(".selected-cell-div");
let cellSection = document.querySelector(".cell-section");
let columnTagSection = document.querySelector(".column-tag-section");
let dataObj = {};
//writing formula in formula bar
let formulaInput = document.querySelector(".formula-input-section");
formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        let typedFormula = e.currentTarget.value;

        if (lastCell != undefined) {
            let selectedCellAddress = lastCell.getAttribute("data-address");
            let cellObj = dataObj[selectedCellAddress];
            cellObj.formula = typedFormula;
            let upstream = cellObj.upstream;
            for (let i = 0; i < upstream.length; i++) {
                removeFromDownstream(upstream[i]);
            }
            cellObj.upstream = [];
            //filling our upstream 
            let splitedFormula = typedFormula.split(" ");//assumption is that our formula will have space after each character


            for (let i = 0; i < splitedFormula.length; i++) {
                if (splitedFormula[i] != '+' && splitedFormula[i] != '*' && splitedFormula[i] != '/' && splitedFormula[i] != '-' && isNaN(splitedFormula[i])) {
                    cellObj.upstream.push(splitedFormula[i]);
                    addToDownstream(splitedFormula[i], selectedCellAddress);
                }
            }
            updateCell(selectedCellAddress);


            console.log(cellObj);




        }
    }
})
//for scrolling the row no. and culumns tag with cells
cellSection.addEventListener("scroll", function (e) {
    rowNumberSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;

    columnTagSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
})
for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.classList.add("row-number");
    div.innerText = i;
    rowNumberSection.append(div);
}
//column no added A B C______
for (let i = 0; i < 26; i++) {
    let char = String.fromCharCode(65 + i);
    let div = document.createElement("div");
    div.classList.add("column-number-section");
    div.innerText = char;
    columnTagSection.append(div);
}
//creating cell
for (let i = 1; i <= 100; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    //for creating cell of a particular row
    for (let j = 0; j < 26; j++) {
        let char = String.fromCharCode(65 + j);
        let celldiv = document.createElement("div");
        let cellAddress = char + i;
        // putting a object of this address in dataobje
        dataObj[cellAddress] = {
            value: undefined,
            formula: undefined,
            downstream: [],
            upstream: [],
        }
        //adding event listener to every cells 
        celldiv.addEventListener("input", function (e) {
            //fetching the cell address of that cell on which we typed
            let currCellAddress = e.currentTarget.getAttribute("data-address");
            //fetching object of that cell by cell addreess that is the key of that object
            let currCellObj = dataObj[currCellAddress];
            //setting the typed value to its value attribute
            currCellObj.value = e.currentTarget.innerText;
            currCellObj.formula = undefined;
            //now for removing this cell toothers downstream we go to each member of upstream and for each
            // members downstream remove this
            let currUpstream = currCellObj.upstream;
            //lopping on upstream
            for (let k = 0; k < currUpstream.length; k++) {
                // a fuction call that remove current cell from the downsteam of its uostream member
                removeFromDownstream(currUpstream[k], currCellAddress);
            }
            currCellObj.upstream = [];
            let currDownstream = currCellObj.downstream;

            for (let i = 0; i < currDownstream.length; i++) {
                updateCell(currDownstream[i]);
            }
            dataObj[currCellObj] = currCellObj;
            console.log(currCellObj);
            console.log(dataObj);
        })
        celldiv.classList.add("cell");
        celldiv.contentEditable = true;
        celldiv.setAttribute("data-address", cellAddress);
        celldiv.setAttribute("contenteditable", "true");
        celldiv.addEventListener("click", function (e) {
            if (lastCell != undefined) {
                lastCell.classList.remove("cell-selected");

            }
            e.currentTarget.classList.add("cell-selected");
            lastCell = e.currentTarget;
            let currCellAddress = e.currentTarget.getAttribute("data-address");
            formulaBarSelectionCellArea.innerText = currCellAddress;
        })
        rowDiv.append(celldiv)

    }
    cellSection.append(rowDiv);
}
//loadimg again sheet from local storage
if (localStorage.getItem("sheet"))//if my sheet exist and not empty
{
    dataObj = JSON.parse(localStorage.getItem("sheet"));
    for (let x in dataObj) {
        let cell = document.querySelector(`[data-address=${x}]`);
        if (dataObj[x].value != undefined) {
            cell.innerText = dataObj[x].value;
        }
    }
}
function removeFromDownstream(parentCell, childCell) {   //parent cell is member of upstream 
    //childcell is that cell which have to be deleted 
    let parentDownStream = dataObj[parentCell].downstream;
    let filteredDownStream = [];

    for (let i = 0; i < parentDownStream.length; i++) {
        if (parentDownStream[i] != childCell) {
            //creating new downstream without child cell 
            filteredDownStream.push(childCell);
        }
    }
    //assing downstream new created downstream without child cell
    dataObj[parentCell].downstream = filteredDownStream;
}
//this function update a cell     if the cells which are using by its formula changes
//for that we need to go through its downstream cells and fetch the new values of that cell
function updateCell(cell) {
    let cellObj = dataObj[cell];
    let upstream = cellObj.upstream;
    let formula = cellObj.formula;
    //valObj will contain all cells of downstream as key and their new values as value
    // {
    //     A1:20,
    //     B1:30
    // }
    let valObj = {};
    for (let i = 0; i < upstream.length; i++) {
        let cellValue = dataObj[upstream[i]].value;
        valObj[upstream[i]] = cellValue;
        console.log(valObj);
    }
    //we will loop through valObj and replace the cellAddress with their value
    //before A1+B2;
    //after 20+30
    // console.log("valocj"+valObj);
    for (let key in valObj) {
        formula = formula.replace(key, valObj[key]);
    }
    //it will calulate mathmatical values of that formula
    let newValue = eval(formula);
    //setting new calculated value by formula to its value attribute
    dataObj[cell].value = newValue;
    //setting the new value on ui on the given cell
    document.querySelector(`[data-address=${cell}]`).innerText = newValue;

    //
    let downstream = cellObj.downstream;
    for (let i = 0; i < downstream.length; i++) {
        updateCell(downstream[i]);
    }
}
//add in downstream add chaid in parent downstream
function addToDownstream(parent, child) {
    dataObj[parent].downstream.push(child);

}

