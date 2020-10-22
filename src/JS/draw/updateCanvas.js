import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';

function addTextToCanvas() {
    let textObjects = get(canvasObjects).text;

    for (let i = 0; i < textObjects.length; i++) {
        let text = textObjects[i].text;
        let location = textObjects[i].location;
        writeTextToCanvas(text, location);
    }
}

function writeTextToCanvas(text, location) {
    let gridDimension = get(cursesCanvas).gridDimension;
    let context = get(cursesCanvas).context;
    context.fillStyle = 'black';
    context.font = "15px Consolas";

    for (let i = 0; i < text.length; i++) {
        //get the next character in the string
        let character = text.charAt(i);
    
        let Xcoordinate = (i + location.x) * gridDimension.x;
        // y location needs to be the square below as axis is measured from the top
        let Ycoordinate = (location.y + 1) * gridDimension.y;

        context.fillText(character, Xcoordinate, Ycoordinate);
    };
}

export { addTextToCanvas }