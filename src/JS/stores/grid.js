import { cursesCanvas } from './store.js';
import { derived } from 'svelte/store';

export const gridAxis = derived(
    cursesCanvas,
    $cursesCanvas => ({
        x: $cursesCanvas.canvasWidth * $cursesCanvas.gridDimension.x,
        y: $cursesCanvas.canvasHeight * $cursesCanvas.gridDimension.y
    })
)
