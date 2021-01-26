import { get } from '../../../web_modules/svelte/store.js';
import { projectStore } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';

export function eraseObject() {
    let canvasItems = get(canvasObjects);
    let mainObjectID = get(projectStore).IDOfFirstSelectedObject;

    canvasItems.forEach(object => {
        if (object.selected) {

            canvasObjects.eraseObjectFromStore(object);
            
            // remove the object's ID from the mainObject tag if required
            if (object.ID === mainObjectID) {
                projectStore.removeFirstSelectedObject();
            }
        }
    });
}
