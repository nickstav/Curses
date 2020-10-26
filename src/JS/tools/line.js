import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { getGridLocation, clearPreviousCharacter} from '../draw/location.js';

//get start point & end point of a line, find it's relevant start/end grid squares, then draw on the grid
export function drawLine() {
   let startPosition = get(cursesCanvas).startPosition;
   let currentLocation = get(cursesCanvas).mousePosition;

   let startSquare = getGridLocation(startPosition);
   let currentSquare = getGridLocation(currentLocation);

   drawLineOnGrid(startSquare.x, startSquare.y, currentSquare.x, currentSquare.y);
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

   // if the line has gradient < 1
   if (Math.abs(deltaY) <= Math.abs(deltaX)) { 
      if (deltaX >= 0) {
         // line is drawn left to right
         drawShallowLine(x1, y1, x2, deltaX, deltaY);
      } else {
         // line is drawn right to left
         drawShallowLine(x2, y2, x1, deltaX, deltaY);
      }    
   // if the line has gradient > 1   
   } else {         
      if (deltaY >= 0) {
         // line is drawn downwards
         drawSteepLine(x1, y1, y2, deltaX, deltaY)
      } else { 
         // line is drawn upwards
         drawSteepLine(x2, y2, y1, deltaX, deltaY)
      }        
   }
}

/* --------------------------------------------------------------------------------------------- */

// run algorithm across x-axis of the line
function drawShallowLine(xInit, yInit, xFinal, deltaX, deltaY) {

   // start at inital point on the line
   let x = xInit;
   let y = yInit;

   // fill square with character  
   addCharacterToSquare(x, y);
   
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
      //mark new square
      addCharacterToSquare(x, y);
   };

}

/* --------------------------------------------------------------------------------------------- */

// run algorithm across y-axis of the line
function drawSteepLine(xInit, yInit, yFinal, deltaX, deltaY) {

   // start at inital point on the line
   let x = xInit;
   let y = yInit;
   
   // fill square with character
   addCharacterToSquare(x, y);

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
      //mark new square
      addCharacterToSquare(x, y);
   };
}

/* --------------------------------------------------------------------------------------------- */

// Add relevant character to square
function addCharacterToSquare(xCoord, yCoord) {
   let context = get(cursesCanvas).context;
   let gridDimension = get(cursesCanvas).gridDimension;

   // add 1 to the y value as coordinate is top corner of grid square
   context.fillText('X', xCoord * gridDimension.x, (yCoord + 1) * gridDimension.y);
}