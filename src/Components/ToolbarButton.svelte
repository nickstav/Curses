<script>
    import {toolbarActiveColour, toolbarPassiveColour } from '../JS/constants/colours.js';
    import { buttonCurrentlyPressed } from '../JS/items/selectTool.js';
    import { cursesCanvas } from '../JS/stores/project.js';

    export let label, editCanvas;

    let bgColour;

    $: toolSelected = buttonCurrentlyPressed($cursesCanvas.tool);
    $: if (toolSelected === label) {
            bgColour = toolbarActiveColour;
        } else {
            bgColour = toolbarPassiveColour
        }

</script>

<style>
    .selected {
        pointer-events: none;
	}
</style>

<div 
class:selected="{label === toolSelected}"
on:click={editCanvas} 
style="--bgColour: {bgColour}" 
class="py-2 px-2 cursor-pointer hover:text-header-font"
>
    <button
    id="toolbarButton"
    title={label}
    class="flex h-10 w-10 p-2 justify-center items-center bg-cover opacity-85 hover:opacity-100 rounded-md"
    style="background-color: var(--bgColour); outline: none"
    >
        <slot></slot>
    </button>
</div>