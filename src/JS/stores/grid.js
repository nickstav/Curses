import { cursesCanvas } from './store.js';
import { derived, get } from 'svelte/store';
import { createMatrix } from '../draw/location.js';

// store to take cursesCanvas width/height values and draw correct canvas size
const gridAxis = derived(
    cursesCanvas,
    $cursesCanvas => ({
        x: adjustForMinMax('width', $cursesCanvas.canvasWidth) * $cursesCanvas.gridDimension.x,
        y: adjustForMinMax('height', $cursesCanvas.canvasHeight) * $cursesCanvas.gridDimension.y
    })
)

/* ------------------------------------------------------------------------------------------------- */

// store to mark grid squares as filled once objects are added to the canvas
function setUpDerivedStore() {
    const { subscribe, update } = derived(
        cursesCanvas, 
        $cursesCanvas => {
            let dimensions = {
                x: adjustForMinMax('width', $cursesCanvas.canvasWidth),
                y: adjustForMinMax('height', $cursesCanvas.canvasHeight)
             }

            return createMatrix(dimensions)
        }
    )

    function markSquareAsFilled(location) {
        update(matrix =>{
            let newMatrix = matrix;
            newMatrix[location.x, location.y] = 1;

            return {newMatrix};
        })
    }

	return {
        subscribe,
        markSquareAsFilled
	};
}

const gridStatus = setUpDerivedStore();

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
    let min = get(cursesCanvas).minDimensions;
    let max = get(cursesCanvas).maxDimensions;

    if (direction === 'width') {
        if (length < min.width) {
            return min.width;
        } else if (length > max.width) {
            return max.width;
        } else {
            return length;
        }
    }

    if (direction === 'height') {
        if (length < min.height) {
            return min.height;
        } else if (length > max.height) {
            return max.height;
        } else {
            return length;
        }
    }
}

// function to compare width/height values against their min dimensions
function checkMinValues(input) {
    if (input.canvasWidth < input.minDimensions.width || input.canvasHeight < input.minDimensions.height ) {
        return true;
    } else {
        return false;
    }
}

// function to compare width/height values against their max dimensions
function checkMaxValues(input) {
    if (input.canvasWidth > input.maxDimensions.width || input.canvasHeight > input.maxDimensions.height ) {
        return true;
    } else {
        return false;
    }
}



export { gridAxis, gridStatus, checkUserInput }
