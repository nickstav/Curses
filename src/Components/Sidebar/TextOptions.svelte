<script>
    import DropDown from '../DropDown.svelte';
    import { cursesCanvas } from '../../JS/stores/project.js';
    import { textNewLine } from '../../JS/constants/toolsList.js';
</script>

<div 
id="textOptions" 
class="w-full text-xs flex flex-col justify-center border-t border-b border-black"
>

    <div id="header" class="w-full flex flex-row pb-1">
        <h1 class="w-full text-left px-1 font-semibold">TEXT OPTIONS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showTextOptions} toggleSubMenu={()=>{cursesCanvas.toggleTextMenu()}}/>
    </div>

    {#if $cursesCanvas.showTextOptions}
    <div id="newLineOption" class="flex flex-col items-start py-1">

        <h2 class="font-semibold px-1">new line</h2>

        <div class="flex flex-row items-center px-1">
            <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.TOLEFT}>
            <label for="toLeft" class="px-1">to the left</label>

            <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.INDENTED}>
            <label for="indented" class="px-1">indented</label>
        </div>

    </div>
    {/if}
    
</div>