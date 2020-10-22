import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';

// function to return the coordinates of the grid square at which the mouse is at
export function getGridLocation(mousePosition) {
    let gridDimension = get(cursesCanvas).gridDimension;
    return {
        x: Math.floor(mousePosition.x / gridDimension.x),
        y: Math.floor(mousePosition.y / gridDimension.y)
    }
}