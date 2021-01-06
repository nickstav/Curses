<script>
    import Button from './Button.svelte';
    import TextOptions from './TextOptions.svelte';
    import ProgressOptions from './ProgressOptions.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { tools } from '../JS/constants/toolsList.js';
    import { keyboardKeys } from '../JS/constants/keyboardKeys.js';
    import { duplicateObject } from '../JS/draw/duplicate.js';
    import { alignObjects } from '../JS/draw/offset.js';
    import { eraseObject } from '../JS/draw/erase.js';
    import { moveObject } from '../JS/draw/move.js';
    import { updateCanvas } from '../JS/draw/updateCanvas.js';
</script>

    <div id="sidebarButton" class="absolute top-1 right-2">
        <Button editCanvas={cursesCanvas.toggleSidebar} img={"url('./button_images/tools.png')"}/>
    </div>

    {#if $cursesCanvas.showSidebar}

    <div id="sidebar" 
    class="bg-gray-200 w-full h-full text-xs flex flex-col justify-between items-center pb-8"
    on:click={()=>{updateCanvas()}}
    >
        <div id="firstButtonRow" class=" w-full flex flex-row justify-around py-1">
            <Button editCanvas={duplicateObject} img={"url('./button_images/duplicate.png')"}/>
            <Button editCanvas={eraseObject} img={"url('./button_images/delete.png')"}/>
        </div>
        <div id="alignOptions" class="py-6 w-full">
            <div id="firstButtonRow" class=" w-full flex flex-row justify-around py-1">
                <Button editCanvas={()=>{alignObjects(keyboardKeys.LEFT)}} img={"url('./button_images/align_left.png')"}/>
                <Button editCanvas={()=>{alignObjects(keyboardKeys.RIGHT)}} img={"url('./button_images/align_right.png')"}/>
            </div>
            <div id="secondButtonRow" class=" w-full flex flex-row justify-around py-1">
                <Button editCanvas={()=>{alignObjects(keyboardKeys.UP)}} img={"url('./button_images/align_up.png')"}/>
                <Button editCanvas={()=>{alignObjects(keyboardKeys.DOWN)}} img={"url('./button_images/align_down.png')"}/>
            </div>
        </div>
        <div id="move" class="py-6 w-full">
            <div id="firstButtonRow" class=" w-full flex flex-row justify-around py-1">
                <Button editCanvas={()=>{moveObject(keyboardKeys.LEFT)}} img={"url('./button_images/left.png')"}/>
                <Button editCanvas={()=>{moveObject(keyboardKeys.RIGHT)}} img={"url('./button_images/right.png')"}/>
            </div>
            <div id="secondButtonRow" class=" w-full flex flex-row justify-around py-1">
                <Button editCanvas={()=>{moveObject(keyboardKeys.UP)}} img={"url('./button_images/up.png')"}/>
                <Button editCanvas={()=>{moveObject(keyboardKeys.DOWN)}} img={"url('./button_images/down.png')"}/>
            </div>
        </div>

    	<TextOptions/>

    	<ProgressOptions/>

    </div>

    {/if}