import { get } from 'svelte/store';
import { cursesCanvas } from './stores/project.js';
import { canvasObjects } from './stores/objects.js';
import { tools } from './constants/toolsList.js';

// confirm that user is ready to export the canvas, then collect relevant data and send to the server
export function saveCanvas() {
    let confirmation = confirm("Are you sure you wish to export this canvas?");

    if (confirmation) {
        let infoForServer = collectDataToSend();
        sendCanvasInfoToServer(infoForServer);
    }
}

// send info to the server address and receive a confirmation message upon receipt
async function sendCanvasInfoToServer(info) {
    const serverAddress = 'http://localhost:4000/userCanvas';
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      };

    try {
        const response = await fetch(serverAddress, options);
        const confirmation = await response.json();
        console.log(confirmation);
      } catch (error) {
        console.error(error);
      };
}

// obtain canvas dimensions and save relevant object data into a specified array for that object type
function collectDataToSend() {
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

    let infoToSend = {
        width: get(cursesCanvas).canvasWidth,
        height: get(cursesCanvas).canvasHeight,
        text: textObjects,
        line: lineObjects,
        rectangle: rectObjects,
        progress: progressObjects
    }

    return infoToSend;
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