import { CanvasItem } from './objectClass.js';

import { get } from 'svelte/store';
import { projectStore } from '../stores/project.js';

import { tools, textNewLine } from '../constants/toolsList.js';
import { gridDimension, yAlignment } from '../constants/canvasSize.js';
import { cornerSelected } from '../constants/objectSelection.js';

/* ---------------------------------------------------------------------------------------------- */

export class TextItem extends CanvasItem {
    constructor(text, location) {
        super(location)
        this.type = tools.TEXT;
        this.text = text;
        this.newLine = get(projectStore).textNewLine;
    }

    draw() {
    
        super.setFontAndColour();
 
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
            this.context.fillText(character, canvasCoordinates.x, canvasCoordinates.y - yAlignment);

            this.markGridSquareAsFilled(gridSquare);
        };

        // log the end square so we can get the highlighting dimensions when required
        this.endPosition = this.filledSquares[this.filledSquares.length - 1];

        //now coordinates have been updated we can call the parent draw function
        super.draw()
    }

    drawBorder() {
        let width;
        // if text goes to a new line, highlight to the end of the canvas
        if (this.endPosition.y !== this.position.y + 1) {
            width = this.canvasWidth - this.position.x;
        } else {
            width =  Math.abs(this.position.x - this.endPosition.x)
        }

        let objectSize = {
            width: width,
            height: Math.abs(this.position.y - this.endPosition.y)
        }

        super.drawBorder(objectSize);
    }

    // calculate position (x,y) of text in case of indented/to margin new lines
    getGridSquare(charPosition) {
        // calculate the position of the character on the grid
        let xPosition;
        // calculate new lines started
        let yCorrection;

        if (this.newLine === textNewLine.INDENTED) {
            let indentedWidth = this.canvasWidth - this.position.x;
            // move down to the next row for every completed indentedWidth 
            yCorrection = Math.floor(charPosition / indentedWidth);
            // start a new line indented below the start of the text
            xPosition =  (charPosition + this.position.x) - (indentedWidth * yCorrection);

        } else if (this.newLine === textNewLine.TOLEFT) {
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

    isMouseOverCorner(mousePosition) {
        //text items cannot be resized so return NONE as default
        return cornerSelected.NONE;
    }
}



