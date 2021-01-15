<script>
    import DropDown from '../DropDown.svelte';
    import { cursesCanvas } from '../../JS/stores/project.js';
    import { progressBarSize } from '../../JS/stores/progressBar.js';
</script>

<div 
id="progressOptions" 
class="w-full text-xs flex flex-col justify-start border-t border-b border-black"
>

    <div id="header" class="w-full flex flex-row pb-1">
        <h1 class="w-full text-left px-1 font-semibold">PROGRESS BAR OPTIONS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showProgressOptions} toggleSubMenu={()=>{cursesCanvas.toggleProgressMenu()}}/>
    </div>

    {#if $cursesCanvas.showProgressOptions}
    <div id="barsInput" class="flex flex-row justify-start items-center px-1 py-1">
        <label for="bars" class="px-1">number of bars:</label>
        <input type="number" id="bars" min={progressBarSize.min} max={progressBarSize.max} class="w-6 ml-2" bind:value={$cursesCanvas.sizeOfProgressBar}>
    </div>
    <div id="checkbox" class="flex flex-row px-1">
        <label for="showPerc" class="ml-1">show percentage value</label>
        <input id="showPerc" type=checkbox  class="ml-2" bind:checked={$cursesCanvas.showProgressPercentage}>
    </div>
    {/if}
    
</div>