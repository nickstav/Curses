import { get } from 'svelte/store';
import { cornerSelected, editMode } from '../constants/objectStates.js';
import { canvasObjects } from '../stores/objects.js';
import { cursesCanvas } from '../stores/project.js';


function selectObject(gridLocation, canvasElement) {
    let canvasItems = get(canvasObjects).items;

    canvasItems.forEach(object => {
        //define variable to confirm whether an object has been clicked or not
        let objectClicked = false;

        for (let i = 0; i < object.filledSquares.length; i++) {
            if (
                //check every grid square of an object to see if it exists at the mouse click
                gridLocation.x === object.filledSquares[i].x && 
                gridLocation.y + 1 === object.filledSquares[i].y
                ) {
                    // if mouse location matches an object's location, mark it as selected
                    object.toggleSelect();
                    object.getMouseOffset(gridLocation)
                    console.debug(object.type, 'clicked');
                    objectClicked = true;
                    canvasElement.style.cursor = "grab";
            }
        };
        // if no object exists at mouse location, deselect any selected object
        // (i.e. the user has clicked off an object)
        if (!objectClicked && object.selected) {
            object.toggleSelect();
            objectClicked = false;
            canvasElement.style.cursor = "pointer";
        }
    });
}


function editObject(isDrawing, currentGridLocation, canvasElement) {
    let canvasItems = get(canvasObjects).items;
    let mousePosition = get(cursesCanvas).mousePosition;

    canvasItems.forEach(object => {
        if (object.selected) {
            
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

export { selectObject, editObject }