import { get } from 'svelte/store';
import { gridDimension } from '../constants/canvasSize.js';
import { canvasObjects } from '../stores/objects.js';

function selectObject(gridLocation, canvasElement) {
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
                    // if mouse location matches an object's location, mark it as selected
                    objects[z].selectObject();
                    canvasElement.style.cursor = "grab";
                    //stop the loop once one object has been selected
                    return;
            };
        };
    };

    // check if mouse click is outside all selected objects' borders and deselect them if so
    checkClickLocationToDeselectObjects(objects, gridLocation, canvasElement);
}

// get the location of where the mouse is pressed on the object from its reference position
function getMouseOffset(gridLocation) {
    let canvasItems = get(canvasObjects);
    
    canvasItems.forEach(object => {
        if (object.selected) {
            object.getMouseOffset(gridLocation);
        }
    });
}

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

export { selectObject, getMouseOffset }