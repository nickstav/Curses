<script>
    import Button from './Button.svelte';
    import { changeTool } from '../JS/eventHandling.js';
</script>

<div id="toolbar" class="bg-gray-300 w-full h-10 text-gray700 flex justify-between items-center py-0 px-5">
    <div id="appName">
        <h1 class="text-xs">C U R S E S . A P P</h1>
    </div>
    <div id="buttons" class="w-1/2 px-20 flex justify-between">
        <Button editCanvas={()=>{changeTool('line')}} img={"url('./button_images/line.png')"}/>
        <Button editCanvas={()=>{changeTool('rectangle')}} img={"url('./button_images/rectangle.png')"}/>
        <Button editCanvas={()=>{changeTool('text')}} img={"url('./button_images/text.png')"}/>
        <Button editCanvas={()=>{changeTool('grab')}} img={"url('./button_images/drag.png')"}/>
        <Button editCanvas={()=>{changeTool('progress')}} img={"url('./button_images/progress.png')"}/>
        <Button editCanvas={()=>{changeTool('erase')}} img={"url('./button_images/eraser.png')"}/>
    </div>
</div>