import { cursesCanvas } from './project.js';
import { derived } from 'svelte/store';
import { minDimensions, maxDimensions, gridDimension} from '../constants/canvasSize.js';

// store to take cursesCanvas width/height values and draw correct canvas size
const gridAxis = derived(
    cursesCanvas,
    $cursesCanvas => ({
        x: adjustForMinMax('width', $cursesCanvas.canvasWidth) * gridDimension.x,
        y: adjustForMinMax('height', $cursesCanvas.canvasHeight) * gridDimension.y
    })
)

/* ------------------------------------------------------------------------------------------------- */

// store to give live values to confirm whether user entered width/height are below/above min max values
const checkUserInput = derived(
    cursesCanvas,
    $cursesCanvas => ({
        belowMin: checkMinValues($cursesCanvas),
        aboveMax: checkMaxValues($cursesCanvas)
    })
)

/* ------------------------------------------------------------------------------------------------- */

// function to ensure a min/max value of the canvas element
function adjustForMinMax(direction, length) {

    if (direction === 'width') {
        if (length < minDimensions.width) {
            return minDimensions.width;
        } else if (length > maxDimensions.width) {
            return maxDimensions.width;
        } else {
            return length;
        }
    }

    if (direction === 'height') {
        if (length < minDimensions.height) {
            return minDimensions.height;
        } else if (length > maxDimensions.height) {
            return maxDimensions.height;
        } else {
            return length;
        }
    }
}

/* ------------------------------------------------------------------------------------------------- */

// function to compare width/height values against their min dimensions
function checkMinValues(input) {
    if (input.canvasWidth < minDimensions.width || input.canvasHeight < minDimensions.height ) {
        return true;
    } else {
        return false;
    }
}

// function to compare width/height values against their max dimensions
function checkMaxValues(input) {
    if (input.canvasWidth > maxDimensions.width || input.canvasHeight > maxDimensions.height ) {
        return true;
    } else {
        return false;
    }
}



export { gridAxis, checkUserInput }
