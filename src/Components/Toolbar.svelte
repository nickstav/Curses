<script>
    import SizeParagraph from './SizeParagraph.svelte';
    import Button from './Button.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { changeTool } from '../JS/items/selectTool.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>

<div id="toolbar" class="bg-gray-400 w-full h-36 text-gray700 flex justify-center items-center py-0 px-10">
    <div id="appName" class="mr-20">
        <h1 class="text-2xl">O   R   I   S   O   N</h1>
    </div>
    <div id="buttons" class="w-1/2 px-20 flex justify-between">
        <Button label={'line'} editCanvas={()=>{changeTool(tools.LINE)}} img={"url('./button_images/line.png')"}/>
        <Button label={'rectangle'} editCanvas={()=>{changeTool(tools.RECTANGLE)}} img={"url('./button_images/rectangle.png')"}/>
        <Button label={'text'} editCanvas={()=>{changeTool(tools.TEXT)}} img={"url('./button_images/text.png')"}/>
        <Button label={'progress bar'} editCanvas={()=>{changeTool(tools.PROGRESS)}} img={"url('./button_images/progress.png')"}/>
        <Button label={'select object(s)'} editCanvas={()=>{changeTool(tools.DRAG)}} img={"url('./button_images/select.png')"}/>
    </div>
</div>
<SizeParagraph/>