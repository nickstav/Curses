import { projectStore } from './project.js';
import { derived } from '../../../web_modules/svelte/store.js';

export const progressBarSize = derived(
    projectStore,
    $projectStore => ({
        min: 2,
        max: getmaxProgressBarSize($projectStore.canvasWidth, $projectStore.showProgressPercentage)
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