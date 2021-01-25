<script>
    import DropDown from './DropDown.svelte';
    import { projectStore } from '../../JS/stores/project.js';
    import { updateCanvas } from '../../JS/draw/updateCanvas.js';
</script>

<div id="canvasSection" class="w-full flex flex-col px-3 py-3 select-none">

    <div id="header" class="w-full flex flex-row">
        <h1 on:click={()=>{projectStore.toggleCanvasMenu()}} class="w-full flex flex-1 text-left font-semibold cursor-pointer select-none">CANVAS OPTIONS</h1>
        <DropDown menuDisplayed={$projectStore.showCanvasOptions} toggleSubMenu={()=>{projectStore.toggleCanvasMenu()}}/>
    </div>

    {#if $projectStore.showCanvasOptions}
    <div id="canvasSizing" class="w-full font-semibold text-gray-700 flex flex-col items-start py-3 border-b border-gray-300">

        <div id="widthInput" class="w-full flex flex-row pb-2 items-center">
            <label for="width" class="text-xs w-12 text-left">width</label>
            <input 
            type="text" 
            id="width" 
            size="3" 
            maxlength="4" 
            class="text-xs h-5 flex-1 pl-1 rounded-sm bg-gray-50 border border-sidebar-border" 
            bind:value={$projectStore.canvasWidth}
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
            class="text-xs h-5 flex-1 pl-1 rounded-sm bg-gray-50 border border-sidebar-border" 
            bind:value={$projectStore.canvasHeight}
            on:input={()=>{updateCanvas()}}
            >
        </div>
     
    </div>

    <div id="colourMode" class="w-full flex flex-col items-start pt-3">

        <h2 class="font-bold pb-2">appearance</h2>

        <div id="appearanceMode" class="flex flex-row justify-around w-full"> 
            <label for="toLeft" class="pb-1 text-left font-semibold text-gray-700">
                <input type="radio" bind:group={$projectStore.appearance} value={'light'} class="align-middle pr-2" on:change={()=>{updateCanvas()}}>
                light
            </label>

            <label for="indented" class="pb-1 text-left font-semibold text-gray-700">
                <input type="radio" bind:group={$projectStore.appearance} value={'dark'} class="align-middle" on:change={()=>{updateCanvas()}}>
                dark
            </label>
        </div>
    </div>
    {/if}
</div>