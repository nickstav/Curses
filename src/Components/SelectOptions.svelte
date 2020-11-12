<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { selectStyle } from '../JS/constants/selectTool.js';
</script>

<div id="selectOptions" class="bg-gray-300 w-full h-10 text-xs flex flex-col justify-center items-center py-0 px-5">
    <div id="radioButtons">
        <input type="radio" bind:group={$cursesCanvas.selectMethod} value={selectStyle.OBJECTS}>
        <label for="male">Select objects</label>
        <input type="radio" bind:group={$cursesCanvas.selectMethod} value={selectStyle.AREA}>
        <label for="indented">Select area on grid</label>
    </div>
</div>