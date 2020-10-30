import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { tools } from '../constants/toolsList.js';

// function to select which canvas tool has been clicked in the toolbar
export function changeTool(buttonPressed) {
    cursesCanvas.changeCanvasTool(buttonPressed);

    //change the cursor icon depending on the current tool
    let canvasElement = get(cursesCanvas).canvasElement;
    switch(buttonPressed) {
        case(tools.LINE):
        case(tools.RECTANGLE):
            canvasElement.style.cursor = "crosshair";
            break;
        case(tools.TEXT):
        case(tools.PROGRESS):
        case(tools.ERASE):
            canvasElement.style.cursor = "pointer";
            break;
        case(tools.DRAG):
            canvasElement.style.cursor = "grab";
            break;
        default:
            canvasElement.style.cursor = "default"; 
    }
}