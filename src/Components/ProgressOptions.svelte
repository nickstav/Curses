<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { progressBarSize } from '../JS/stores/progressBar.js';
</script>

<div id="progressOptions" class="flex flex-col w-full h-full items-center justify-center">
    <div id="barsInput" class="flex flex-col items-center">
        <label for="bars">Total bars:</label>
        <input type="number" id="bars" min={progressBarSize.min} max={progressBarSize.max} class="w-5" bind:value={$cursesCanvas.sizeOfProgressBar}>
    </div>
    <br>
    <div id="checkbox" class="flex flex-col items-center">
        <label for="showPerc">Show Percentage Value</label>
        <input id="showPerc" type=checkbox bind:checked={$cursesCanvas.showProgressPercentage}>
    </div>
</div>