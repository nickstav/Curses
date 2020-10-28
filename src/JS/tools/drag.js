import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { getGridLocation } from '../draw/location.js';
import { updateCanvas } from '../draw/updateCanvas.js';
import { tools } from './toolsList.js';
import { writeTextToCanvas, addTextToStore } from './text.js';

// function to select any object that is clicked on the canvas
function selectObject() {
    let canvasElement = get(cursesCanvas).canvasElement;
    let mousePosition = get(cursesCanvas).mousePosition;
    let currentGridLocation = getGridLocation(mousePosition);

    //check if any text exists at the mouse click and highlight it if so
    let textExists = checkIsTextObject(currentGridLocation);

    // if no objects exist, then the user has clicked off the object so reset the draggable function
    if (!textExists) {
        canvasElement.style.cursor = "grab";
        canvasObjects.createMovableObject({});
    }
}

function moveObject(event, isDrawing, canvasElement) {
    if (!isDrawing) return;

    // continually update the current mouse position
    cursesCanvas.updateMousePosition(event, canvasElement);
    let mousePosition = get(cursesCanvas).mousePosition;
    let currentGridLocation = getGridLocation(mousePosition);

    // update the canvas
    updateCanvas();

    // move the object to the new location
    let objectToMove = get(canvasObjects).objectToMove;
    switch(objectToMove.type) {
        case(tools.TEXT):
            // get the object info highlighted to be moved & save the info
            let objectInfo = get(canvasObjects).objectToMove;
            // draw the object at the current location
            writeTextToCanvas(objectInfo.textInfo.text, currentGridLocation, objectInfo.textInfo.newLine);
            // delete the object from the store
            canvasObjects.deleteTextObject(objectInfo.objectIndex);
    }
 
}

function saveNewObject() {
    let mousePosition = get(cursesCanvas).mousePosition;
    let currentGridLocation = getGridLocation(mousePosition);
    let objectToMove = get(canvasObjects).objectToMove;

    switch(objectToMove.type) {
        case(tools.TEXT):
        // get the object info highlighted to be moved
        let textInfo = get(canvasObjects).objectToMove.textInfo;
        addTextToStore(textInfo.text, currentGridLocation)
    }
}

// compare all saved text objects' location to the mouse's clicked location
// highlight the text object as movable if the locations match
function checkIsTextObject(clickedPosition) {
    let textObjects = get(canvasObjects).text;
    let canvasElement = get(cursesCanvas).canvasElement;

    for (let i = 0; i < textObjects.length; i++) {
        let location = textObjects[i].location;

        if (location.x === clickedPosition.x && location.y === clickedPosition.y) {
            canvasElement.style.cursor = "move";
            let objectInfo = {
                type: tools.TEXT,
                objectIndex: i,
                textInfo: textObjects[i]
            }
            canvasObjects.createMovableObject(objectInfo);
            return true;
        }
    }
    return false;
}

function highlightTextObject(location, length) {
  
}

export {  selectObject, moveObject, saveNewObject }