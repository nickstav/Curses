<script>
    import { progressBarAppearance } from '../JS/stores/progressBarAppearance.js';
</script>

<div id="progressOptions" class="bg-gray-300 w-full h-10 text-xs flex justify-center items-center py-0 px-5">
    <div id="titleInput">
        <label for="title">Title:</label>
        <input type="text" id="title" size="10" bind:value={$progressBarAppearance.title}>
    </div>
    <div id="statusInput">
        <label for="title">Status text:</label>
        <input type="text" id="title" size="10" bind:value={$progressBarAppearance.status}>
    </div>
    <div id="barsInput">
        <label for="bars">Number of bars:</label>
        <input type="number" id="bars" min="4" max="20" size="4" bind:value={$progressBarAppearance.numberOfBars}>
    </div>
</div>