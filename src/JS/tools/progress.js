import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { getGridLocation } from '../draw/location.js';
import { updateCanvas } from '../draw/updateCanvas.js';
import { writeTextToCanvas } from './text.js';

// function to define the apperance of a progress bar
function getProgressBarValues(numberOfBars) {
    let bars = '▮'.repeat(numberOfBars);
    let text = 'Progress: ' + bars + ' 50%';
    let divider = '-'.repeat(text.length);

    return {
        statusText: 'STATUS...',
        progressText: text,
        divider: divider
    }
}

// function to preview the placement of a progress bar of fixed size
function previewProgressSize() {
    // remove any previously drawn previews
    updateCanvas();

    let context = get(cursesCanvas).context;
    let gridDimension = get(cursesCanvas).gridDimension;
    let currentLocation = get(cursesCanvas).mousePosition;
    let gridLocation = getGridLocation(currentLocation);
    let numberOfBars = get(cursesCanvas).progressBars;
    let progressBarSize = getProgressBarValues(numberOfBars).divider.length;

    context.fillStyle = 'rgb(100, 149, 237, 0.2)';
    context.fillRect(
        gridLocation.x * gridDimension.x, 
        gridLocation.y * gridDimension.y, 
        gridDimension.x * progressBarSize, 
        gridDimension.y * 3
    );
    context.stroke();
}

// save the progress bar and its location to the objects store
function saveProgressBarToStore() {
    let currentLocation = get(cursesCanvas).mousePosition;
    let objects = get(canvasObjects).numberOfObjects;

    let progressInfo = {
        order: objects + 1,
        location: getGridLocation(currentLocation),
        size: get(cursesCanvas).progressBars
    }

    canvasObjects.saveProgressBarObject(progressInfo);
}

// draw a progress bar onto the canvas
function drawProgressBar(location, size) {
    let appearance = getProgressBarValues(size);

    let statusLocation = location;
    let dividerLocation = {x: location.x, y: location.y + 1};
    let progressLocation = {x: location.x, y: location.y + 2};

    writeTextToCanvas(appearance.statusText, statusLocation, 'toLeft');
    writeTextToCanvas(appearance.divider, dividerLocation, 'toLeft');
    writeTextToCanvas(appearance.progressText, progressLocation, 'toLeft');
}

export { previewProgressSize, saveProgressBarToStore, drawProgressBar }