import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';

import { tools } from '../constants/toolsList.js';
import { keyboardKeys } from '../constants/keyboardKeys.js';
import { eraseObject } from './erase.js';
import { changeTool, deselectAnySelectedObjects } from '../items/selectTool.js';

// use certain keyboard presses as shortcuts to handling functions 
export function handleKeyboardShortcuts(keyPressed) {
    switch(keyPressed) {
        case(keyboardKeys.BACKSPACE):
        case(keyboardKeys.DELETE):
            eraseObject();
            break;
        case(keyboardKeys.T):
            changeTool(tools.TEXT);
            break;
        case(keyboardKeys.L):
            changeTool(tools.LINE);
            break;
        case(keyboardKeys.R):
            changeTool(tools.RECTANGLE);
            break;
        case(keyboardKeys.P):
            changeTool(tools.PROGRESS);
            break;
        case(keyboardKeys.V):
            changeTool(tools.DRAG);
            break;
        case(keyboardKeys.ESC):
            deselectAnySelectedObjects();
            break;
        case(keyboardKeys.UP):
        case(keyboardKeys.DOWN):
        case(keyboardKeys.LEFT):
        case(keyboardKeys.RIGHT):
            moveObject(keyPressed);
            break;
        default:
            break;
    }
}

//update either the x or y coord of an object by +/- 1 grid square with an arrow key press
function moveObject(arrowDirection) {
    let canvasItems = get(canvasObjects);

    canvasItems.forEach(object => {
        if (object.selected) {

            object.mouseOffset = {x: 0, y: 0}
            
            switch(arrowDirection) {
                case(keyboardKeys.UP):
                    object.updatePosition({x: object.position.x, y: object.position.y - 5});
                    break;
                case(keyboardKeys.DOWN):
                    object.updatePosition({x: object.position.x, y: object.position.y + 5});
                    break;
                case(keyboardKeys.LEFT):
                    object.updatePosition({x: object.position.x - 5, y: object.position.y});
                    break;
                case(keyboardKeys.RIGHT):
                    object.updatePosition({x: object.position.x + 5, y: object.position.y});
                    break;
            }

        }
    });
}