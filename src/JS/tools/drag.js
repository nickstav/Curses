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
        // reset the movable object info
        canvasObjects.createMovableObject({});
    }
}

function moveObject(event, isDrawing, canvasElement) {
    if (!isDrawing) return;

    // update the canvas
    updateCanvas();

    // continually update the current mouse position
    cursesCanvas.updateMousePosition(event, canvasElement);
    let mousePosition = get(cursesCanvas).mousePosition;
    let currentGridLocation = getGridLocation(mousePosition);

    // move the object to the new location
    let objectToMove = get(canvasObjects).objectToMove;

    switch(objectToMove.type) {
        case(tools.TEXT):
            // draw the object at the current location
            writeTextToCanvas(objectToMove.textInfo.text, currentGridLocation, objectToMove.textInfo.newLine);
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
             // delete the object from the store
             canvasObjects.deleteTextObject(objectInfo.objectIndex);
            
            return true;
        }
    }
    return false;
}

function highlightTextObject(location, length) {
  
}

export {  selectObject, moveObject, saveNewObject }