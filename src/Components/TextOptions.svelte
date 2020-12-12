<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { textNewLine } from '../JS/constants/toolsList.js';

    /* TODO - extra text options

    <div id="textStyle" class="flex flex-row justify-between px-2 py-5">
        <button class="h-5 w-5 font-bold border border-black">B</button>
        <button class="h-5 w-5 underline border border-black">U</button>
    </div>

    */
</script>

<div id="textOptions" class="w-1/2 h-8 text-xs flex flex-row justify-center bg-gray-200 m-1 border border-black">
    <div id="newLineOption" class="flex flex-row items-center py-2">
        <h1 class="font-bold underline">New Line: </h1>
        <div class="flex flex-row items-center">
            <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.TOLEFT}>
            <label for="toLeft" class="px-1">to the left</label>
        </div>
        <div class="flex flex-row items-center">
            <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.INDENTED}>
            <label for="indented" class="px-1">indented</label>
        </div>
    </div>
</div>