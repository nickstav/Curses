import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { getGridLocation } from '../draw/location.js';

// prompts user to enter text at a desired location, then saves that text and location to a store
function writeText() {
    let mouseLocation = get(cursesCanvas).mousePosition;
    let gridLocation = getGridLocation(mouseLocation);

    let userText = prompt("Enter text/characters:");
    addTextToStore(userText, gridLocation);
}

// save the entered text to objects store
function addTextToStore(text, location) {
    let textInfo = {
        text: text,
        location: location
    }
    canvasObjects.saveTextObject(textInfo);
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

export { writeText, highlightSquare }