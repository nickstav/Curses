import { CanvasItem } from './objectClass.js';

import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';

import { tools } from '../constants/toolsList.js';
import { gridDimension } from '../constants/canvasSize.js';
import { cornerSelected } from '../constants/objectStates.js';


/* ---------------------------------------------------------------------------------------------- */

export class ProgressBarItem extends CanvasItem {
    constructor(location) {
        super(location)
        this.type = tools.PROGRESS;
        this.bar = '▮',
        this.emptyBar = '▯',
        this.numberOfBars = get(cursesCanvas).sizeOfProgressBar;
        this.percentageValue = 50,
        this.showPercentage = get(cursesCanvas).showProgressPercentage;
    }

    draw() {
        super.setFontAndColour();
        this.drawProgressBar();
        super.draw();
    }

    // draw a progress bar onto the canvas
    drawProgressBar() {
        let progressText = this.getProgressBarValues();

        this.addCharactersToCanvas(progressText);

        // log the end square so we can get the highlighting dimensions when required
        this.endPosition = this.filledSquares[this.filledSquares.length - 1];
    }

    drawBorder() {
        let width =  Math.abs(this.position.x - this.endPosition.x)

        let objectSize = {
            width: width,
            height: Math.abs(this.position.y - this.endPosition.y)
        }

        super.drawBorder(objectSize);
    }

    resizeObject(newPosition) {

        // remove the filledSquares array so it can be updated on the next draw loop
        this.filledSquares = [];

        //check which end of the line is being adjusted by checking which end is closer (using Pythagoras)
        let distanceToStartPoint =
            Math.sqrt(
                Math.pow((this.position.x - newPosition.x), 2) +
                Math.pow((this.position.y - newPosition.y), 2)
            );
        let distanceToEndPoint = 
            Math.sqrt(
                Math.pow((this.endPosition.x - newPosition.x), 2) +
                Math.pow((this.endPosition.y - newPosition.y), 2)
            );

        if (distanceToStartPoint > distanceToEndPoint) {
            // calculate the amount to increase/decrease the progress bar size
            let numberOfBarsToAdd = newPosition.x - this.endPosition.x;
            // keep the start position and increase the number of bars
            this.numberOfBars = this.numberOfBars + numberOfBarsToAdd;
        } else {
            // calculate the amount to increase/decrease the progress bar size
            let numberOfBarsToAdd = this.position.x - newPosition.x;
            // move the start position as the number of bars changes
            this.position.x = this.position.x - numberOfBarsToAdd;
            this.numberOfBars = this.numberOfBars + numberOfBarsToAdd;
        }
    }

    // write a line of the progress bar layout
    addCharactersToCanvas(text) {
        for (let i = 0; i < text.length; i++) {
            //get the next character in the string
            let character = text.charAt(i);

            let canvasCoordinates = {
                x: (this.position.x + i) * gridDimension.x,
                y: (this.position.y + 1) * gridDimension.y
            }
             // remove any object characters "beneath" this object
            this.clearPreviousCharacter({x: this.position.x + i, y: this.position.y + 1});

            //add the character to its assigned coordinates
            this.context.fillText(character, canvasCoordinates.x, canvasCoordinates.y);

            this.markGridSquareAsFilled({x: this.position.x + i, y: this.position.y + 1});
        };
    }

    // define the apperance of a progress bar
    getProgressBarValues() {
    
        //initially set a 50% complete progress bar for illustrative purposes
        let amountCompleted = Math.round(this.numberOfBars*(this.percentageValue/100));
        let amountToGo = this.emptyBar.repeat(this.numberOfBars - amountCompleted);
    
        // repeat the ascii character for the filled section of the progress bar
        let filledBars = this.bar.repeat(amountCompleted);
        // write the progress bar section using all defined values
        let progressText = filledBars + amountToGo + ` ${this.percentageValue}%`;

        return progressText;
    }

}