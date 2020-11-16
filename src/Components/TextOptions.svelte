<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { textNewLine } from '../JS/constants/toolsList.js';
</script>

<div id="textOptions" class="bg-gray-400 w-20 h-full text-xs flex flex-col justify-center items-center py-0 px-5">
    <div id="radioButtons" class="flex flex-col items-center">
        <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.TOLEFT}>
        <label for="toLeft">to the left</label>
        <br>
        <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.INDENTED}>
        <label for="indented">indented</label>
    </div>
</div>