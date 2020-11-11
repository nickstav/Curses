import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';
import { highlightSquares } from './location.js';


function updateCanvas(liveObject=null) {
    let context = get(cursesCanvas).context;
    const canvasElement = get(cursesCanvas).canvasElement;
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // draw all saved objects to the canvas
    let canvasItems = get(canvasObjects);
    canvasItems.forEach(object => {
         object.draw();
    });

    // draw any live objects currently being drawn
    if (liveObject !== null) {
        liveObject.draw();
    }

    //highlight the current square if highlighting is turned on
    let isHighlighting = get(cursesCanvas).isHighlighting;
    if (isHighlighting) {
        highlightSquares();
    }
}

export { updateCanvas }