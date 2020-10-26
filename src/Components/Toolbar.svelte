<script>
    import SizeInput from './SizeInput.svelte';
    import SizeParagraph from './SizeParagraph.svelte';
    import Button from './Button.svelte';
    import TextOptions from './TextOptions.svelte';
    import { cursesCanvas } from '../JS/stores/store.js';
    import { changeTool } from '../JS/draw/eventHandling.js';
</script>

<div id="toolbar" class="bg-gray-300 w-full h-10 text-gray700 flex justify-between items-center py-0 px-5">
    <div id="appName">
        <h1 class="text-xs">C U R S E S . A P P</h1>
    </div>
    <SizeInput/>
    <div id="buttons" class="w-1/2 px-20 flex justify-between">
        <Button editCanvas={()=>{changeTool('line')}} img={"url('./button_images/line.png')"}/>
        <Button editCanvas={()=>{changeTool('rectangle')}} img={"url('./button_images/rectangle.png')"}/>
        <Button editCanvas={()=>{changeTool('text')}} img={"url('./button_images/text.png')"}/>
        <Button editCanvas={()=>{changeTool('grab')}} img={"url('./button_images/drag.png')"}/>
        <Button editCanvas={()=>{changeTool('progress')}} img={"url('./button_images/progress.png')"}/>
        <Button editCanvas={()=>{changeTool('erase')}} img={"url('./button_images/eraser.png')"}/>
    </div>
</div>
{#if $cursesCanvas.tool === 'text'}
    <TextOptions/>
{/if}
<SizeParagraph/>