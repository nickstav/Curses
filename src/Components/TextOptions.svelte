<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { textNewLine } from '../JS/constants/toolsList.js';
</script>

<div id="textOptions" class="bg-gray-300 w-full h-10 text-xs flex flex-col justify-center items-center py-0 px-5">
    <p>
        Select whether text continues on a new line indented, or to the left of the canvas
    </p>
    <div id="radioButtons">
        <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.TOLEFT}>
        <label for="male">to the left</label>
        <input type="radio" bind:group={$cursesCanvas.textNewLine} value={textNewLine.INDENTED}>
        <label for="indented">indented</label>
    </div>
</div>