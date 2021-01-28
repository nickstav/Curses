import { get } from 'svelte/store';
import { projectStore } from '../stores/project.js';
import { gridDimension } from '../constants/canvasSize.js';
import { tools } from '../constants/toolsList.js';

// function to return the coordinates of the grid square at which the mouse is at
function getGridLocation(mousePosition) {

    // allow for any amount scrolled in the canvas container
    let canvasHolder = document.getElementById('canvasHolder');
    let xScrolledAmount = canvasHolder.scrollLeft;
    let yScrolledAmount = canvasHolder.scrollTop;
    
    return {
        x: Math.floor((mousePosition.x + xScrolledAmount) / gridDimension.x),
        y: Math.floor((mousePosition.y + yScrolledAmount) / gridDimension.y)
    }
}

// function to highlight relevant squares for text and progress bar tools
function highlightSquares(){
    let context = get(projectStore).context;
    let currentLocation = get(projectStore).mousePosition;
    let gridLocation = getGridLocation(currentLocation);

    let numberOfSquaresToFill = getNumberOfSquaresToHighlight();

    context.fillStyle = 'rgb(100, 149, 237, 0.2)';
    context.beginPath();
    context.fillRect(
        gridLocation.x * gridDimension.x,
        gridLocation.y * gridDimension.y, 
        gridDimension.x * numberOfSquaresToFill, 
        gridDimension.y
    );
    context.stroke();
}

function getNumberOfSquaresToHighlight() {
        let toolSelected = get(projectStore).tool;
        let progressBarInfo = {
            showPerc: get(projectStore).showProgressPercentage,
            numberOfBars: get(projectStore).sizeOfProgressBar
        }

        // define a varaible for the number of grid squares to highlight
        let numberOfSquaresToFill;

        if (toolSelected === tools.PROGRESS) {
            // show the full area of a progress bar object at current grid location
            if (progressBarInfo.showPerc) {
                numberOfSquaresToFill = progressBarInfo.numberOfBars + 4;
            } else {
                numberOfSquaresToFill = progressBarInfo.numberOfBars;
            }
        } else {
            // only highlight the square that the mouse is over
            numberOfSquaresToFill = 1;
        }

        return numberOfSquaresToFill;
}


export { getGridLocation, highlightSquares }