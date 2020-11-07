import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';


function updateCanvas() {
    let context = get(cursesCanvas).context;
    const canvasElement = get(cursesCanvas).canvasElement;
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);

    let canvasItems = get(canvasObjects);
    canvasItems.forEach(object => {
         object.draw();
    })
}

export { updateCanvas }