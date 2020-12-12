<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { tools } from '../JS/constants/toolsList.js';
    import Button from './Button.svelte';
</script>


{#if $cursesCanvas.tool === tools.DRAG}
    <div id="sidebar" class="bg-gray-200 w-full h-full text-xs flex flex-col justify-start items-center m-1 border border-black">
        <div id="firstButtonRow" class=" w-full flex flex-row justify-around py-5">
            <Button editCanvas={()=>{console.log('duplicate!')}} img={"url('./button_images/duplicate.png')"}/>
            <Button editCanvas={()=>{console.log('delete!')}} img={"url('./button_images/delete.png')"}/>
        </div>
        <div id="alignOptions" class="py-6 w-full">
            <div id="firstButtonRow" class=" w-full flex flex-row justify-around py-2">
                <Button editCanvas={()=>{console.log('align left!')}} img={"url('./button_images/align_left.png')"}/>
                <Button editCanvas={()=>{console.log('align right!')}} img={"url('./button_images/align_right.png')"}/>
            </div>
            <div id="secondButtonRow" class=" w-full flex flex-row justify-around py-2">
                <Button editCanvas={()=>{console.log('align up!')}} img={"url('./button_images/align_up.png')"}/>
                <Button editCanvas={()=>{console.log('align down!')}} img={"url('./button_images/align_down.png')"}/>
            </div>
        </div>
        <div id="move" class="py-6 w-full">
            <div id="firstButtonRow" class=" w-full flex flex-row justify-around py-2">
                <Button editCanvas={()=>{console.log('move left!')}} img={"url('./button_images/left.png')"}/>
                <Button editCanvas={()=>{console.log('move right!')}} img={"url('./button_images/right.png')"}/>
            </div>
            <div id="secondButtonRow" class=" w-full flex flex-row justify-around py-2">
                <Button editCanvas={()=>{console.log('move up!')}} img={"url('./button_images/up.png')"}/>
                <Button editCanvas={()=>{console.log('move down!')}} img={"url('./button_images/down.png')"}/>
            </div>
        </div>
    </div>
{/if}