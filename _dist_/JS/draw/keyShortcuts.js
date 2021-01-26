import { tools } from '../constants/toolsList.js';
import { keyboardKeys } from '../constants/keyboardKeys.js';
import { eraseObject } from './erase.js';
import { changeTool, deselectAnySelectedObjects } from '../items/selectTool.js';
import { moveObject } from './move.js';

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