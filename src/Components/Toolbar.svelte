<script>
    import ToolbarButton from './ToolbarButton.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { changeTool } from '../JS/items/selectTool.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>

<div id="buttons" class="flex flex-col h-full justify-start bg-gray-300 mr-4 border-r border-gray-400 pt-4">
    <ToolbarButton label={'line (l)'} editCanvas={()=>{changeTool(tools.LINE)}} img={'./images/buttons/line.png'}/>
    <ToolbarButton label={'rectangle (r)'} editCanvas={()=>{changeTool(tools.RECTANGLE)}} img={'./images/buttons/rectangle.png'}/>
    <ToolbarButton label={'text (t)'} editCanvas={()=>{changeTool(tools.TEXT)}} img={'./images/buttons/text.png'}/>
    <ToolbarButton label={'progress bar (p)'} editCanvas={()=>{changeTool(tools.PROGRESS)}} img={'./images/buttons/progress.png'}/>
    <ToolbarButton label={'select (v)'} editCanvas={()=>{changeTool(tools.DRAG)}} img={'./images/buttons/select.png'}/>
</div>