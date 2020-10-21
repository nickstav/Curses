import { get } from 'svelte/store';
import { cursesCanvas } from './store.js';
import { getGridLocation } from './placement.js';

export function writeText() {
    let currentLocation = get(cursesCanvas).mousePosition;
    
    let gridLocation = getGridLocation(currentLocation);
    highlightSquare(gridLocation);
}

function highlightSquare(gridLocation){
    let context = get(cursesCanvas).context;
    let gridDimension = get(cursesCanvas).gridDimension;

    context.fillStyle = 'rgb(100, 149, 237, 0.2)';
    context.fillRect(
        gridLocation.x * gridDimension.x, 
        gridLocation.y * gridDimension.y, 
        gridDimension.x, 
        gridDimension.y
    );
    context.stroke();
}