<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { selectStyle } from '../JS/constants/selectTool.js';
</script>

<div id="selectOptions" class="w-full text-xs flex flex-1 flex-col">
    <div id="radioButtons" class="flex flex-col items-start py-2">
        <h1 class="font-bold underline">Method</h1>
        <div class="flex flex-row items-center">
            <input type="radio" bind:group={$cursesCanvas.selectMethod} value={selectStyle.OBJECTS}>
            <label for="male" class="px-1">Objects</label>
        </div>
        <div class="flex flex-row items-center">
            <input type="radio" bind:group={$cursesCanvas.selectMethod} value={selectStyle.AREA}>
            <label for="indented" class="px-1">Area</label>
        </div>
    </div>
</div>