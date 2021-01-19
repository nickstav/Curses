<script>
    import SidebarButton from './SidebarButton.svelte';
    import DropDown from './DropDown.svelte';

    import { cursesCanvas } from '../../JS/stores/project.js';
    import { tools } from '../../JS/constants/toolsList.js';
    import { keyboardKeys } from '../../JS/constants/keyboardKeys.js';
    import { duplicateObject } from '../../JS/draw/duplicate.js';
    import { alignObjects } from '../../JS/draw/offset.js';
    import { eraseObject } from '../../JS/draw/erase.js';
    import { moveObject } from '../../JS/draw/move.js';
</script>

<div id="editSection" class="w-full flex flex-col border-t border-b border-black px-3 py-3">

    <div id="header" class="w-full flex flex-row">
        <h1 class="w-full text-left font-semibold">EDIT</h1>
        <DropDown menuDisplayed={$cursesCanvas.showEditOptions} toggleSubMenu={()=>{cursesCanvas.toggleEditMenu()}}/>
    </div>

    {#if $cursesCanvas.showEditOptions}
    <div id="copy/delete" class="w-full flex flex-col items-start border-b border-gray-200">
        <div id="firstButtonRow" class=" w-full flex flex-row justify-around pt-3 pb-3">
            <SidebarButton label={'duplicate (ctrl + c)'} editCanvas={duplicateObject} img={"url('./button_images/duplicate.png')"}/>
            <SidebarButton label={'delete (del)'} editCanvas={eraseObject} img={"url('./button_images/delete.png')"}/>
        </div>
    </div>

    <div id="alignSection" class="w-full py-3 flex flex-col items-start border-b border-gray-200">
        <div id="alignButtons" class="w-full py-2 flex flex-row justify-between">
            <SidebarButton label={'align left'} editCanvas={()=>{alignObjects(keyboardKeys.LEFT)}} img={"url('./button_images/align_left.png')"}/>
            <SidebarButton label={'align right'} editCanvas={()=>{alignObjects(keyboardKeys.RIGHT)}} img={"url('./button_images/align_right.png')"}/>
            <SidebarButton label={'align top'} editCanvas={()=>{alignObjects(keyboardKeys.UP)}} img={"url('./button_images/align_up.png')"}/>
            <SidebarButton label={'align bottom'} editCanvas={()=>{alignObjects(keyboardKeys.DOWN)}} img={"url('./button_images/align_down.png')"}/>
        </div>
    </div>

    <div id="moveButtons" class="w-full flex flex-col justify-center border-b-1 border-gray-200 pt-3">
        <SidebarButton label={'move up'} editCanvas={()=>{moveObject(keyboardKeys.UP)}} img={"url('./button_images/up.png')"}/>
        <div id="horizButtons" class=" w-full flex flex-row justify-around py-1">
            <SidebarButton label={'move left'} editCanvas={()=>{moveObject(keyboardKeys.LEFT)}} img={"url('./button_images/left.png')"}/>
            <SidebarButton label={'move right'} editCanvas={()=>{moveObject(keyboardKeys.RIGHT)}} img={"url('./button_images/right.png')"}/>
        </div>
        <SidebarButton label={'move down'} editCanvas={()=>{moveObject(keyboardKeys.DOWN)}} img={"url('./button_images/down.png')"}/>
    </div>
    {/if}

</div>
