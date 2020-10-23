import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { gridStatus } from '../stores/grid.js';
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

/* --------------- Writing text to the canvas once saved to the object store -------------- */

//write a string at its specified grid location
function writeTextToCanvas(text, location) {
    let gridDimension = get(cursesCanvas).gridDimension;
    let context = get(cursesCanvas).context;
    context.fillStyle = 'black';
    context.font = "15px Consolas";

    for (let i = 0; i < text.length; i++) {
        //get the next character in the string
        let character = text.charAt(i);

        let xCoordinate = getCoordinates(i, location, gridDimension).x;
        let yCoordinate = getCoordinates(i, location, gridDimension).y;

        //add the character to its assigned coordinates
        context.fillText(character, xCoordinate, yCoordinate);
    };

    // mark the relevant square as filled
    //gridStatus.markSquareAsFilled(location);
}

function getCoordinates(position, location, gridDimension) {
    let canvasWidth = get(cursesCanvas).canvasWidth;

    // y location needs to be the square below as axis measured from the top, plus any new lines started
    let yCorrection = 1 + Math.floor((position + location.x) / canvasWidth);

    return {
        // the remainder of gridSqaure / squareWidth will give the x coordinate of required
        x: ((position + location.x) % canvasWidth) * gridDimension.x,
        y: (location.y + yCorrection) * gridDimension.y
    }
}

export { writeText, writeTextToCanvas }