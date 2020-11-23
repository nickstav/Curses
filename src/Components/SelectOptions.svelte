<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { selectStyle } from '../JS/constants/selectTool.js';
</script>

<div id="selectOptions" class="flex flex-col w-full h-full items-center justify-center">
    <div id="radioButtons" class="flex flex-col items-center">
        <input type="radio" bind:group={$cursesCanvas.selectMethod} value={selectStyle.OBJECTS}>
        <label for="male">Select objects</label>
        <br>
        <input type="radio" bind:group={$cursesCanvas.selectMethod} value={selectStyle.AREA}>
        <label for="indented">Select area on grid</label>
    </div>
</div>