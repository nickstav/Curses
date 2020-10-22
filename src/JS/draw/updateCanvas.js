import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';

function addTextToCanvas() {
    let textObjects = get(canvasObjects).text;

    for (let i = 0; i < textObjects.length; i++) {
        let text = textObjects[i].text;
        let location = textObjects[i].location;
        writeTextToCanvas(text, location);
    }
}

function writeTextToCanvas(text, location) {
    let gridDimension = get(cursesCanvas).gridDimension;
    let context = get(cursesCanvas).context;
    context.fillStyle = 'black';
    context.font = "15px Consolas";

    for (let i = 0; i < text.length; i++) {
        //get the next character in the string
        let character = text.charAt(i);

        let xCoordinate = getGridSquare(i, location, gridDimension).x;
        let yCoordinate = getGridSquare(i, location, gridDimension).y;

        context.fillText(character, xCoordinate, yCoordinate);
    };
}

function getGridSquare(position, location, gridDimension) {
    let canvasWidth = get(cursesCanvas).canvasWidth;

    // y location needs to be the square below as axis measured from the top, plus any new lines started
    let yCorrection = 1 + Math.floor((position + location.x) / canvasWidth);

    return {
        // the remainder of gridSqaure / squareWidth will give the x coordinate of required
        x: ((position + location.x) % canvasWidth) * gridDimension.x,
        y: (location.y + yCorrection) * gridDimension.y
    }
}

export { addTextToCanvas }