import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';

export function eraseObject() {
    let canvasItems = get(canvasObjects).items;

    canvasItems.forEach(object => {
        if (object.selected) {
            canvasObjects.eraseObjectFromStore(object);
        }
    });
}
