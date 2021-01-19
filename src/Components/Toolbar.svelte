<script>
    import ToolbarButton from './ToolbarButton.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { changeTool } from '../JS/items/selectTool.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>

<div id="buttons" class="flex flex-col justify-between bg-gray-300 ml-4 mr-4 rounded-md border border-gray-400">
    <ToolbarButton label={'line (l)'} editCanvas={()=>{changeTool(tools.LINE)}} img={'./button_images/line.png'}/>
    <ToolbarButton label={'rectangle (r)'} editCanvas={()=>{changeTool(tools.RECTANGLE)}} img={'./button_images/rectangle.png'}/>
    <ToolbarButton label={'text (t)'} editCanvas={()=>{changeTool(tools.TEXT)}} img={'./button_images/text.png'}/>
    <ToolbarButton label={'progress bar (p)'} editCanvas={()=>{changeTool(tools.PROGRESS)}} img={'./button_images/progress.png'}/>
    <ToolbarButton label={'select (v)'} editCanvas={()=>{changeTool(tools.DRAG)}} img={'./button_images/select.png'}/>
</div>