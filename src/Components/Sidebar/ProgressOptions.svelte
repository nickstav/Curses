<script>
    import DropDown from '../DropDown.svelte';
    import { cursesCanvas } from '../../JS/stores/project.js';
    import { progressBarSize } from '../../JS/stores/progressBar.js';
</script>

<div 
id="progressOptions" 
class="w-full text-xs flex flex-col justify-start border-t border-b border-black px-3"
>

    <div id="header" class="w-full flex flex-row pb-1">
        <h1 class="w-full text-left font-semibold">PROGRESS BAR OPTIONS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showProgressOptions} toggleSubMenu={()=>{cursesCanvas.toggleProgressMenu()}}/>
    </div>

    {#if $cursesCanvas.showProgressOptions}

    <div id="options" class="w-full flex flex-col items-start py-2">
        <div id="barsInput" class="w-full flex flex-row">
            <label for="bars" class="text-xs w-24 text-left">number of bars</label>
            <input 
            type="number" 
            id="bars"
            min={progressBarSize.min} 
            max={progressBarSize.max} 
            class="text-xs h-5 w-16 pl-1 rounded-sm bg-gray-50" 
            bind:value={$cursesCanvas.sizeOfProgressBar}
            >
        </div>

        <div id="checkbox" class="w-full flex flex-row pt-2 align-middle">
            <label for="showPerc" class="text-xs text-left pr-6">show percentage value</label>
            <input 
            id="showPerc" 
            type=checkbox 
            bind:checked={$cursesCanvas.showProgressPercentage}
            >
        </div>
    </div>

    {/if}
    
</div>