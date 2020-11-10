<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { progressBarSize } from '../JS/constants/progressBar.js';
</script>

<div id="progressOptions" class="bg-gray-300 w-full h-10 text-xs flex justify-center items-center py-0 px-5">
    <div id="barsInput">
        <label for="bars">Number of bars:</label>
        <input type="number" id="bars" min={progressBarSize.min} max={progressBarSize.max} size="4" bind:value={$cursesCanvas.sizeOfProgressBar}>
    </div>
</div>