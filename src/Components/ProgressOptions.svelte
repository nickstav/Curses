<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { progressBarSize } from '../JS/stores/progressBar.js';
</script>

<div id="progressOptions" class="w-full text-xs flex flex-1 flex-col">
    <div id="barsInput" class="flex flex-row items-center py-2">
        <input type="number" id="bars" min={progressBarSize.min} max={progressBarSize.max} class="w-5 ml-2" bind:value={$cursesCanvas.sizeOfProgressBar}>
        <label for="bars" class="px-1">Bars</label>
    </div>
    <br>
    <div id="checkbox" class="flex flex-row items-center">
        <input id="showPerc" type=checkbox  class="ml-2" bind:checked={$cursesCanvas.showProgressPercentage}>
        <label for="showPerc" class="ml-1">Show % value</label>
    </div>
</div>