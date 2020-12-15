import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';
import { cursesCanvas } from '../stores/project.js';
import { keyboardKeys } from '../constants/keyboardKeys.js';

/* ----------------TODO: FIX ALIGNMENT ERROR FOR POSITION/ENDPOSITION CASES------------------ */

//align a set of selected objects to the left/right/top/bottom of the first selected object
export function alignObjects(direction) {    
    let canvasItems = get(canvasObjects);

    // get the position in the objects array of the first selected object
    let mainObjectID = get(cursesCanvas).IDOfFirstSelectedObject;
    let mainObject = canvasItems.find(object => object.ID === mainObjectID);

    // get the required {x,y} position of the object that others will be aligned to
    let referencePosition = getReferencePosition(direction, mainObject);

    // loop through all selected objects and update its position to align as required
    canvasItems.forEach(object => {
        if (object.selected) {
            object.mouseOffset = {x: 0, y: 0};
            alignObjectToNewPosition(direction, object, referencePosition);
        };
    });
}

/* -------------------------------------------------------------------------------------------------- */

function getReferencePosition(direction, referenceObject) {
    let referencePosition;
    
    if (referenceObject === undefined) {
        return undefined;
    }

    switch(direction) {
        case(keyboardKeys.LEFT):
        case(keyboardKeys.UP):
            referencePosition = {
                x: Math.min(referenceObject.position.x, referenceObject.endPosition.x),
                y: Math.min(referenceObject.position.y, referenceObject.endPosition.y)
            };
            break;
        case(keyboardKeys.RIGHT):
        case(keyboardKeys.DOWN):
            referencePosition = {
                x: Math.max(referenceObject.position.x, referenceObject.endPosition.x),
                y: Math.max(referenceObject.position.y, referenceObject.endPosition.y)
            };
            break;
    };
    return referencePosition;
}

function alignObjectToNewPosition(direction, object, referencePosition) {
    let distanceToMove;
        
    switch(direction) {
        case(keyboardKeys.LEFT):
            distanceToMove = Math.min(object.position.x, object.endPosition.x) - referencePosition.x;
            object.updatePosition({x: object.position.x - distanceToMove, y: object.position.y});
            break;
        case(keyboardKeys.UP):
            distanceToMove = Math.min(object.position.y, object.endPosition.y) - referencePosition.y;
            object.updatePosition({x: object.position.x, y: object.position.y - distanceToMove});
            break;
        case(keyboardKeys.RIGHT):
            distanceToMove = Math.max(object.position.x, object.endPosition.x) - referencePosition.x;
            object.updatePosition({x: object.position.x - distanceToMove, y: object.position.y});
            break;
        case(keyboardKeys.DOWN):
            distanceToMove = Math.max(object.position.y, object.endPosition.y) - referencePosition.y;
            object.updatePosition({x: object.position.x, y: object.position.y - distanceToMove});
            break;
    };
}