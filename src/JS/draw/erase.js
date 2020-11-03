import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';

export function eraseObject(gridLocation) {
    let canvasItems = get(canvasObjects).items;

    canvasItems.forEach(object => {
        for (let i = 0; i < object.filledSquares.length; i++) {
            if (
                //check every grid square of an object to see if it exists at the mouse click
                gridLocation.x === object.filledSquares[i].x 
                && 
                gridLocation.y + 1 === object.filledSquares[i].y
                ) {
                    // if mouse location matches an object's location, erase it
                    console.debug(object.type, 'erased');
                    canvasObjects.eraseObjectFromStore(object);
            }
        }
    });
}
