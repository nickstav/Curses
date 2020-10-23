import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';

// function to return the coordinates of the grid square at which the mouse is at
function getGridLocation(mousePosition) {
    let gridDimension = get(cursesCanvas).gridDimension;
    return {
        x: Math.floor(mousePosition.x / gridDimension.x),
        y: Math.floor(mousePosition.y / gridDimension.y)
    }
}

// function to highlight the grid location that the cursor is currently over
function highlightSquare(){
    let context = get(cursesCanvas).context;
    let gridDimension = get(cursesCanvas).gridDimension;
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

// function to create a matrix of 0s that correspond to the grid of m x n squares
function createMatrix(dimensions) {
    let result = []
    for(let i = 0; i < dimensions.y; i++) {
        result.push(new Array(dimensions.x).fill(0))
    }
    return result
}

export { getGridLocation, highlightSquare, createMatrix }