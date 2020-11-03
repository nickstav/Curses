<script>
    import SizeInput from './SizeInput.svelte';
    import SizeParagraph from './SizeParagraph.svelte';
    import Button from './Button.svelte';
    import TextOptions from './TextOptions.svelte';
    import ProgressOptions from './ProgressOptions.svelte';
    import { cursesCanvas } from '../JS/stores/project.js';
    import { changeTool } from '../JS/items/selectTool.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>

<div id="toolbar" class="bg-gray-300 w-full h-10 text-gray700 flex justify-between items-center py-0 px-5">
    <div id="appName">
        <h1 class="text-xs">C U R S E S . A P P</h1>
    </div>
    <SizeInput/>
    <div id="buttons" class="w-1/2 px-20 flex justify-between">
        <Button editCanvas={()=>{changeTool(tools.LINE)}} img={"url('./button_images/line.png')"}/>
        <Button editCanvas={()=>{changeTool(tools.RECTANGLE)}} img={"url('./button_images/rectangle.png')"}/>
        <Button editCanvas={()=>{changeTool(tools.TEXT)}} img={"url('./button_images/text.png')"}/>
        <Button editCanvas={()=>{changeTool(tools.DRAG)}} img={"url('./button_images/select.png')"}/>
        <Button editCanvas={()=>{changeTool(tools.PROGRESS)}} img={"url('./button_images/progress.png')"}/>
    </div>
</div>
{#if $cursesCanvas.tool === tools.TEXT}
    <TextOptions/>
{:else if $cursesCanvas.tool === tools.PROGRESS}
    <ProgressOptions/>
{/if}
<SizeParagraph/>