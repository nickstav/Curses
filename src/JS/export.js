import { get } from 'svelte/store';
import { cursesCanvas } from './stores/project.js';
import { canvasObjects } from './stores/objects.js';
import { tools } from './constants/toolsList.js';

export function saveCanvas() {
    let confirmation = confirm("Are you sure you wish to export this canvas?");

    if (confirmation) {
        exportCanvas();
    }
}

function exportCanvas() {
    let canvasSize = {
        width: get(cursesCanvas).canvasWidth,
        height: get(cursesCanvas).canvasHeight
    }
    let textObjects = [];
    let lineObjects = [];
    let rectObjects = [];
    let progressObjects = [];

    let canvasItems = get(canvasObjects);
    canvasItems.forEach(object => {
        switch(object.type) {
            case(tools.TEXT):
                // TODO
                break;
            case(tools.LINE):
                //TODO
                break;
            case(tools.RECTANGLE):
                // TODO
                break;
            case(tools.PROGRESS):
                //TODO
                break;
        };
    });

    let infoForServer = {
        width: canvasSize.width,
        height: canvasSize.height,
        text: textObjects,
        line: lineObjects,
        rectangle: rectObjects,
        progress: progressObjects
    }

    sendCanvasInfoToServer(infoForServer);
}

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