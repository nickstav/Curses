import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { getGridLocation, clearPreviousCharacter} from '../draw/location.js';

// get start coords and mouse coords to draw a rectangle based on current mouse position
function drawRectangle() {
    let startPosition = get(cursesCanvas).startPosition;
    let currentLocation = get(cursesCanvas).mousePosition;

    let startSquare = getGridLocation(startPosition);
    let currentSquare = getGridLocation(currentLocation);

    // create a rectangle using ascii characters for the given coordinates
    createRectangle(startSquare, currentSquare);
}

// save rectangle coordinates to the object store
function saveRectangleToStore() {
    let startPosition = get(cursesCanvas).startPosition;
    let currentLocation = get(cursesCanvas).mousePosition;

    let startSquare = getGridLocation(startPosition);
    let currentSquare = getGridLocation(currentLocation);

    let rectangleInfo = {
        startPoint: startSquare,
        endPoint: currentSquare
    }

    canvasObjects.saveRectangleObject(rectangleInfo);
}

// create a rectangle at the specified coordinates
function createRectangle(startSquare, endSquare) {
    let context = get(cursesCanvas).context;
    let gridDimension = get(cursesCanvas).gridDimension;
    context.fillStyle = 'black';
    context.font = "15px Consolas";

    let width = endSquare.x - startSquare.x;
     // y location needs to be the square below as axis measured from the top
     let cornerSquares = {
        topLeft: {x: startSquare.x, y: startSquare.y + 1},
        topRight: {x: startSquare.x + width, y: startSquare.y + 1},
        bottomLeft: {x: endSquare.x - width, y: endSquare.y + 1},
        bottomRight: {x: endSquare.x, y: endSquare.y + 1}
    }
    addCorners(cornerSquares, context, gridDimension);
    addVerticals(cornerSquares, context, gridDimension);
    addHorizontals(cornerSquares, context, gridDimension);
}

// use "+" character for the corners
function addCorners(cornerSquares, context, gridDimension) {
    
    clearPreviousCharacter(cornerSquares.topLeft, gridDimension, context);
    clearPreviousCharacter(cornerSquares.topRight, gridDimension, context);
    clearPreviousCharacter(cornerSquares.bottomLeft, gridDimension, context);
    clearPreviousCharacter(cornerSquares.bottomRight, gridDimension, context);


    context.fillText('+', cornerSquares.topLeft.x * gridDimension.x, cornerSquares.topLeft.y * gridDimension.y);
    context.fillText('+', cornerSquares.topRight.x * gridDimension.x, cornerSquares.topRight.y * gridDimension.y);
    context.fillText('+', cornerSquares.bottomLeft.x * gridDimension.x, cornerSquares.bottomLeft.y * gridDimension.y);
    context.fillText('+', cornerSquares.bottomRight.x * gridDimension.x, cornerSquares.bottomRight.y * gridDimension.y);   
}

// use "|" character for the verticals
function addVerticals(coords, context, gridDimension) {
    let height = Math.abs(coords.bottomLeft.y - coords.topLeft.y);

    for (let i = 1; i < height; i++) {
        let verticalCoordinate_A, verticalCoordinate_B; // A and B correspond to both sides
    
        if (coords.bottomLeft.y > coords.topLeft.y) {
            // draw vertical downwards
            verticalCoordinate_A = {x: coords.topLeft.x, y: coords.topLeft.y + i};
            verticalCoordinate_B = {x: coords.topRight.x, y: coords.topRight.y + i};
        } else {
            // draw vertical upwards
            verticalCoordinate_A = {x: coords.topLeft.x, y: coords.topLeft.y - i};
            verticalCoordinate_B = {x: coords.topRight.x, y: coords.topRight.y - i};
        }

        clearPreviousCharacter(verticalCoordinate_A, gridDimension, context);
        clearPreviousCharacter(verticalCoordinate_B, gridDimension, context);

        context.fillText('|', verticalCoordinate_A.x * gridDimension.x, verticalCoordinate_A.y * gridDimension.y);
        context.fillText('|', verticalCoordinate_B.x * gridDimension.x, verticalCoordinate_B.y * gridDimension.y);
    }
}

// use "-" character for the horizontals
function addHorizontals(coords, context, gridDimension) {
    let width = Math.abs(coords.topRight.x - coords.topLeft.x);

    for (let i = 1; i < width; i++) {
        let horizCoordinate_A, horizCoordinate_B; // A and B correspond to top and bottom

        if (coords.topLeft.x < coords.bottomRight.x) {
            //draw horizontal to the right
            horizCoordinate_A = {x: coords.topLeft.x + i, y: coords.topLeft.y};
            horizCoordinate_B = {x: coords.bottomLeft.x + i, y: coords.bottomLeft.y};
        } else {
            //draw horizontal to the left
            horizCoordinate_A = {x: coords.topLeft.x - i, y: coords.topLeft.y};
            horizCoordinate_B = {x: coords.bottomLeft.x - i, y: coords.bottomLeft.y};
        }

        clearPreviousCharacter(horizCoordinate_A, gridDimension, context);
        clearPreviousCharacter(horizCoordinate_B, gridDimension, context);

        context.fillText('-', horizCoordinate_A.x * gridDimension.x, horizCoordinate_A.y * gridDimension.y);
        context.fillText('-', horizCoordinate_B.x * gridDimension.x, horizCoordinate_B.y * gridDimension.y);
    }
}

export {drawRectangle, saveRectangleToStore, createRectangle }