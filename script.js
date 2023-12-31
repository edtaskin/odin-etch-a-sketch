const SKETCH_CONTAINER_SIZE = 500;


const gridDiv = document.querySelector(".grid-container");
const gridArray = [];
let gridDimension = 16;
const getCellSize = () => SKETCH_CONTAINER_SIZE / gridDimension; 
let penColor = "black";


let mouseDown = false;
document.body.onmousedown = () => {
    console.log("mouse down");
    mouseDown = true;
};
document.body.onmouseup = () => {
    console.log("mouse up");
    mouseDown = false;
};

function drawGrid(gridDimension) {
    const cellSize = getCellSize();
    for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.style.width = `${cellSize}px`;
            cellDiv.style.height = `${cellSize}px`;
            
            cellDiv.classList.add("cell");
            gridArray.push(cellDiv);
            gridDiv.appendChild(cellDiv);
            cellDiv.addEventListener('mouseover', paintCell);
        }
    }
}

// TODO Rewrite
function paintCell(e) {
    console.log(mouseDown);
    if (!mouseDown) return;

    if (isButtonOn(colorPickerButton)) {
        const convertedHex = rgbToHex(e.target.style.backgroundColor); // Color selector element only accepts hexadecimal colors
        if (!convertedHex) {
            return;
        }
        colorSelector.value = convertedHex; 
        toggleSingleButton(colorPickerButton);
        return;
    }
    penColor = colorSelector.value;
    e.target.style.backgroundColor = penColor;
    if (isButtonOn(rainbowButton)) {
        penColor = getRandomColor();
        colorSelector.value = penColor;
    }
}

const colorSelector = document.querySelector("input#color-selector");
const eraserButton = document.querySelector(".bt#eraser");
let previousColor = colorSelector.value;
eraserButton.addEventListener('click', () => {
    resetToggleButtonsExcept(eraserButton);
    toggleButton(eraserButton);
    if (isButtonOn(eraserButton)) {
        previousColor = colorSelector.value;
        penColor = "#ffffff";
        colorSelector.value = "#ffffff"
    }
    else {
        colorSelector.value = previousColor;
        penColor = previousColor;
    }
});


const rainbowButton = document.querySelector(".bt#rainbow");
rainbowButton.addEventListener('click', () => {
    resetToggleButtonsExcept(rainbowButton);
    toggleButton(rainbowButton);
    if (isButtonOn(rainbowButton)) {
        penColor = getRandomColor();
        colorSelector.value = penColor;
    }
});

const clearButton = document.querySelector(".bt#clear");
clearButton.addEventListener('click', () => {
    clearGrid();
})

function clearGrid() {
    gridArray.forEach(cell => cell.style.backgroundColor = "#ffffff");
}

const getRandomColor = () => {
    const hexadecimal = "0123456789ABCDEF";
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
        randomColor += hexadecimal.charAt(Math.random() * 16);
    }
    return randomColor;
};

const colorPickerButton = document.querySelector(".bt#color-picker");
colorPickerButton.addEventListener("click", () => {
    resetToggleButtonsExcept(colorPickerButton);
    toggleButton(colorPickerButton);
});


const toggleButtons = [eraserButton, rainbowButton, colorPickerButton]; // TODO Add other buttons as needed

/*
Helper methods
*/
const resetToggleButtonsExcept = (onButton) => {
    toggleButtons.forEach(button => {
        if (button !== onButton && button.classList.contains("toggle-on")) {
            button.click();
        }
    });
}

const toggleSingleButton = (button) => {
    button.classList.toggle("toggle-on");
}

function rgbToHex(rgb) {
    const regexResult = rgb.match(/\d+/g);
    if (!regexResult || regexResult.length !== 3) {
      // Invalid RGB format
      return null;
    }
  
    const r = parseInt(regexResult[0], 10);
    const g = parseInt(regexResult[1], 10);
    const b = parseInt(regexResult[2], 10);
  
    const hexColor = '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    return hexColor;
  }
  

function isButtonOn(button) {
    return button.classList.contains("toggle-on");
}

function toggleButton(button) {
    button.classList.toggle("toggle-on");
}


  

drawGrid(gridDimension);
