import { CanvasItem } from './objectClass.js';

import { tools } from '../constants/toolsList.js';
import { gridDimension } from '../constants/canvasSize.js';
import { getVerticalCoords, getHorizontalCoords } from './helperFunctions/rectHelper.js';

export class RectangleItem extends CanvasItem {
    constructor(startLocation, endLocation) {
        super(startLocation)
        this.type = tools.RECTANGLE;
        this.endPosition = endLocation;
        this.cornerChar = '+';
        this.vertChar = '|';
        this.horizChar = '-';
    }

    draw() {
        super.setFontAndColour();

        // create a rectangle using ascii characters for the given coordinates
        this.drawRectangle(this.position, this.endPosition);

        super.draw();
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

    drawRectangle(startSquare, endSquare) {
        let width = endSquare.x - startSquare.x;
         // y location needs to be the square below as axis measured from the top
         let cornerSquares = {
            topLeft: {x: startSquare.x, y: startSquare.y + 1},
            topRight: {x: startSquare.x + width, y: startSquare.y + 1},
            bottomLeft: {x: endSquare.x - width, y: endSquare.y + 1},
            bottomRight: {x: endSquare.x, y: endSquare.y + 1}
        }
        this.addCorners(cornerSquares);
        this.addVerticals(cornerSquares);
        this.addHorizontals(cornerSquares);
    }

    addCorners(cornerSquares) {
        this.clearPreviousCharacter(cornerSquares.topLeft);
        this.clearPreviousCharacter(cornerSquares.topRight);
        this.clearPreviousCharacter(cornerSquares.bottomLeft);
        this.clearPreviousCharacter(cornerSquares.bottomRight);

        this.addCharacterToSquare(cornerSquares.topLeft.x, cornerSquares.topLeft.y, this.cornerChar);
        this.addCharacterToSquare(cornerSquares.topRight.x, cornerSquares.topRight.y, this.cornerChar);
        this.addCharacterToSquare(cornerSquares.bottomLeft.x, cornerSquares.bottomLeft.y, this.cornerChar);
        this.addCharacterToSquare(cornerSquares.bottomRight.x, cornerSquares.bottomRight.y, this.cornerChar);
    }

    addVerticals(coords) {
        let gridSquares = getVerticalCoords(coords);

        // clear any characters previously added to the grid square
        gridSquares.leftSide.forEach(square => {
            this.clearPreviousCharacter(square);
        });
        gridSquares.rightSide.forEach(square => {
            this.clearPreviousCharacter(square);
        });

        // add the required character to the square at location (x,y)
        gridSquares.leftSide.forEach(square => {
            this.addCharacterToSquare(square.x, square.y, this.vertChar);
        })
        gridSquares.rightSide.forEach(square => {
            this.addCharacterToSquare(square.x, square.y, this.vertChar);
        })
    }

    addHorizontals(coords) {
        let gridSquares = getHorizontalCoords(coords);

        // clear any characters previously added to the grid square
        gridSquares.top.forEach(square => {
            this.clearPreviousCharacter(square);
        });
        gridSquares.bottom.forEach(square => {
            this.clearPreviousCharacter(square);
        });

        // add the required character to the square at location (x,y)
        gridSquares.top.forEach(square => {
            this.addCharacterToSquare(square.x, square.y, this.horizChar);
        })
        gridSquares.bottom.forEach(square => {
            this.addCharacterToSquare(square.x, square.y, this.horizChar);
        })
    }

    // Add relevant character to square
    addCharacterToSquare(xCoord, yCoord, keyCharacter) {
        this.context.fillText(keyCharacter, xCoord * gridDimension.x, yCoord * gridDimension.y);
        
        //mark the grid square as filled
        this.markGridSquareAsFilled({x: xCoord, y: yCoord});
    }
}