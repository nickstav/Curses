import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { gridDimension } from '../constants/canvasSize.js';

export class CanvasItem {
    constructor(location) {
        this.context = get(cursesCanvas).context;
        this.canvasWidth = get(cursesCanvas).canvasWidth;
        this.type = null;
        this.position = location;
        this.selected = false;
        // array to keep track of what squares have been filled by the object
        this.filledSquares = [];
        /* variables to help highlight the object */
        this.endPosition = undefined;
        this.selectedRectWidth = undefined;
        this.selectedRectHeight = undefined;
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.font = "15px Consolas";

        // if the item has been selected, call the highlight function to draw a rectangle around it
        if (this.selected) {
            this.highlight();
        }
    }

    toggleSelect() {
        this.selected = !this.selected;
    }

    updatePosition(newPosition) {
        this.position = newPosition;
        // remove the filledSquares array so it can be updated on the next draw loop
        this.filledSquares = [];
    }

    highlight(objectSize) {
        // width total is + 2 square due to... 
        // the 1/2 square padding either side (+1)
        // a width of x squares will have counted across (x-1) times to the end, so + 1 correction
        let rectWidth = objectSize.width + 2;
      
        //find the top left corner of the object area from which to draw the highlighting rectangle
        this.rectRefPoint = {
            x: Math.min(this.position.x, this.endPosition.x),
            y: Math.min(this.position.y, this.endPosition.y)
        }

        // highlight the object with a dashed rectangle around it
        this.context.beginPath();
        this.context.setLineDash([5,10]);
        this.context.rect(
            (this.rectRefPoint.x - 0.5) * gridDimension.x, // 1/2 square padding for highlighting box
            this.rectRefPoint.y * gridDimension.y,
            rectWidth * gridDimension.x,
            (objectSize.height + 0.5) * gridDimension.y // 1/2 square padding for highlighting box
        );
        this.context.stroke();
    }

    // clear any previous characters in the grid square (so latest object is drawn "on top")
    clearPreviousCharacter(currentLocation) {
        this.context.clearRect(
            currentLocation.x * gridDimension.x, 
            (currentLocation.y - 1) * gridDimension.y,
            gridDimension.x, 
            gridDimension.y
        );
    }

    // mark a grid square location as filled whilst avoiding repeated entries
    markGridSquareAsFilled(location) {
        if (this.filledSquares.some(position => position.x === location.x) 
            &&
            this.filledSquares.some(position => position.y === location.y)
        ) {
            return;
        } else {
            this.filledSquares.push(location);
        }
    }
}