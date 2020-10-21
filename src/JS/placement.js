import { get } from 'svelte/store';
import { cursesCanvas } from './store.js';

export function getGridLocation(mousePosition) {
    let gridDimension = get(cursesCanvas).gridDimension;
    return {
        x: Math.floor(mousePosition.x / gridDimension.x),
        y: Math.floor(mousePosition.y / gridDimension.y)
    }
}