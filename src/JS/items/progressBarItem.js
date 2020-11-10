import { CanvasItem } from './objectClass.js';

import { get } from 'svelte/store';
import { progressBarAppearance } from '../stores/progressBarAppearance.js';

import { tools } from '../constants/toolsList.js';
import { gridDimension } from '../constants/canvasSize.js';
import { progressLayout } from './helperFunctions/progressHelper.js';


/* ---------------------------------------------------------------------------------------------- */

export class ProgressBarItem extends CanvasItem {
    constructor(location) {
        super(location)
        this.type = tools.PROGRESS;
        this.numberOfBars = get(progressBarAppearance).numberOfBars;
        this.title = get(progressBarAppearance).title;
        this.status = get(progressBarAppearance).status;
        this.barChar = get(progressBarAppearance).bars;
    }

    draw() {
        super.setFontAndColour();
        this.drawProgressBar();
        super.draw();
    }

    // draw a progress bar onto the canvas
    drawProgressBar() {
        let appearance = this.getProgressBarValues();

        this.addCharactersToCanvas(appearance.statusText, progressLayout.FIRSTLINE);
        this.addCharactersToCanvas(appearance.divider, progressLayout.SECONDLINE);
        this.addCharactersToCanvas(appearance.progressText, progressLayout.THIRDLINE);
    }

    // write a line of the progress bar layout
    addCharactersToCanvas(text, line) {
        for (let i = 0; i < text.length; i++) {
            //get the next character in the string
            let character = text.charAt(i);
            
            //define grid Coords based on what part of the progress bar we are drawing
            let lineIndent;
            switch(line) {
                case(progressLayout.FIRSTLINE):
                    lineIndent = 1;
                    break;
                case(progressLayout.SECONDLINE):
                    lineIndent = 2;
                    break;
                case(progressLayout.THIRDLINE):
                    lineIndent = 3;
                    break;
            }

            let canvasCoordinates = {
                x: (this.position.x + i) * gridDimension.x,
                y: (this.position.y + lineIndent) * gridDimension.y
            }
             // remove any object characters "beneath" this object
            this.clearPreviousCharacter({x: this.position.x + i, y: this.position.y + lineIndent});

            //add the character to its assigned coordinates
            this.context.fillText(character, canvasCoordinates.x, canvasCoordinates.y);

            this.markGridSquareAsFilled({x: this.position.x + i, y: this.position.y + lineIndent});
        };
    }

    // define the apperance of a progress bar
    getProgressBarValues() {
    
        //initially set a 50% complete progress bar for illustrative purposes
        let amountCompleted = Math.round(this.numberOfBars/2);
        let amountToGo = ' '.repeat(this.numberOfBars - amountCompleted);
        let amountCompletedAsPerc = (amountCompleted/this.numberOfBars) * 100;
    
        // repeat the ascii character for the filled section of the progress bar
       let filledBars = this.barChar.repeat(amountCompleted);
        // write the progress bar section using all defined values
        let text = this.title + ': ' + filledBars + amountToGo + `${amountCompletedAsPerc}%`;
        // add a divider of same length between status and progress bar
        let divider = '-'.repeat(text.length);

        return {
            statusText: this.status,
            progressText: text,
            divider: divider
        }
    }

}