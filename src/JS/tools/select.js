import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { tools } from './toolsList.js';
import { canvasObjects } from '../stores/objects.js';

// function to select which canvas tool has been clicked in the toolbar
export function changeTool(buttonPressed) {
    cursesCanvas.changeCanvasTool(buttonPressed);

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