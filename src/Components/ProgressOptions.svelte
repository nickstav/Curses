<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { progressBarSize } from '../JS/stores/progressBar.js';
</script>

<div 
id="progressOptions" 
class="text-xs flex flex-col justify-center bg-gray-200"
>
    <h2 class="font-bold underline">Progress Bar:</h2>
    <div id="barsInput" class="flex flex-row justify-center items-center py-1">
        <input type="number" id="bars" min={progressBarSize.min} max={progressBarSize.max} class="w-6 ml-2" bind:value={$cursesCanvas.sizeOfProgressBar}>
        <label for="bars" class="px-1">Bars</label>
    </div>
    <div id="checkbox" class="flex flex-row items-center">
        <input id="showPerc" type=checkbox  class="ml-2" bind:checked={$cursesCanvas.showProgressPercentage}>
        <label for="showPerc" class="ml-1">Show percentage value</label>
    </div>
</div>