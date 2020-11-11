<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { progressBarSize } from '../JS/stores/progressBar.js';
</script>

<div id="progressOptions" class="p-2 bg-gray-300 w-full h-10 text-xs flex justify-center items-center py-0 px-5">
    <div id="barsInput">
        <label for="bars">Total number of bars:</label>
        <input type="number" id="bars" min={progressBarSize.min} max={progressBarSize.max} size="4" bind:value={$cursesCanvas.sizeOfProgressBar}>
    </div>
    <div id="checkbox" class="p-2">
        <label for="showPerc">Show Percentage Value</label>
        <input id="showPerc" type=checkbox bind:checked={$cursesCanvas.showProgressPercentage}>
    </div>
</div>