import { get } from 'svelte/store';
import { cornerSelected, editMode } from '../constants/objectSelection.js';
import { canvasObjects } from '../stores/objects.js';
import { projectStore } from '../stores/project.js';

function editObject(isDrawing, currentGridLocation, canvasElement) {
    let canvasItems = get(canvasObjects);
    let mousePosition = get(projectStore).mousePosition;
    
    canvasItems.forEach(object => {
        if (object.selected) {

            const selected = (object) => object.selected;
            let numberOfSelectedObjects =  canvasItems.filter(selected).length;
            if (numberOfSelectedObjects === 1) {
                //move the object to the end of the items array so it is drawn over other objects when moved
                canvasItems.push(canvasItems.splice(canvasItems.indexOf(object), 1)[0]);
            }

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

export { editObject }