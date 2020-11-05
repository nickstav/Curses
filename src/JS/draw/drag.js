import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';

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
                    object.toggleSelect(gridLocation);
                    console.debug(object.type, 'clicked');
                    objectClicked = true;
                    canvasElement.style.cursor = "grab";
            }
        };
        // if no object exists at mouse location, deselect any selected object
        // (i.e. the user has clicked off an object)
        if (!objectClicked && object.selected) {
            object.toggleSelect(gridLocation);
            objectClicked = false;
            canvasElement.style.cursor = "pointer";
        }
    });
}


function dragObject(isDrawing, currentGridLocation, canvasElement) {
    let canvasItems = get(canvasObjects).items;
    
    // if mouse button is held, update the object's live position as it is being dragged
    if (isDrawing) {
        canvasItems.forEach(object => {
            if (object.selected) {
                object.updatePosition(currentGridLocation);
            }
        });
    }
}

export { selectObject, dragObject }