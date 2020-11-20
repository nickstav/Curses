import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';
import { tools } from '../constants/toolsList.js';
import { imports, cursesScript } from './curses.js';
import { objectFunctions } from './pythonFunctions.js';

// confirm that user is ready to export the canvas, then collect relevant data and send to the server
export function saveCanvas() {
    let confirmation = confirm("Are you sure you wish to export this canvas?");

    if (confirmation) {
        let canvasInfo = collectDataToExport();
        createPythonText(canvasInfo);
        cursesCanvas.toggleShowPythonScript();
    }
}

function createPythonText(canvasInfo) {
    let dataString = `canvasData = ${canvasInfo}`;
    let pythonScript = imports + dataString + objectFunctions + cursesScript;
    cursesCanvas.updatePythonScript(pythonScript);
}

// obtain canvas dimensions and save relevant object data into a specified array for that object type
function collectDataToExport() {
    let textObjects = [];
    let lineObjects = [];
    let rectObjects = [];
    let progressObjects = [];

    let canvasItems = get(canvasObjects);

    canvasItems.forEach(object => {
        switch(object.type) {
            case(tools.TEXT):
                let textInfo = {message: object.text, position: [object.position.x, object.position.y]};
                textObjects.push(textInfo);
                break;
            case(tools.LINE):
                let lineCoords = getMinMaxCoords(object.position, object.endPosition);
                lineObjects.push({start: lineCoords.start, end: lineCoords.end});
                break;
            case(tools.RECTANGLE):
                let rectCoords = getMinMaxCoords(object.position, object.endPosition);
                rectObjects.push({start: rectCoords.start, end: rectCoords.end});
                break;
            case(tools.PROGRESS):
                let progressInfo = {
                    position: object.position,
                    bars: object.numberOfBars,
                    percentage: object.percentageValue
                };
                progressObjects.push(progressInfo);
                break;
        };
    });

    let infoToExport = {
        width: get(cursesCanvas).canvasWidth,
        height: get(cursesCanvas).canvasHeight,
        text: textObjects,
        line: lineObjects,
        rectangle: rectObjects,
        progress: progressObjects
    }

    return infoToExport;
}

// since shapes can be drawn in a negative direction w.r.t. canvas coordinates,
// redefine the "start" and "end" points of an object in the positive canvas direction
function getMinMaxCoords(initialPosition, finalPosition) {
    let startCoords = [
        Math.min(initialPosition.x, finalPosition.x),
        Math.min(initialPosition.y, finalPosition.y)
    ];
    let endCoords = [
        Math.max(initialPosition.x, finalPosition.x),
        Math.max(initialPosition.y, finalPosition.y)
    ];

    return {
        start: startCoords,
        end: endCoords
    }
}