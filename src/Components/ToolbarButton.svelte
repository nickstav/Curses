<script>
    import {activeColour, passiveColour } from '../JS/constants/colours.js';
    import { buttonCurrentlyPressed } from '../JS/items/selectTool.js';
    import { cursesCanvas } from '../JS/stores/project.js';

    export let img, label, editCanvas;

    let bgColour;

    $: toolSelected = buttonCurrentlyPressed($cursesCanvas.tool);
    $: if (toolSelected === label) {
            bgColour = activeColour;
        } else {
            bgColour = passiveColour
        }

</script>

<div on:click={editCanvas} style="--bgColour: {bgColour}" class="py-2 px-2 cursor-pointer">
    <button
    id="sidebarButton"
    title={label}
    class="flex h-10 w-10 justify-center items-center bg-cover opacity-75 hover:opacity-100 rounded-md"
    style="background-color: var(--bgColour); outline: none"
    >
        <img src={img} alt={img} class="h-6 w-6">
    </button>
</div>