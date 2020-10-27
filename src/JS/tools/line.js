import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { updateCanvas } from '../draw/updateCanvas.js';
import { getGridLocation, clearPreviousCharacter} from '../draw/location.js';


function drawLiveLine(event, isDrawing, canvasElement) {
   if (!isDrawing) return;
   // continually update the current mouse position
   cursesCanvas.updateMousePosition(event, canvasElement);
   // clear any prevously drawn lines from previous loop
   updateCanvas();
   // draw a new line based on new mouse position
   drawLine();
}

/* --------------------------------------------------------------------------------------------- */

//get start point & end point of a line, find it's relevant start/end grid squares, then draw on the grid
function drawLine() {
   let startPosition = get(cursesCanvas).startPosition;
   let currentLocation = get(cursesCanvas).mousePosition;

   let startSquare = getGridLocation(startPosition);
   let currentSquare = getGridLocation(currentLocation);

   drawLineOnGrid(startSquare.x, startSquare.y, currentSquare.x, currentSquare.y);
}

/* --------------------------------------------------------------------------------------------- */

// save a drawn line to the objects store
function saveLineToStore() {
   let startPosition = get(cursesCanvas).startPosition;
   let currentLocation = get(cursesCanvas).mousePosition;
   let objects = get(canvasObjects).numberOfObjects;

   let lineInfo = {
      order: objects + 1,
      start: getGridLocation(startPosition),
      finish: getGridLocation(currentLocation)
   }

   canvasObjects.saveLineObject(lineInfo);
}

/* we want lines to be drawn on the grid, so use Bresenham's algorithm to mark relevant
   grid squares that a line (x0, y0) --> (x1, y1) passes through

   https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm 

   As per the link above, the algorithm only works for one octant (gradient > 0, < 1), so we 
   need to translate the algorithm for all cases
*/

function drawLineOnGrid(x1, y1, x2, y2) { 

   let deltaX = x2 - x1;
   let deltaY = y2 - y1;   

   // function to return one of "-" or "X" depending on line orientation
   let keyCharacter = getKeyCharacterForLine(deltaX, deltaY);

   // if the line has gradient < 1
   if (Math.abs(deltaY) <= Math.abs(deltaX)) { 
      if (deltaX >= 0) {
         // line is drawn left to right
         drawShallowLine(x1, y1, x2, deltaX, deltaY, keyCharacter);
      } else {
         // line is drawn right to left
         drawShallowLine(x2, y2, x1, deltaX, deltaY, keyCharacter);
      }    
   // if the line has gradient > 1   
   } else {         
      if (deltaY >= 0) {
         // line is drawn downwards
         drawSteepLine(x1, y1, y2, deltaX, deltaY, keyCharacter)
      } else { 
         // line is drawn upwards
         drawSteepLine(x2, y2, y1, deltaX, deltaY, keyCharacter)
      }        
   }
}

/* --------------------------------------------------------------------------------------------- */

// run algorithm across x-axis of the line
function drawShallowLine(xInit, yInit, xFinal, deltaX, deltaY, keyCharacter) {
   let gridDimension = get(cursesCanvas).gridDimension;
   let context = get(cursesCanvas).context;
   context.fillStyle = 'black';
   context.font = "15px Consolas";

   // start at inital point on the line
   let x = xInit;
   let y = yInit;

   // clear any previous characters in the relevant grid square
   // add 1 to the y value as coordinate is top corner of grid square
   clearPreviousCharacter({x: x, y: y + 1}, gridDimension, context);
   // fill square with character  
   addCharacterToSquare(x, y, keyCharacter);
   
   // as per Bresenham's Algorithm
   let diffBetweenPoints = 2 * Math.abs(deltaY) - Math.abs(deltaX);
         
   for (let i = 0; x < xFinal; i++) {
      // iterate for each x integer value from xInit to xFinal
      x = x + 1;
      
      // if gradient is negative, remain on current y value & update difference
      if (diffBetweenPoints < 0) {
         diffBetweenPoints = diffBetweenPoints + 2 * Math.abs(deltaY);
      //if gradient is positive, move up/down to the next point & update difference
      } else {
         if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
            // line is in octant bounded by the line y = x
            y = y + 1;
         } else {
             // line is in octant bounded by the line y = -x
            y = y - 1;
         };
      diffBetweenPoints = diffBetweenPoints + 2 * (Math.abs(deltaY) - Math.abs(deltaX));
      };
      // clear any previous characters in the relevant grid square
      clearPreviousCharacter({x: x, y: y + 1}, gridDimension, context);
      //mark new square
      addCharacterToSquare(x, y, keyCharacter);
   };

}

/* --------------------------------------------------------------------------------------------- */

// run algorithm across y-axis of the line
function drawSteepLine(xInit, yInit, yFinal, deltaX, deltaY, keyCharacter) {
   let gridDimension = get(cursesCanvas).gridDimension;
   let context = get(cursesCanvas).context;
   context.fillStyle = 'black';
   context.font = "15px Consolas";

   // start at inital point on the line
   let x = xInit;
   let y = yInit;
   
   // clear any previous characters in the relevant grid square
   clearPreviousCharacter({x: x, y: y + 1}, gridDimension, context);
   // fill square with character
   addCharacterToSquare(x, y, keyCharacter);

   // as per Bresenham's Algorithm
   let diffBetweenPoints = 2 * Math.abs(deltaX) - Math.abs(deltaY);

   for (let i = 0; y < yFinal; i++) {
      // iterate for each y integer value from yInit to yFinal
      y = y + 1;  

      // if gradient is negative, remain on current x value & update difference
      if (diffBetweenPoints <= 0) {
         diffBetweenPoints = diffBetweenPoints + 2 * Math.abs(deltaX);
      //if gradient is positive, move across/back to the next point & update difference
      } else {
         if ((deltaX < 0 && deltaY<0) || (deltaX > 0 && deltaY > 0)) {
            // line is in octant bounded by the line y = x
            x = x + 1;
         } else {
            // line is in octant bounded by the line y = -x
            x = x - 1;
         };
         diffBetweenPoints = diffBetweenPoints + 2 * (Math.abs(deltaX) - Math.abs(deltaY));
      };
      // clear any previous characters in the relevant grid square
      clearPreviousCharacter({x: x, y: y + 1}, gridDimension, context);
      //mark new square
      addCharacterToSquare(x, y, keyCharacter);
   };
}

/* --------------------------------------------------------------------------------------------- */

// Add relevant character to square
function addCharacterToSquare(xCoord, yCoord, keyCharacter) {
   let context = get(cursesCanvas).context;
   let gridDimension = get(cursesCanvas).gridDimension;

   // add 1 to the y value as coordinate is top corner of grid square
   context.fillText(keyCharacter, xCoord * gridDimension.x, (yCoord + 1) * gridDimension.y);
}

/* --------------------------------------------------------------------------------------------- */

function getKeyCharacterForLine(deltaX, deltaY) {
   if (deltaX === 0) {
      return '|';
   } else if (deltaY === 0) {
      return '-'
   } else {
      return 'x';
   }
}

/* --------------------------------------------------------------------------------------------- */

export { drawLine, drawLiveLine, drawLineOnGrid, saveLineToStore }