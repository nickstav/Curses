import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';
import { projectStore } from '../stores/project.js';

import { gridDimension } from '../constants/canvasSize.js';

/* -------------------------------------------------------------------------------------------------- */

// function to check if an area is being highlighted to grab objects
function checkIfAreaBeingSelected(isDrawing) {
    let objects = get(canvasObjects);
    const objectNotSelected = (object) => !object.selected;
    if (isDrawing && objects.every(objectNotSelected)) {
        projectStore.changeSelectMethodToArea();
    };
}

// function to check if a mouse click at gridLocation is over an object and select it if so
function selectObject(gridLocation, canvasElement, event) {
    let objects = get(canvasObjects);

    // loop through the items array in reverse to prioritise the object "on top"
    for (let z = objects.length - 1; z >= 0; z--) {

        // loop through object's grid squares
        for (let i = 0; i < objects[z].filledSquares.length; i++) {

            if (
                //check every grid square of an object to see if it exists at the mouse click
                gridLocation.x === objects[z].filledSquares[i].x
                && 
                gridLocation.y + 1 === objects[z].filledSquares[i].y
                ) {

                    // deselect any previously selected object if the shift key is not being held
                    if (!event.shiftKey) {
                        objects.forEach(object => {
                            object.deselectObject();
                        })
                    }
                    // if mouse location matches an object's location, mark it as selected
                    objects[z].selectObject();
                    canvasElement.style.cursor = "grab";

                    // if no other object has been marked as first clicked, mark the current object's index
                    if (get(projectStore).IDOfFirstSelectedObject === undefined) {
                        projectStore.markObjectAsFirstSelected(objects[z].ID);
                    }

                    //stop the loop once one object has been selected
                    return;
            };
        };
    };

    // check if mouse click is outside all selected objects' borders and deselect them if so
    checkClickLocationToDeselectObjects(objects, gridLocation, canvasElement);
}

/* -------------------------------------------------------------------------------------------------- */

//return a live object to highlight an area on the grid, and update the store's selected area coords
function selectAreaOnGrid(startGridLocation, currentGridLocation) {

    let liveObject = {
        type: 'highlighting',
        startCoords: startGridLocation,
        endCoords: currentGridLocation
    }

    projectStore.saveSelectedAreaCoords(startGridLocation, currentGridLocation);

    //highlight all objects within the selected area
    selectObjectsInsideArea();

    return liveObject;
}

// draw the highlighting rectangle for the selected area
function drawHighlightingRectangle(startCoords, endCoords) {
    let context = get(projectStore).context;
    let areaInfo = getSelectedAreaCoords([startCoords, endCoords]);

    context.beginPath();
    context.fillStyle = 'rgb(100, 149, 237, 0.2)';
    context.strokeStyle = "#6495ED";
    context.fillRect(
        areaInfo.topLeftCorner.x * gridDimension.x,
        areaInfo.topLeftCorner.y * gridDimension.y,
        (areaInfo.bottomRightCorner.x - areaInfo.topLeftCorner.x) * gridDimension.x,
        (areaInfo.bottomRightCorner.y - areaInfo.topLeftCorner.y) * gridDimension.y
    );
    context.strokeRect(
        areaInfo.topLeftCorner.x * gridDimension.x,
        areaInfo.topLeftCorner.y * gridDimension.y,
        (areaInfo.bottomRightCorner.x - areaInfo.topLeftCorner.x) * gridDimension.x,
        (areaInfo.bottomRightCorner.y - areaInfo.topLeftCorner.y) * gridDimension.y
    );
    context.stroke();
}

// check if any part of an object is in the highlighted area and select it if so
function selectObjectsInsideArea() {
    let canvasItems = get(canvasObjects);
    let selectedAreaCoords = get(projectStore).selectedAreaCoords;

    let areaInfo = getSelectedAreaCoords(selectedAreaCoords);

    canvasItems.forEach(object => {

        //deselect all objects at the start of each updated position
        object.deselectObject();

        // loop through object's grid squares
        for (let i = 0; i < object.filledSquares.length; i++) {
            if (
                object.filledSquares[i].x > areaInfo.topLeftCorner.x
                &&
                object.filledSquares[i].x < areaInfo.bottomRightCorner.x
                &&
                object.filledSquares[i].y > areaInfo.topLeftCorner.y
                &&
                object.filledSquares[i].y < areaInfo.bottomRightCorner.y + 1
            ) {
                // if any object falls within current selected area, highlight it
                object.selectObject(); 

                 // if no other object has been marked as first selected, mark the current object's index
                 if (get(projectStore).IDOfFirstSelectedObject === undefined) {
                    projectStore.markObjectAsFirstSelected(object.ID);
                }
            }
        };
    });
}

/* -------------------------------------------------------------------------------------------------- */

// get the location of where the mouse is pressed on the object from its reference position
function getMouseOffset(gridLocation) {
    let canvasItems = get(canvasObjects);
    
    canvasItems.forEach(object => {
        if (object.selected) {
            object.getMouseOffset(gridLocation);
        }
    });
}

/* -------------------------------------------------------------------------------------------------- */

function checkClickLocationToDeselectObjects(objects, gridLocation, canvasElement) {

    // returns true if mouse position is outside a selected object
    const isOutsideBorder = (object) => {
        if (object.selected) {
            return checkMouseIsOutsideObjectBorder(gridLocation, object);
        } else {
            return true;
        }
    }

    //deselect all selected objects if mouse click is outside all of selected objects' border
    if (objects.every(isOutsideBorder)) {
        objects.forEach(object =>{
            object.deselectObject();
        });
        canvasElement.style.cursor = "pointer";
        // remove the first selected object's index from the project store
        projectStore.removeFirstSelectedObject();
    }
}


// check if the mouse location is within the border of a specific object
function checkMouseIsOutsideObjectBorder(currentGridLocation, object) {
    let xLimits = {
        min: object.rectCorners.topL.x,
        max: object.rectCorners.topR.x
    }
    let yLimits = {
        min: object.rectCorners.topL.y,
        max: object.rectCorners.bottomL.y
    }
    let mouseLocation = {
        x: currentGridLocation.x * gridDimension.x,
        y: currentGridLocation.y * gridDimension.y
    }

    if ( 
        mouseLocation.x > xLimits.min 
        && 
        mouseLocation.x < xLimits.max
        &&
        mouseLocation.y > yLimits.min 
        && 
        mouseLocation.y < yLimits.max
        ) {
            return false;
    } else {
            return true;
    }
}

// function to get the values of topL and bottomR corners of a saved rectangle object (drawn in any direction)
function getSelectedAreaCoords(savedCoords) {

    let topLeftCorner = {
        x: Math.min(savedCoords[0].x, savedCoords[1].x),
        y: Math.min(savedCoords[0].y, savedCoords[1].y)
    }
    let bottomRightCorner = {
        x: Math.max(savedCoords[0].x, savedCoords[1].x),
        y: Math.max(savedCoords[0].y, savedCoords[1].y)
    }

    return {
        topLeftCorner,
        bottomRightCorner
    }
}

export {
    checkIfAreaBeingSelected,
    selectObject, 
    drawHighlightingRectangle, 
    selectAreaOnGrid, 
    selectObjectsInsideArea, 
    getMouseOffset
}