import { get } from 'svelte/store';
import { projectStore } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';
import { highlightSquares } from './location.js';
import { drawHighlightingRectangle } from './select.js';


function updateCanvas(liveObject=null) {
    let context = get(projectStore).context;
    const canvasElement = get(projectStore).canvasElement;
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // draw all saved objects to the canvas
    let canvasItems = get(canvasObjects);
    canvasItems.forEach(object => {
         object.draw();
    });

    // draw any live objects currently being drawn
    if (liveObject !== null) {
        if (liveObject.type === "highlighting") {
            drawHighlightingRectangle(liveObject.startCoords, liveObject.endCoords);
        } else {
            liveObject.draw();
        }
    }

    //highlight the current square if highlighting is turned on
    let isHighlighting = get(projectStore).isHighlighting;
    if (isHighlighting) {
        highlightSquares();
    }
}

export { updateCanvas }