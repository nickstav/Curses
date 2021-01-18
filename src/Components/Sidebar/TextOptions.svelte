<script>
    import DropDown from '../DropDown.svelte';
    import { cursesCanvas } from '../../JS/stores/project.js';
    import { textNewLine } from '../../JS/constants/toolsList.js';
</script>

<div 
id="textOptions" 
class="w-full text-xs flex flex-col justify-center border-t-1 border-black px-3"
>

    <div id="header" class="w-full flex flex-row pb-1">
        <h1 class="w-full text-left font-semibold">TEXT OPTIONS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showTextOptions} toggleSubMenu={()=>{cursesCanvas.toggleTextMenu()}}/>
    </div>

    {#if $cursesCanvas.showTextOptions}
    <div id="newLineOption" class="flex flex-col items-start py-1">

        <h2 class="font-semibold pb-1">new line</h2>

        <div class="w-full flex flex-row justify-between">
            <label for="toLeft" class="pb-1 align-middle">
                <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.TOLEFT}>
                to the left
            </label>

            <label for="indented" class="pb-1 align-middle">
                <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.INDENTED}>
                indented
            </label>
        </div>

    </div>
    {/if}
    
</div>