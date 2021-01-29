import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';
import { tools } from '../constants/toolsList.js';

import { TextItem } from '../items/textItem.js';
import { LineItem } from '../items/lineItem.js';
import { RectangleItem } from '../items/rectangleItem.js';
import { ProgressBarItem } from '../items/progressBarItem.js';

// create a duplicate of a selected object at a given offset to the original
export function duplicateObject() {
    let canvasItems = get(canvasObjects);
    //define the amount of grid squares to offset the duplicated object from the orignial
    let offset = 2;

    canvasItems.forEach(object => {
        if (object.selected) {
            let offsetPostion = {x: object.position.x + offset, y: object.position.y + offset};
            let offsetEndPosition;
            // define a variable in which to create a new object
            let newObject;

            switch(object.type) {
                case(tools.TEXT):
                    newObject = new TextItem(object.text, offsetPostion);
                    break;
                case(tools.LINE):
                    offsetEndPosition = {x: object.endPosition.x + offset, y: object.endPosition.y + offset};
                    newObject = new LineItem(offsetPostion, offsetEndPosition);
                    break;
                case(tools.RECTANGLE):
                    offsetEndPosition = {x: object.endPosition.x + offset, y: object.endPosition.y + offset};
                    newObject = new RectangleItem(offsetPostion, offsetEndPosition);
                    break;
                case(tools.PROGRESS):
                    let numberOfBars = object.numberOfBars;
                    newObject = new ProgressBarItem(offsetPostion);
                    newObject.numberOfBars = numberOfBars;
                    break;
            }
            canvasObjects.saveObjectToStore(newObject);
            // deselect the orignal and select the new object
            object.deselectObject();
            newObject.selectObject();
        }
    });
}