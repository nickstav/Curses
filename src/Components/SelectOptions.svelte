<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { selectStyle } from '../JS/constants/selectTool.js';
</script>

<div id="selectOptions" class="bg-gray-400 w-20 h-full text-xs flex flex-col justify-center items-center py-0 px-5">
    <div id="radioButtons" class="flex flex-col items-center">
        <input type="radio" bind:group={$cursesCanvas.selectMethod} value={selectStyle.OBJECTS}>
        <label for="male">Select objects</label>
        <br>
        <input type="radio" bind:group={$cursesCanvas.selectMethod} value={selectStyle.AREA}>
        <label for="indented">Select area on grid</label>
    </div>
</div>