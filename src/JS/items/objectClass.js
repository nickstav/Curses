import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { gridDimension, yAlignment } from '../constants/canvasSize.js';
import { cornerSelected, editMode } from '../constants/objectStates.js';
import { uuidv4 } from './helperFunctions/UUID.js';

export class CanvasItem {
    constructor(location) {
        this.ID = uuidv4();
        this.context = get(cursesCanvas).context;
        this.canvasWidth = get(cursesCanvas).canvasWidth;
        this.type = null;
        this.position = location;
        this.selected = false;
        this.editMode = editMode.MOVE;
        // array to keep track of what squares have been filled by the object
        // in form {x: gridCoord.x, y: gridCoord.y}
        this.filledSquares = [];
        /* variables to help highlight and drag the object */
        this.endPosition = undefined;
        this.mouseOffset = {x: 0, y: 0};
        this.rectRefPoint = undefined;
        this.rectWidth = undefined;
        this.rectCorners = undefined;
    }

    setFontAndColour() {
        let appearance = get(cursesCanvas).appearance;
        if (appearance === 'light') {
            this.context.fillStyle = 'black';
        } else if (appearance === 'dark') {
            this.context.fillStyle = 'white';
        }
        this.context.font = "15px monospace";
    }

    draw() {
        this.setFontAndColour();

        // if the item has been selected, call the highlight function to draw a rectangle around it
        if (this.selected) {
            this.drawBorder();
        }
    }

    selectObject() {
        this.selected = true;
    }

    deselectObject() {
        this.selected = false;
    }

    getMouseOffset(mouseLocation) {
        // get the offset from where the mouse clicked to the object reference position
        this.mouseOffset = {
            x: this.position.x - mouseLocation.x,
            y: this.position.y - mouseLocation.y
        }
    }

    updatePosition(newPosition) {
        this.position = {
           x: newPosition.x + this.mouseOffset.x,
           y: newPosition.y + this.mouseOffset.y
        }
        // remove the filledSquares array so it can be updated on the next draw loop
        this.filledSquares = [];
    }

    selectForResizing() {
        this.editMode = editMode.RESIZE;
    }

    selectForMoving() {
        this.editMode = editMode.MOVE;
    }

    resizeObject(newPosition) {
        this.position = {
            x: newPosition.x,
            y: newPosition.y
         }
         // remove the filledSquares array so it can be updated on the next draw loop
         this.filledSquares = [];
    }

    drawBorder(objectSize) {
        /* 
        width total is + 2 square due to... 
        ... the 1/2 square padding either side (+1)
        ... a width of x squares will have counted across (x-1) times to the end, so + 1 correction
        */
        this.rectWidth = objectSize.width + 2;
      
        //find the top left corner of the object area from which to draw the highlighting rectangle
        this.rectRefPoint = {
            x: Math.min(this.position.x, this.endPosition.x),
            y: Math.min(this.position.y, this.endPosition.y)
        }
        this.rectCorners = this.getRectangleCorners(this.rectRefPoint, this.rectWidth, objectSize.height);


        // highlight the object with a blue rectangle around it
        this.drawHighlightingRectangle(this.rectCorners.topL, this.rectWidth, objectSize.height)
        // border the rectangle with circles
        this.addHighlightingShapes(this.rectCorners.topL);
        this.addHighlightingShapes(this.rectCorners.topR);
        this.addHighlightingShapes(this.rectCorners.bottomL);
        this.addHighlightingShapes(this.rectCorners.bottomR);

        // return to default font colour once borders have been drawn
        this.setFontAndColour();
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
        if (this.filledSquares.some(position => (position.x === location.x && position.y === location.y))) {
            return;
        } else {
            this.filledSquares.push(location);
        }
    }
    getRectangleCorners(refPoint, width, height) {
        return {
            topL: {
                x: (refPoint.x - 0.5) * gridDimension.x, // 1/2 square padding for highlighting box
                y: refPoint.y * gridDimension.y
            },
            topR: {
                x: (refPoint.x - 0.5 + width) * gridDimension.x,
                y: refPoint.y * gridDimension.y
            },
            bottomL: {
                x: (refPoint.x - 0.5) * gridDimension.x,
                y: ((refPoint.y + height + 0.5) * gridDimension.y) - yAlignment // 1/2 square padding for highlighting box
            },
            bottomR: {
                x: (refPoint.x - 0.5 + width) * gridDimension.x,
                y: ((refPoint.y + height + 0.5) * gridDimension.y) - yAlignment // 1/2 square padding for highlighting box
            }
        }
    }

    drawHighlightingRectangle(topLeftCoords, width, height) {
        this.context.beginPath();
        this.context.strokeStyle = "#6495ED";
        this.context.rect(
            topLeftCoords.x,
            topLeftCoords.y,
            width * gridDimension.x,
            ((height + 0.5) * gridDimension.y) - yAlignment // 1/2 square padding for highlighting box
        );
        this.context.stroke();
    }
    
    addHighlightingShapes(coords) {
        this.context.beginPath();
        this.context.arc(coords.x, coords.y, 3, 0, 2 * Math.PI);
        this.context.fillStyle = "#6495ED";
        this.context.fill();
        this.context.strokeStyle = '#003300';
        this.context.stroke();
    }

    // function to return what corner a mouse position is over
    isMouseOverCorner(mousePosition) {
        // variable to define when the mouse cursor is over a rectangle corner
        let distanceFromMouseToCorner = 5;
    
        if (
            Math.abs(mousePosition.x - this.rectCorners.topL.x) < distanceFromMouseToCorner
            && 
            Math.abs(mousePosition.y - this.rectCorners.topL.y) < distanceFromMouseToCorner
        ) {
            return cornerSelected.TL;
        } else if (
            Math.abs(mousePosition.x - this.rectCorners.topR.x) < distanceFromMouseToCorner 
            && 
            Math.abs(mousePosition.y - this.rectCorners.topR.y) < distanceFromMouseToCorner
            ) {
            return cornerSelected.TR;
        } else if (
            Math.abs(mousePosition.x - this.rectCorners.bottomL.x) < distanceFromMouseToCorner
            && 
            Math.abs(mousePosition.y - this.rectCorners.bottomL.y) < distanceFromMouseToCorner
        ) {
            return cornerSelected.BL;
        } else if (
            Math.abs(mousePosition.x - this.rectCorners.bottomR.x) < distanceFromMouseToCorner
            && 
            Math.abs(mousePosition.y - this.rectCorners.bottomR.y) < distanceFromMouseToCorner
        ) {
            return cornerSelected.BR;
        } else {
            return cornerSelected.NONE;
        }
    }
}