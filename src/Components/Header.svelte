<script>
    import SizeParagraph from './SizeParagraph.svelte';
    import Button from './Button.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { changeTool } from '../JS/items/selectTool.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>

<div id="header" class="bg-gray-400 w-full h-12 text-gray700 flex justify-between items-center border-b-1 border-gray800">
    <div id="appName" class="mr-20">
        <h1 class="text-2xl ml-4">O   R   I   S   O   N</h1>
    </div>
    <div id="buttons" class="flex justify-between space-x-4 mr-3">
        <Button label={'line (l)'} location={'header'} editCanvas={()=>{changeTool(tools.LINE)}} img={"url('./button_images/line.png')"}/>
        <Button label={'rectangle (r)'} location={'header'} editCanvas={()=>{changeTool(tools.RECTANGLE)}} img={"url('./button_images/rectangle.png')"}/>
        <Button label={'text (t)'} location={'header'} editCanvas={()=>{changeTool(tools.TEXT)}} img={"url('./button_images/text.png')"}/>
        <Button label={'progress bar (p)'} location={'header'} editCanvas={()=>{changeTool(tools.PROGRESS)}} img={"url('./button_images/progress.png')"}/>
        <Button label={'select (v)'} location={'header'} editCanvas={()=>{changeTool(tools.DRAG)}} img={"url('./button_images/select.png')"}/>
    </div>
</div>
<SizeParagraph/>