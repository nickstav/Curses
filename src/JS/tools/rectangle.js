import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { getGridLocation} from '../draw/location.js';

// get start coords and mouse coords to draw a rectangle
function drawRectangle() {
    let startPosition = get(cursesCanvas).startPosition;
    let currentLocation = get(cursesCanvas).mousePosition;

    let startSquare = getGridLocation(startPosition);
    let currentSquare = getGridLocation(currentLocation);

    // create a rectangle using ascii characters for the given coordinates
    createRectangle(startSquare, currentSquare);
}

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
    context.fillText('+', cornerSquares.topLeft.x * gridDimension.x, cornerSquares.topLeft.y * gridDimension.y);
    context.fillText('+', cornerSquares.topRight.x * gridDimension.x, cornerSquares.topRight.y * gridDimension.y);
    context.fillText('+', cornerSquares.bottomLeft.x * gridDimension.x, cornerSquares.bottomLeft.y * gridDimension.y);
    context.fillText('+', cornerSquares.bottomRight.x * gridDimension.x, cornerSquares.bottomRight.y * gridDimension.y);
}

// use "|" character for the verticals
function addVerticals(coords, context, gridDimension) {
    let height = coords.bottomLeft.y - coords.topLeft.y;

    for (let i = 1; i < height; i++) {
        // A and B correspond to both sides
        let verticalCoordinate_A = {x: coords.topLeft.x, y: coords.topLeft.y + i};
        let verticalCoordinate_B = {x: coords.topRight.x, y: coords.topRight.y + i};

        context.fillText('|', verticalCoordinate_A.x * gridDimension.x, verticalCoordinate_A.y * gridDimension.y);
        context.fillText('|', verticalCoordinate_B.x * gridDimension.x, verticalCoordinate_B.y * gridDimension.y);
    }
}

// use "-" character for the horizontals
function addHorizontals(coords, context, gridDimension) {
    let width = coords.topRight.x - coords.topLeft.x;

    for (let i = 1; i < width; i++) {
        // A and B correspond to top and bottom
        let horizCoordinate_A = {x: coords.topLeft.x + i, y: coords.topLeft.y};
        let horizCoordinate_B = {x: coords.bottomLeft.x + i, y: coords.bottomLeft.y};

        context.fillText('-', horizCoordinate_A.x * gridDimension.x, horizCoordinate_A.y * gridDimension.y);
        context.fillText('-', horizCoordinate_B.x * gridDimension.x, horizCoordinate_B.y * gridDimension.y);
    }
}

export {drawRectangle, saveRectangleToStore, createRectangle }