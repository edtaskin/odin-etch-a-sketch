const SKETCH_CONTAINER_SIZE = 500;


const gridDiv = document.querySelector(".grid-container");
const gridArray = [];
let gridDimension = 16;
const getCellSize = () => SKETCH_CONTAINER_SIZE / gridDimension; 

function drawGrid(gridDimension) {
    const cellSize = getCellSize();
    console.log(cellSize);
    for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.style.width = `${cellSize}px`;
            cellDiv.style.height = `${cellSize}px`;
            
            cellDiv.classList.add("cell");
            gridArray.push(cellDiv);
            gridDiv.appendChild(cellDiv);
        }
    }
}


drawGrid(gridDimension);
