<script>
    import DropDown from './DropDown.svelte';
    import { projectStore } from '../../JS/stores/project.js';
    import { textNewLine } from '../../JS/constants/toolsList.js';
</script>

<div 
id="textOptions" 
class="w-full text-xs flex flex-col justify-center border-t-1 border-black px-3 py-3 select-none"
>

    <div id="header" class="w-full flex flex-row">
        <h1 on:click={()=>{projectStore.toggleTextMenu()}} class="w-full text-left font-semibold cursor-pointer select-none">TEXT OPTIONS</h1>
        <DropDown menuDisplayed={$projectStore.showTextOptions} toggleSubMenu={()=>{projectStore.toggleTextMenu()}}/>
    </div>

    {#if $projectStore.showTextOptions}
    <div id="newLineOption" class="flex flex-col items-start pt-3">

        <h2 class="font-bold pb-2">text wrapping</h2>

            <label for="toLeft" class="pb-1 text-left font-semibold text-gray-700">
                <input type="radio" bind:group={$projectStore.textNewLine} value={textNewLine.TOLEFT} class="align-middle">
                align at left of canvas
            </label>

            <label for="indented" class="pb-1 text-left font-semibold text-gray-700">
                <input type="radio" bind:group={$projectStore.textNewLine} value={textNewLine.INDENTED} class="align-middle">
                align under start of text
            </label>

    </div>
    {/if}
    
</div>