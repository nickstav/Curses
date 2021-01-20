<script>
    import DropDown from './DropDown.svelte';
    import { cursesCanvas } from '../../JS/stores/project.js';
    import { textNewLine } from '../../JS/constants/toolsList.js';
</script>

<div 
id="textOptions" 
class="w-full text-xs flex flex-col justify-center border-t-1 border-black px-3 py-3"
>

    <div id="header" class="w-full flex flex-row">
        <h1 on:click={()=>{cursesCanvas.toggleTextMenu()}} class="w-full text-left font-semibold cursor-pointer select-none">TEXT OPTIONS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showTextOptions} toggleSubMenu={()=>{cursesCanvas.toggleTextMenu()}}/>
    </div>

    {#if $cursesCanvas.showTextOptions}
    <div id="newLineOption" class="flex flex-col items-start pt-3">

        <h2 class="font-semibold pb-2">text wrapping</h2>

            <label for="toLeft" class="pb-1 text-left">
                <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.TOLEFT} class="align-middle">
                new line from canvas edge
            </label>

            <label for="indented" class="pb-1 text-left">
                <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.INDENTED} class="align-middle">
                align under start of text
            </label>

    </div>
    {/if}
    
</div>