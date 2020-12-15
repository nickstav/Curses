import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';
import { keyboardKeys } from '../constants/keyboardKeys.js';

//update either the x or y coord of an object by +/- 1 grid square with an arrow key press
export function moveObject(arrowDirection) {
    let canvasItems = get(canvasObjects);

    canvasItems.forEach(object => {
        if (object.selected) {

            object.mouseOffset = {x: 0, y: 0}
            
            switch(arrowDirection) {
                case(keyboardKeys.UP):
                    object.updatePosition({x: object.position.x, y: object.position.y - 5});
                    break;
                case(keyboardKeys.DOWN):
                    object.updatePosition({x: object.position.x, y: object.position.y + 5});
                    break;
                case(keyboardKeys.LEFT):
                    object.updatePosition({x: object.position.x - 5, y: object.position.y});
                    break;
                case(keyboardKeys.RIGHT):
                    object.updatePosition({x: object.position.x + 5, y: object.position.y});
                    break;
            }

        }
    });
}