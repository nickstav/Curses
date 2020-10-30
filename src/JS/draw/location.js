import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { gridDimension } from '../constants/canvasSize.js';

// function to return the coordinates of the grid square at which the mouse is at
function getGridLocation(mousePosition) {
    return {
        x: Math.floor(mousePosition.x / gridDimension.x),
        y: Math.floor(mousePosition.y / gridDimension.y)
    }
}

// function to highlight the current grid square that the mouse is over
function showCurrentSquare(event, canvasElement) {
    cursesCanvas.updateMousePosition(event, canvasElement);
    //updateCanvas();
    highlightSquare();
}

// function to highlight the grid location that the cursor is currently over
function highlightSquare(){
    let context = get(cursesCanvas).context;
    let currentLocation = get(cursesCanvas).mousePosition;
    let gridLocation = getGridLocation(currentLocation);

    context.fillStyle = 'rgb(100, 149, 237, 0.2)';
    context.fillRect(
        gridLocation.x * gridDimension.x, 
        gridLocation.y * gridDimension.y, 
        gridDimension.x, 
        gridDimension.y
    );
    context.stroke();
}
/*
// function to clear the grid square of any previous characters before adding a character
function clearPreviousCharacter(gridLocation, gridDimension, context) {
    context.clearRect(
        gridLocation.x * gridDimension.x, 
        (gridLocation.y - 1) * gridDimension.y,
        gridDimension.x, 
        gridDimension.y
    );
    // note grid location is defined by the top corner. Text is added on top of this so we actually 
    // need to clear the rectangle above this point, hence the -1 correction 
    
}
*/
export { getGridLocation, showCurrentSquare, highlightSquare }