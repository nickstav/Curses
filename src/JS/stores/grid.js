import { cursesCanvas } from './store.js';
import { derived } from 'svelte/store';
import { get } from 'svelte/store';

export const gridAxis = derived(
    cursesCanvas,
    $cursesCanvas => ({
        x: adjustForMinMax('width', $cursesCanvas.canvasWidth) * $cursesCanvas.gridDimension.x,
        y: adjustForMinMax('height', $cursesCanvas.canvasHeight) * $cursesCanvas.gridDimension.y
    })
)

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
