import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';
import { createRectangle } from '../tools/rectangle.js';
import { writeTextToCanvas } from '../tools/text.js';
import { drawLineOnGrid } from '../tools/line.js';

//get all saved line objects from the store and add it to the canvas
function addLineToCanvas(order) {
    let lineObjects = get(canvasObjects).lines;

    for (let i = 0; i < lineObjects.length; i++) {
        let line = lineObjects[i];
        if (line.order === order) {
            drawLineOnGrid(line.start.x, line.start.y, line.finish.x, line.finish.y);
        }
    }
}

//get all saved text objects from the store and add it to the canvas
function addTextToCanvas(order) {
    let textObjects = get(canvasObjects).text;

    for (let i = 0; i < textObjects.length; i++) {
        if (textObjects[i].order === order) {
            let text = textObjects[i].text;
            let location = textObjects[i].location;
            writeTextToCanvas(text, location);
        }
    }
}

//get all saved rectangle objects from the store and add it to the canvas
function addRectanglesToCanvas(order) {
    let rectangleObjects = get(canvasObjects).rectangles;

    for (let i = 0; i < rectangleObjects.length; i++) {
        if (rectangleObjects[i].order === order) {
            let startSquare = rectangleObjects[i].startPoint;
            let endSquare = rectangleObjects[i].endPoint;
            createRectangle(startSquare, endSquare);
        }
    }
}



export { addLineToCanvas, addTextToCanvas, addRectanglesToCanvas }