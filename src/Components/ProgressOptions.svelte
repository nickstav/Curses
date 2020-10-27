<script>
    import { cursesCanvas } from '../JS/stores/store.js';
</script>

<div id="progressOptions" class="bg-gray-300 w-full h-10 text-xs flex flex-col justify-center items-center py-0 px-5">
    <p>
        Select the size of the progress bar
    </p>
    <div id="barsInput">
        <label for="bars">Number of bars:</label>
        <input type="number" id="bars" min="4" max="20" size="4" bind:value={$cursesCanvas.progressBars}>
    </div>
</div>