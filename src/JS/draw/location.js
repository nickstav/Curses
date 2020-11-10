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

function highlightSquare(){
    let context = get(cursesCanvas).context;
    let currentLocation = get(cursesCanvas).mousePosition;
    let gridLocation = getGridLocation(currentLocation);

    context.fillStyle = 'rgb(100, 149, 237, 0.2)';
    context.beginPath();
    context.fillRect(
        gridLocation.x * gridDimension.x, 
        gridLocation.y * gridDimension.y, 
        gridDimension.x, 
        gridDimension.y
    );
    context.stroke();
}

export { getGridLocation, highlightSquare }