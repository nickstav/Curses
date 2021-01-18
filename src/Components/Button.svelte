<script>
    import { buttonCurrentlyPressed } from '../JS/items/selectTool.js';
    import { cursesCanvas } from '../JS/stores/project.js';
    export let img, label, location, editCanvas;

    let bgColour;

    $: toolSelected = buttonCurrentlyPressed($cursesCanvas.tool);
    $: if (toolSelected === label) {
            bgColour = 'rgba(243, 244, 246)';
        } else if (location === 'header') {
            bgColour = 'rgba(156, 163, 175)';
        } else {
            bgColour = 'rgba(209, 213, 219)'
        }

</script>

<div style="--imgSource: {img}; --bgColour: {bgColour}" class="flex flex-col items-center">
    <button
        id="toolBarButton"
        title={label}
        class="h-6 w-6 bg-cover text-xs py-1 px-3 opacity-80 hover:opacity-100 rounded-md"
        style="background-image: var(--imgSource); background-color: var(--bgColour); outline: none"
        on:click={editCanvas} 
        >
    </button>
    <label class="text-xs"></label>
</div>