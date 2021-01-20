<script>
    import DropDown from './DropDown.svelte';
    import { cursesCanvas } from '../../JS/stores/project.js';
    import { updateCanvas } from '../../JS/draw/updateCanvas.js';
</script>

<div id="canvasSection" class="w-full flex flex-col px-3 py-3">

    <div id="header" class="w-full flex flex-row">
        <h1 on:click={()=>{cursesCanvas.toggleCanvasMenu()}} class="w-full flex flex-1 text-left font-semibold cursor-pointer select-none">CANVAS OPTIONS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showCanvasOptions} toggleSubMenu={()=>{cursesCanvas.toggleCanvasMenu()}}/>
    </div>

    {#if $cursesCanvas.showCanvasOptions}
    <div id="canvasSizing" class="w-full flex flex-col items-start pt-3">

        <div id="widthInput" class="w-full flex flex-row pb-2 items-center">
            <label for="width" class="text-xs w-12 text-left">width</label>
            <input 
            type="text" 
            id="width" 
            size="3" 
            maxlength="4" 
            class="text-xs h-5 flex-1 pl-1 rounded-sm bg-gray-50" 
            bind:value={$cursesCanvas.canvasWidth}
            on:input={()=>{updateCanvas()}}
            >  
        </div>
            
        <div id="heightInput" class="w-full flex flex-row items-center">
            <label for="height" class="text-xs w-12 text-left">height</label>
            <input 
            type="text" 
            id="height" 
            size="3" 
            maxlength="4" 
            class="text-xs h-5 flex-1 pl-1 rounded-sm bg-gray-50" 
            bind:value={$cursesCanvas.canvasHeight}
            on:input={()=>{updateCanvas()}}
            >
        </div>
     
    </div>
    {/if}
</div>