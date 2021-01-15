<script>
    import DropDown from '../DropDown.svelte';
    import { cursesCanvas } from '../../JS/stores/project.js';
    import { updateCanvas } from '../../JS/draw/updateCanvas.js';
</script>

<div id="canvasSection" class="w-full flex flex-col border-t border-b border-black">

    <div id="header" class="w-full flex flex-row">
        <h1 class="w-full flex flex-1 text-left pl-1 font-semibold">CANVAS OPTIONS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showCanvasOptions} toggleSubMenu={()=>{cursesCanvas.toggleCanvasMenu()}}/>
    </div>

    {#if $cursesCanvas.showCanvasOptions}
    <div id="canvasSizing" class="w-full flex flex-col items-start px-1 py-1">

        <div id="widthInput" class="w-full flex flex-row pb-2">
            <label for="width" class="text-xs">width:</label>
            <input 
            type="text" 
            id="width" 
            size="3" 
            maxlength="4" 
            class="text-xs" 
            bind:value={$cursesCanvas.canvasWidth}
            on:input={()=>{updateCanvas()}}
            >  
        </div>
            
        <div id="heightInput" class="w-full flex flex-row">
            <label for="height" class="text-xs">height:</label>
            <input 
            type="text" 
            id="height" 
            size="3" 
            maxlength="4" 
            class="text-xs" 
            bind:value={$cursesCanvas.canvasHeight}
            on:input={()=>{updateCanvas()}}
            >
        </div>
     
    </div>
    {/if}
</div>