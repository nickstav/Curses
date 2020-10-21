import { get } from 'svelte/store';
import { cursesCanvas } from './store.js';
import { getGridLocation } from './placement.js';

export function writeText() {
    let context = get(cursesCanvas).context;
    let currentLocation = get(cursesCanvas).mousePosition;

    let gridLocation = getGridLocation(currentLocation);
    console.log(gridLocation);

    //context.font = "18px Arial";
    //context.fillText("X", currentLocation.x, currentLocation.y);
}