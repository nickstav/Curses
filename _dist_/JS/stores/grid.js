import { projectStore } from './project.js';
import { derived } from '../../../web_modules/svelte/store.js';
import { minDimensions, maxDimensions, gridDimension} from '../constants/canvasSize.js';

// store to take projectStore width/height values and draw correct canvas size
const gridAxis = derived(
    projectStore,
    $projectStore => ({
        x: adjustForMinMax('width', $projectStore.canvasWidth) * gridDimension.x,
        y: adjustForMinMax('height', $projectStore.canvasHeight) * gridDimension.y
    })
)

/* ------------------------------------------------------------------------------------------------- */

// store to give live values to confirm whether user entered width/height are below/above min max values
const checkUserInput = derived(
    projectStore,
    $projectStore => ({
        belowMin: checkMinValues($projectStore),
        aboveMax: checkMaxValues($projectStore)
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
