import { CanvasItem } from './objectClass.js';

import { get } from 'svelte/store';
import { canvasObjects } from '../stores/objects.js';
import { cursesCanvas } from '../stores/project.js';

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
            let gridSquare = getGridSquare(i, this.position, this.newLine);
    
            let coordinates = {
                x: gridSquare.x,
                y: gridSquare.y
            }

            //add the character to its assigned coordinates
            this.context.fillText(character, coordinates.x * gridDimension.x, coordinates.y * gridDimension.y);
        };

        console.debug("Text object drawn")
    }
}

/* ---------------------------------------------------------------------------------------------- */

// get the grid square coordinates for a given character in a text object
function getGridSquare(charPosition, location, newLine) {
    let canvasWidth = get(cursesCanvas).canvasWidth;

    //get new line and any required indentation
    let positionUpdate = getNewLines(charPosition, location, canvasWidth, newLine);

    return {
        x: positionUpdate.x,
        y: (1 + location.y + positionUpdate.y)
        // y location needs to be the square below (+1) as axis measured from the top,
    }
}

// calculate position (x,y) of text in case of indented/to margin new lines
function getNewLines(charPosition, location, canvasWidth, newLine) {
    // calculate the position of the character on the grid
    let xPosition;
    // calculate new lines started
    let yCorrection;

    if (newLine === "indented") {
        let indentedWidth = canvasWidth - location.x;
        yCorrection = Math.floor(charPosition / indentedWidth);
        // start a new line indented below the start of the text
        xPosition =  (charPosition + location.x) - (indentedWidth * yCorrection);

    } else if (newLine === "toLeft") {
        // the remainder of gridSquare / squareWidth will give the x coordinate of required square
        xPosition = ((charPosition + location.x) % canvasWidth),
        yCorrection = Math.floor((charPosition + location.x) / canvasWidth);
    }

    return {
        x: xPosition,
        y: yCorrection
    }
}