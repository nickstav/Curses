import { CanvasItem } from './objectClass.js';

import { tools } from '../constants/toolsList.js';
import { gridDimension, yAlignment } from '../constants/canvasSize.js';
import { getSquaresForShallowLine, getSquaresForSteepLine } from './helperFunctions/lineHelper.js';

/* ---------------------------------------------------------------------------------------------- */

export class LineItem extends CanvasItem {
    constructor(startLocation, endLocation) {
        super(startLocation)
        this.type = tools.LINE;
        this.endPosition = endLocation;
    }

    draw() {
        super.draw();
  
        this.drawLineOnGrid(this.position.x, this.position.y, this.endPosition.x, this.endPosition.y);
    }

    drawBorder() {
        let objectSize = {
            width: Math.abs(this.position.x - this.endPosition.x),
            height: Math.abs(this.position.y - this.endPosition.y) + 1
        }
        super.drawBorder(objectSize);
    }

    updatePosition(newPosition) {
        let xChange = newPosition.x - this.position.x;
        let yChange = newPosition.y - this.position.y;

        super.updatePosition(newPosition);

        // update the line end point as well as the start position
        this.endPosition = {
            x: this.endPosition.x + this.mouseOffset.x + xChange,
            y: this.endPosition.y + this.mouseOffset.y + yChange
        }
    }

    resizeObject(newPosition) {
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
            // update the end point rather than the reference point
            this.endPosition = {
                x: newPosition.x,
                y: newPosition.y
            }
            // remove the filledSquares array so it can be updated on the next draw loop
             this.filledSquares = [];
        } else {
            // update the reference point as per the Object Class
           super.resizeObject(newPosition);
        }
    }

  
    // draw a line on a grid from (x1, y1) to (x2, y2)
    drawLineOnGrid(x1, y1, x2, y2) { 

        let deltaX = x2 - x1;
        let deltaY = y2 - y1;   
     
        // function to return one of "-" or "X" depending on line orientation
        let keyCharacter = this.getKeyCharacterForLine(deltaX, deltaY);
     
        // if the line has gradient < 1
        if (Math.abs(deltaY) <= Math.abs(deltaX)) { 
           if (deltaX >= 0) {
              // line is drawn left to right
              this.drawShallowLine(x1, y1, x2, deltaX, deltaY, keyCharacter);
           } else {
              // line is drawn right to left
              this.drawShallowLine(x2, y2, x1, deltaX, deltaY, keyCharacter);
           }    
        // if the line has gradient > 1   
        } else {         
           if (deltaY >= 0) {
              // line is drawn downwards
              this.drawSteepLine(x1, y1, y2, deltaX, deltaY, keyCharacter)
           } else { 
              // line is drawn upwards
              this.drawSteepLine(x2, y2, y1, deltaX, deltaY, keyCharacter)
           }        
        }
        // log the end square so we can get the highlighting dimensions when required
        this.endSquare = this.filledSquares[this.filledSquares.length - 1];
    }

    // run algorithm across x-axis of the line
    drawShallowLine(xInit, yInit, xFinal, deltaX, deltaY, keyCharacter) {

        let gridSquares = getSquaresForShallowLine(xInit, yInit, xFinal, deltaX, deltaY, keyCharacter);

        // clear any characters previously added to the grid square
        gridSquares.clear.forEach(square => {
            this.clearPreviousCharacter(square);
        });

        // add the required character to the square at location (x,y)
        gridSquares.add.forEach(square => {
            this.addCharacterToSquare(square.x, square.y, square.char);
        })
    }

    // run algorithm across y-axis of the line
    drawSteepLine(xInit, yInit, yFinal, deltaX, deltaY, keyCharacter) {
 
        let gridSquares = getSquaresForSteepLine(xInit, yInit, yFinal, deltaX, deltaY, keyCharacter);

        // clear any characters previously added to the grid square
        gridSquares.clear.forEach(square => {
            this.clearPreviousCharacter(square);
        });

        // add the required character to the square at location (x,y)
        gridSquares.add.forEach(square => {
            this.addCharacterToSquare(square.x, square.y, square.char);
        })
    }

    // Add relevant character to square
    addCharacterToSquare(xCoord, yCoord, keyCharacter) {
        // add 1 to the y value as coordinate is top corner of grid square
        this.context.fillText(keyCharacter, xCoord * gridDimension.x, ((yCoord + 1) * gridDimension.y) - yAlignment);
        
        //mark the grid square as filled
        this.markGridSquareAsFilled({x: xCoord, y: yCoord + 1});
    }
 

    getKeyCharacterForLine(deltaX, deltaY) {
        if (deltaX === 0) {
            return '|';
        } else if (deltaY === 0) {
            return '―'
        } else {
            return 'x';
        }
    }

}