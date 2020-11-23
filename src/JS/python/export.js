import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';
import { tools } from '../constants/toolsList.js';
import { imports, cursesScript } from './curses.js';
import { objectFunctions } from './pythonFunctions.js';

// confirm that user is ready to export the canvas, then collect relevant data and send to the server
function saveCanvas() {
    let canvasInfo = collectDataToExport();
    createPythonText(canvasInfo);
    cursesCanvas.toggleShowPythonScript();
}

//create the python script from its constituent parts
function createPythonText(canvasInfo) {
    let dataString = `canvasData = ${JSON.stringify(canvasInfo)}
    `;
    let pythonScript = imports + dataString + objectFunctions + cursesScript;
    cursesCanvas.updatePythonScript(pythonScript.trim())
}

// obtain canvas dimensions and save relevant object data into a specified array for that object type
function collectDataToExport() {
    let textObjects = [];
    let lineObjects = [];
    let irregularLines = [];
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
                // check to see if the line is straight or irregular
                if (object.position.x === object.endPosition.x || object.position.y === object.endPosition.y) {
                    let lineCoords = getMinMaxCoords(object.position, object.endPosition);
                    lineObjects.push({start: lineCoords.start, end: lineCoords.end});
                } else {
                    irregularLines.push(object.filledSquares);
                }
                break;
            case(tools.RECTANGLE):
                let rectCoords = getMinMaxCoords(object.position, object.endPosition);
                rectObjects.push({start: rectCoords.start, end: rectCoords.end});
                break;
            case(tools.PROGRESS):
                let progressInfo = {
                    position: [object.position.x, object.position.y],
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
        irregularLines: irregularLines,
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

export { saveCanvas }