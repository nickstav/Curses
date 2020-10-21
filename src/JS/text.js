import { get } from 'svelte/store';
import { cursesCanvas } from './store.js';
import { getGridLocation } from './placement.js';

function writeText() {
    let currentLocation = get(cursesCanvas).mousePosition;
    
    let gridLocation = getGridLocation(currentLocation);
    highlightSquare(gridLocation);

    let userText = prompt("Enter text/characters:");
    addTextToCanvas(userText, gridLocation);
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

function addTextToCanvas(text, location) {
    let context = get(cursesCanvas).context;
    let gridDimension = get(cursesCanvas).gridDimension;
    context.fillStyle = 'black';
    context.font = "17px Consolas";

    for (let i = 0; i < text.length; i++) {
        //get the next character in the string
        let character = text.charAt(i);
    
        let Xcoordinate = (i + location.x) * gridDimension.x;
        // y location needs to be the square below as axis is measured from the top
        let Ycoordinate = (location.y + 1) * gridDimension.y;

        context.fillText(character, Xcoordinate, Ycoordinate);
    };
}

export { writeText }