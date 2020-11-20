import { cursesCanvas } from './project.js';
import { derived } from 'svelte/store';

export const progressBarSize = derived(
    cursesCanvas,
    $cursesCanvas => ({
        min: 2,
        max: getmaxProgressBarSize($cursesCanvas.canvasWidth, $cursesCanvas.showProgressPercentage)
    })
)

function getmaxProgressBarSize(canvasWidth, isShowingPercentage) {
    if (isShowingPercentage) {
        // allow for extra text in showing percentage value
        return canvasWidth - 4;
    } else {
        return canvasWidth;
    }
}