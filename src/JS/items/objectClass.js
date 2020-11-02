import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { gridDimension } from '../constants/canvasSize.js';

export class CanvasItem {
    constructor(location) {
        this.context = get(cursesCanvas).context;
        this.canvasWidth = get(cursesCanvas).canvasWidth;
        this.type = null;
        this.position = location;
        this.endSquare = undefined;
        this.selected = false;
        this.filledSquares = [];
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

    highlight() {
        // width total is + 2 square due to... 
        // the 1/2 square padding either side (+1)
        // a width of x squares will have counted across (x-1) times to the end, so + 1 correction for this
        let rectWidth = Math.abs(this.endSquare.x - this.position.x) + 2;
        let rectHeight = Math.abs(this.position.y - this.endSquare.y);

        // highlight the object with a dashed rectangle around it
        this.context.beginPath();
        this.context.setLineDash([5,10]);
        this.context.rect(
            (this.position.x - 0.5) * gridDimension.x, // 1/2 square padding for highlighting box
            this.position.y * gridDimension.y,
            rectWidth * gridDimension.x,
            (rectHeight + 0.5) * gridDimension.y // 1/2 square padding for highlighting box
        );
        this.context.stroke();   
    }
}