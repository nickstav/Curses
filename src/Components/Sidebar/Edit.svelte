<script>
    import SidebarButton from './SidebarButton.svelte';
    import DropDown from './DropDown.svelte';
    import AlignSVG from './AlignSVG.svelte';
    import ArrowSVG from './ArrowSVG.svelte';

    import { projectStore } from '../../JS/stores/project.js';
    import { tools } from '../../JS/constants/toolsList.js';
    import { keyboardKeys } from '../../JS/constants/keyboardKeys.js';
    import { duplicateObject } from '../../JS/draw/duplicate.js';
    import { alignObjects } from '../../JS/draw/offset.js';
    import { eraseObject } from '../../JS/draw/erase.js';
    import { moveObject } from '../../JS/draw/move.js';
</script>

<div id="editSection" class="w-full flex flex-col border-t border-b border-black px-3 py-3">

    <div id="header" class="w-full flex flex-row">
        <h1 on:click={()=>{projectStore.toggleEditMenu()}} class="w-full text-left font-semibold cursor-pointer select-none">EDIT</h1>
        <DropDown menuDisplayed={$projectStore.showEditOptions} toggleSubMenu={()=>{projectStore.toggleEditMenu()}}/>
    </div>

    {#if $projectStore.showEditOptions}
    <div id="copy/delete" class="w-full flex flex-col items-start border-b border-gray-300">
        <div id="firstButtonRow" class=" w-full flex flex-row justify-around pt-3 pb-3">
            <SidebarButton label={'duplicate (ctrl + c)'} editCanvas={duplicateObject}>
                <svg xmlns="http://www.w3.org/2000/svg" class="hover:text-header" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </SidebarButton>
            <SidebarButton label={'delete (del)'} editCanvas={eraseObject}>
                <svg xmlns="http://www.w3.org/2000/svg" class="hover:text-header" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </SidebarButton>
        </div>
    </div>

    <div id="alignSection" class="w-full py-3 flex flex-col items-start border-b border-gray-300">
        <div id="alignButtons" class="w-full py-2 flex flex-row justify-between">
            <SidebarButton label={'align left'} editCanvas={()=>{alignObjects(keyboardKeys.LEFT)}}>
                <AlignSVG degrees="0"/>
            </SidebarButton>
            <SidebarButton label={'align right'} editCanvas={()=>{alignObjects(keyboardKeys.RIGHT)}}>
                <AlignSVG degrees="180"/>
            </SidebarButton>
            <SidebarButton label={'align top'} editCanvas={()=>{alignObjects(keyboardKeys.UP)}}>
                <AlignSVG degrees="90"/>
            </SidebarButton>
            <SidebarButton label={'align bottom'} editCanvas={()=>{alignObjects(keyboardKeys.DOWN)}}>
                <AlignSVG degrees="270"/>
            </SidebarButton>
        </div>
    </div>

    <div id="moveButtons" class="w-full flex flex-col justify-center items-center border-b-1 border-gray-200 pt-3">
        <SidebarButton label={'move up'} editCanvas={()=>{moveObject(keyboardKeys.UP)}}>
            <ArrowSVG degrees="0"/>
        </SidebarButton>
        <div id="horizButtons" class=" w-full flex flex-row justify-around py-1">
            <SidebarButton label={'move left'} editCanvas={()=>{moveObject(keyboardKeys.LEFT)}}>
                <ArrowSVG degrees="270"/>
            </SidebarButton>
            <SidebarButton label={'move right'} editCanvas={()=>{moveObject(keyboardKeys.RIGHT)}}>
                <ArrowSVG degrees="90"/>
            </SidebarButton>
        </div>
        <SidebarButton editCanvas={()=>{moveObject(keyboardKeys.DOWN)}}>
            <ArrowSVG degrees="180"/>
        </SidebarButton>
    </div>
    {/if}

</div>