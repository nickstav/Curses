import { CanvasItem } from './objectClass.js';

import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';

import { tools } from '../constants/toolsList.js';
import { gridDimension } from '../constants/canvasSize.js';

/* ---------------------------------------------------------------------------------------------- */

export class TextItem extends CanvasItem {
    constructor(text, location) {
        super(location)
        this.type = tools.TEXT;
        this.text = text;
        this.newLine = get(canvasObjects).textNewLine;

        console.debug("Text item created, with text", this.text);
    }

    draw() {
        super.draw()
 
        for (let i = 0; i < this.text.length; i++) {
            //get the next character in the string
            let character = this.text.charAt(i);
            //get the grid square location for that character
            let gridSquare = this.getGridSquare(i);
    
            let canvasCoordinates = {
                x: gridSquare.x * gridDimension.x,
                y: gridSquare.y * gridDimension.y
            }
             // remove any object characters "beneath" this object
            this.clearPreviousCharacter(gridSquare);

            //add the character to its assigned coordinates
            this.context.fillText(character, canvasCoordinates.x, canvasCoordinates.y);

            //mark the current grid sqaure as filled by the text item
            //only run for the first draw loop to avoid multiple
            if (this.filledSquares.length < this.text.length) {
                this.filledSquares.push(gridSquare);
            }
        };

        console.debug("Text object drawn");
        // log the end square so we can get the highlighting dimensions when required
        this.endSquare = this.filledSquares[this.filledSquares.length - 1];
    }

    highlight() {
        super.highlight();

        // if text goes to a new line, highlight to the end of the canvas
        if (this.endSquare.y !== this.position.y + 1) {
            this.selectedRectWidth = this.canvasWidth - this.position.x;
        }
    }

    // calculate position (x,y) of text in case of indented/to margin new lines
    getGridSquare(charPosition) {
        // calculate the position of the character on the grid
        let xPosition;
        // calculate new lines started
        let yCorrection;

        if (this.newLine === "indented") {
            let indentedWidth = this.canvasWidth - this.position.x;
            // move down to the next row for every completed indentedWidth 
            yCorrection = Math.floor(charPosition / indentedWidth);
            // start a new line indented below the start of the text
            xPosition =  (charPosition + this.position.x) - (indentedWidth * yCorrection);

        } else if (this.newLine === "toLeft") {
            // the remainder of gridSquare / squareWidth will give the x coordinate of required square
            xPosition = ((charPosition + this.position.x) % this.canvasWidth),
            yCorrection = Math.floor((charPosition + this.position.x) / this.canvasWidth);
        }

        return {
            x: xPosition,
            y: (this.position.y + 1) + yCorrection
            // y location needs to be the square below (+1) as axis measured from the top,
        }
    }
}



