import { get } from 'svelte/store';
import { cornerSelected } from '../constants/corners.js';
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
                    object.deselectForResizing();
                    break;
            }

            if (isDrawing) {
                if (object.isResizing) {
                    object.resizeObject(currentGridLocation);
                } else {
                    object.updatePosition(currentGridLocation);
                    canvasElement.style.cursor = "grabbing";
                }
            }
        }
    });
}

export { selectObject, editObject }