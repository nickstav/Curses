<script>
    import { canvasObjects } from '../JS/stores/objects.js';
</script>

<div id="textOptions" class="bg-gray-300 w-full h-10 text-xs flex flex-col justify-center items-center py-0 px-5">
    <p>
        Select whether text continues on a new line indented, or to the left of the canvas
    </p>
    <div id="radioButtons">
        <input type="radio" bind:group={$canvasObjects.textNewLine} value="toLeft">
        <label for="male">to the left</label>
        <input type="radio" bind:group={$canvasObjects.textNewLine} value="indented">
        <label for="indented">indented</label>
    </div>
</div>