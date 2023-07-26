const SKETCH_CONTAINER_SIZE = 500;


const gridDiv = document.querySelector(".grid-container");
const gridArray = [];
let gridDimension = 16;
const getCellSize = () => SKETCH_CONTAINER_SIZE / gridDimension; 
let penColor = "black";

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

            cellDiv.addEventListener('click', () => {
                penColor = colorSelector.value;
                cellDiv.style.backgroundColor = penColor;
            });
        }
    }
}


const colorSelector = document.querySelector("input#color-selector");
const eraserButton = document.querySelector(".bt#eraser");
let previousColor = colorSelector.value;
eraserButton.addEventListener('click', () => {
    console.log(previousColor);
    eraserButton.classList.toggle("toggle-on");
    if (eraserButton.classList.contains("toggle-on")) {
        previousColor = colorSelector.value;
        penColor = "#ffffff";
        colorSelector.value = "#ffffff"
    }
    else {
        colorSelector.value = previousColor;
        penColor = previousColor;
    }
});



drawGrid(gridDimension);
