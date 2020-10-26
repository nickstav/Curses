import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { getGridLocation } from '../draw/location.js';

function markSquareAsErased() {
    let mouseLocation = get(cursesCanvas).mousePosition;
    let gridLocation = getGridLocation(mouseLocation);
    let objects = get(canvasObjects).numberOfObjects;

    let eraseInfo = {
        order: objects + 1,
        location: gridLocation
    }
    eraseSquare(eraseInfo.location);
    canvasObjects.markSquareToErase(eraseInfo);
}

/* --------------------------------------------------------------------------------------------- */

function eraseSquare(location) {
    let context = get(cursesCanvas).context;
    let gridDimension = get(cursesCanvas).gridDimension;

    context.clearRect(
        location.x * gridDimension.x, 
        location.y * gridDimension.y,
        gridDimension.x, 
        gridDimension.y
    );
    /* note grid location is defined by the top corner. Text is added on top of this so we actually 
       need to clear the rectangle above this point, hence the -1 correction 
    */
}

export { markSquareAsErased, eraseSquare}