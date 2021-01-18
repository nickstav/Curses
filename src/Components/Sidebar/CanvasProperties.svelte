<script>
    import DropDown from '../DropDown.svelte';
    import { cursesCanvas } from '../../JS/stores/project.js';
    import { updateCanvas } from '../../JS/draw/updateCanvas.js';
</script>

<div id="canvasSection" class="w-full flex flex-col border-b-1 border-black px-3">

    <div id="header" class="w-full flex flex-row">
        <h1 class="w-full flex flex-1 text-left font-semibold">CANVAS OPTIONS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showCanvasOptions} toggleSubMenu={()=>{cursesCanvas.toggleCanvasMenu()}}/>
    </div>

    {#if $cursesCanvas.showCanvasOptions}
    <div id="canvasSizing" class="w-full flex flex-col items-start py-1">

        <div id="widthInput" class="w-full flex flex-row pb-2">
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
            
        <div id="heightInput" class="w-full flex flex-row">
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