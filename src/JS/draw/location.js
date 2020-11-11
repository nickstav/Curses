import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { gridDimension } from '../constants/canvasSize.js';
import { tools } from '../constants/toolsList.js';

// function to return the coordinates of the grid square at which the mouse is at
function getGridLocation(mousePosition) {
    return {
        x: Math.floor(mousePosition.x / gridDimension.x),
        y: Math.floor(mousePosition.y / gridDimension.y)
    }
}

function highlightSquares(){
    let context = get(cursesCanvas).context;
    let currentLocation = get(cursesCanvas).mousePosition;
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
        let toolSelected = get(cursesCanvas).tool;
        let progressBarInfo = {
            showPerc: get(cursesCanvas).showProgressPercentage,
            numberOfBars: get(cursesCanvas).sizeOfProgressBar
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