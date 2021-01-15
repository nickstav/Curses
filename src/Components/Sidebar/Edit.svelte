<script>
    import Button from '../Button.svelte';
    import DropDown from '../DropDown.svelte';

    import { cursesCanvas } from '../../JS/stores/project.js';
    import { tools } from '../../JS/constants/toolsList.js';
    import { keyboardKeys } from '../../JS/constants/keyboardKeys.js';
    import { duplicateObject } from '../../JS/draw/duplicate.js';
    import { alignObjects } from '../../JS/draw/offset.js';
    import { eraseObject } from '../../JS/draw/erase.js';
    import { moveObject } from '../../JS/draw/move.js';
</script>

<div id="editSection" class="w-full flex flex-col border-t border-b border-black">

    <div id="header" class="w-full flex flex-row pb-1">
        <h1 class="w-full text-left pl-1 font-semibold">EDIT</h1>
        <DropDown menuDisplayed={$cursesCanvas.showEditOptions} toggleSubMenu={()=>{cursesCanvas.toggleEditMenu()}}/>
    </div>

    {#if $cursesCanvas.showEditOptions}
    <div id="copy/delete" class="w-full flex flex-col items-start border-b border-gray-200">
        <div id="firstButtonRow" class=" w-full flex flex-row justify-around py-1">
            <Button label={'duplicate'} editCanvas={duplicateObject} img={"url('./button_images/duplicate.png')"}/>
            <Button label={'delete'} editCanvas={eraseObject} img={"url('./button_images/delete.png')"}/>
        </div>
    </div>

    <div id="alignSection" class="w-full py-1 flex flex-col items-start border-t border-b border-gray-200">
        <h2 class="text-xs font-semibold px-1">align</h2>
        <div id="alignButtons" class="w-full px-1 py-2 flex flex-row justify-between">
            <Button label={''} editCanvas={()=>{alignObjects(keyboardKeys.LEFT)}} img={"url('./button_images/align_left.png')"}/>
            <Button label={''} editCanvas={()=>{alignObjects(keyboardKeys.RIGHT)}} img={"url('./button_images/align_right.png')"}/>
            <Button label={''} editCanvas={()=>{alignObjects(keyboardKeys.UP)}} img={"url('./button_images/align_up.png')"}/>
            <Button label={''} editCanvas={()=>{alignObjects(keyboardKeys.DOWN)}} img={"url('./button_images/align_down.png')"}/>
        </div>
    </div>

    <div id="moveButtons" class="py-1 w-full flex flex-col justify-center border-t border-b border-gray-200">
        <h2 class="w-full text-left font-semibold px-1">move</h2>
        <Button label={''} editCanvas={()=>{moveObject(keyboardKeys.UP)}} img={"url('./button_images/up.png')"}/>
        <div id="horizButtons" class=" w-full flex flex-row justify-around py-1">
            <Button label={''} editCanvas={()=>{moveObject(keyboardKeys.LEFT)}} img={"url('./button_images/left.png')"}/>
            <Button label={''} editCanvas={()=>{moveObject(keyboardKeys.RIGHT)}} img={"url('./button_images/right.png')"}/>
        </div>
        <Button label={''} editCanvas={()=>{moveObject(keyboardKeys.DOWN)}} img={"url('./button_images/down.png')"}/>
    </div>
    {/if}

</div>
