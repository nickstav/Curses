import { get } from 'svelte/store';
import { gridDimension } from '../constants/canvasSize.js';
import { cornerSelected, editMode } from '../constants/objectStates.js';
import { canvasObjects } from '../stores/objects.js';
import { cursesCanvas } from '../stores/project.js';


function selectObject(gridLocation, canvasElement) {
    let objects = get(canvasObjects);

    // loop through the items array in reverse to only select the object "on top"
    for (let z = objects.length - 1; z >= 0; z--) {

        //define variable to confirm whether an object has been clicked or not
        let objectClicked = false;

        for (let i = 0; i < objects[z].filledSquares.length; i++) {
            if (
                //check every grid square of an object to see if it exists at the mouse click
                gridLocation.x === objects[z].filledSquares[i].x && 
                gridLocation.y + 1 === objects[z].filledSquares[i].y
                ) {
                    // if mouse location matches an object's location, mark it as selected
                    objects[z].selectObject();
                    objectClicked = true;
                    canvasElement.style.cursor = "grab";
                    //stop the loop once one object has been selected
                    return;
            }
        };
        // if no object exists at mouse location, deselect any selected object
        // (i.e. the user has clicked off an object)
        if (!objectClicked && objects[z].selected) {
            //criteria for deselection is if mouse is clicked outside of the bordering shape
            let mouseInsideObject = checkMouseIsInsideObjectBorder(gridLocation, objects[z]);
            if (!mouseInsideObject) {
                objects[z].deselectObject();
                objectClicked = false;
                canvasElement.style.cursor = "pointer";
            } 
        }
    };
}


function editObject(isDrawing, currentGridLocation, canvasElement) {
    let canvasItems = get(canvasObjects);
    let mousePosition = get(cursesCanvas).mousePosition;

    canvasItems.forEach(object => {
        if (object.selected) {
            //move the object to the end of the items array so it is drawn last
            canvasItems.push(canvasItems.splice(canvasItems.indexOf(object), 1)[0]);
            
            //check whether the mouse is placed to resize or move the object
            if (!isDrawing) {
                checkMouseOverCorner(object, mousePosition, canvasElement);
            }

            // once the button is held, carry out either the resize or the move
            if (isDrawing) {
                switch(object.editMode) {
                    case(editMode.MOVE):
                        object.updatePosition(currentGridLocation);
                        canvasElement.style.cursor = "grabbing";
                        break;
                    case(editMode.RESIZE):
                        object.resizeObject(currentGridLocation);
                        break;
                }
            }
        }
    });
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

function checkMouseOverCorner(object, mousePosition, canvasElement) {
    // check if the mouse is over the highlighting rectangle's corner
    let cornerUnderMouse = object.isMouseOverCorner(mousePosition);

    switch(cornerUnderMouse) {
        case(cornerSelected.TL):
        case(cornerSelected.BR):
            canvasElement.style.cursor = "nwse-resize";
            object.selectForResizing();
            break;
        case(cornerSelected.TR):
        case(cornerSelected.BL):
            canvasElement.style.cursor = "nesw-resize";
            object.selectForResizing();
            break;
        case(cornerSelected.NONE):
            canvasElement.style.cursor = "grab";
            object.selectForMoving();
            break;
    }
}

// check if the mouse location is within the border of a specific object
function checkMouseIsInsideObjectBorder(currentGridLocation, object) {
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
        mouseLocation.x > xLimits.min && mouseLocation.x < xLimits.max
        &&
        mouseLocation.y > yLimits.min && mouseLocation.y < yLimits.max
        ) {
            return true;
    } else {
        return false;
    }
}

export { selectObject, editObject, getMouseOffset }