import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { progressBarAppearance } from '../stores/progressBarAppearance.js';
import { getGridLocation } from '../draw/location.js';
import { updateCanvas } from '../draw/updateCanvas.js';
import { writeTextToCanvas } from './text.js';

// function to define the apperance of a progress bar
function getProgressBarValues(numberOfBars, title, status) {
    
    //initially set a 50% complete progress bar for illustrative purposes
    let amountCompleted = Math.round(numberOfBars/2);
    let amountToGo = ' '.repeat(numberOfBars - amountCompleted);
    let amountCompletedAsPerc = (amountCompleted/numberOfBars) * 100;

    let bars = get(progressBarAppearance).bars.repeat(amountCompleted);
    let text = title + ': ' + bars + amountToGo + `${amountCompletedAsPerc}%`;
    let divider = '-'.repeat(text.length);

    return {
        statusText: status,
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
    let numberOfBars = get(progressBarAppearance).numberOfBars;
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
        size: get(progressBarAppearance).numberOfBars,
        title: get(progressBarAppearance).title,
        status: get(progressBarAppearance).status
    }

    canvasObjects.saveProgressBarObject(progressInfo);
}

// draw a progress bar onto the canvas
function drawProgressBar(location, size, title, status) {
    let appearance = getProgressBarValues(size, title, status);

    let statusLocation = location;
    let dividerLocation = {x: location.x, y: location.y + 1};
    let progressLocation = {x: location.x, y: location.y + 2};

    writeTextToCanvas(appearance.statusText, statusLocation, 'toLeft');
    writeTextToCanvas(appearance.divider, dividerLocation, 'toLeft');
    writeTextToCanvas(appearance.progressText, progressLocation, 'toLeft');
}

export { previewProgressSize, saveProgressBarToStore, drawProgressBar }