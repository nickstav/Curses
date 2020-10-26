import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { updateCanvas } from '../draw/updateCanvas.js';
import { getGridLocation, clearPreviousCharacter, highlightSquare } from '../draw/location.js';

function highlightSquareForTextEntry(event, isDrawing, canvasElement) {
    //stop highlighting/clearing the canvas once a location has been selected
    if (isDrawing) return;

    cursesCanvas.updateMousePosition(event, canvasElement);
    updateCanvas();
    highlightSquare();
}

/* --------------------------------------------------------------------------------------------- */

// prompts user to enter text at a desired location, then saves that text and location to a store
function writeText() {
    let mouseLocation = get(cursesCanvas).mousePosition;
    let gridLocation = getGridLocation(mouseLocation);

    let userText = prompt("Enter text/characters:");
    if (userText !== null) {
        addTextToStore(userText, gridLocation);
    }
}

// save the entered text to objects store
function addTextToStore(text, location) {
    let objects = get(canvasObjects).numberOfObjects;

    let textInfo = {
        order: objects + 1,
        newLine: get(cursesCanvas).textNewLine,
        text: text,
        location: location
    }
    canvasObjects.saveTextObject(textInfo);
}

/* --------------- Writing text to the canvas once saved to the object store -------------- */

// write a string at its specified canvas location
function writeTextToCanvas(text, location, newLine) {
    let gridDimension = get(cursesCanvas).gridDimension;
    let context = get(cursesCanvas).context;
    context.fillStyle = 'black';
    context.font = "15px Consolas";

    for (let i = 0; i < text.length; i++) {
        //get the next character in the string
        let character = text.charAt(i);
        let gridSquare = getGridSquare(i, location, newLine);

        let coordinates = {
            x: gridSquare.x,
            y: gridSquare.y
        }

        //clear any previous characters in that grid square
        clearPreviousCharacter(coordinates, gridDimension, context);

        //add the character to its assigned coordinates
        context.fillText(character, coordinates.x * gridDimension.x, coordinates.y * gridDimension.y);
    };
}

// get the grid square coordinates for a given character in a text object
function getGridSquare(charPosition, location, newLine) {
    let canvasWidth = get(cursesCanvas).canvasWidth;

    //get new line and any required indentation
    let positionUpdate = getNewLines(charPosition, location, canvasWidth, newLine);

    return {
        x: positionUpdate.x,
        y: (1 + location.y + positionUpdate.y)
        // y location needs to be the square below (+1) as axis measured from the top,
    }
}

// calculate position (x,y) of text in case of indented/to margin new lines
function getNewLines(charPosition, location, canvasWidth, newLine) {
    // calculate the position of the character on the grid
    let xPosition;
    // calculate new lines started
    let yCorrection;

    if (newLine === "indented") {
        let indentedWidth = canvasWidth - location.x;
        yCorrection = Math.floor(charPosition / indentedWidth);
        // start a new line indented below the start of the text
        xPosition =  (charPosition + location.x) - (indentedWidth * yCorrection);

    } else if (newLine === "toLeft") {
        // the remainder of gridSquare / squareWidth will give the x coordinate of required square
        xPosition = ((charPosition + location.x) % canvasWidth),
        yCorrection = Math.floor((charPosition + location.x) / canvasWidth);
    }

    return {
        x: xPosition,
        y: yCorrection
    }
}

export { highlightSquareForTextEntry, writeText, writeTextToCanvas }