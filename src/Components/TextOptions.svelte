<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { textNewLine } from '../JS/constants/toolsList.js';
</script>

<div id="textOptions" class="w-full text-xs flex flex-1 flex-col">
    <div id="radioButtons" class="flex flex-col items-start py-2">
        <h1 class="font-bold underline">New Line</h1>
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