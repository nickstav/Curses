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
        <h1 on:click={()=>{cursesCanvas.toggleEditMenu()}} class="w-full text-left font-semibold cursor-pointer select-none">EDIT</h1>
        <DropDown menuDisplayed={$cursesCanvas.showEditOptions} toggleSubMenu={()=>{cursesCanvas.toggleEditMenu()}}/>
    </div>

    {#if $cursesCanvas.showEditOptions}
    <div id="copy/delete" class="w-full flex flex-col items-start border-b border-gray-200">
        <div id="firstButtonRow" class=" w-full flex flex-row justify-around pt-3 pb-3">
            <SidebarButton label={'duplicate (ctrl + c)'} editCanvas={duplicateObject}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </SidebarButton>
            <SidebarButton label={'delete (del)'} editCanvas={eraseObject}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </SidebarButton>
        </div>
    </div>

    <div id="alignSection" class="w-full py-3 flex flex-col items-start border-b border-gray-200">
        <div id="alignButtons" class="w-full py-2 flex flex-row justify-between">
            <SidebarButton label={'align left'} editCanvas={()=>{alignObjects(keyboardKeys.LEFT)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-align-start" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/>
                    <path d="M3 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"/>
                </svg>
            </SidebarButton>
            <SidebarButton label={'align right'} editCanvas={()=>{alignObjects(keyboardKeys.RIGHT)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-align-end" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/>
                    <path d="M13 7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/>
                </svg>
            </SidebarButton>
            <SidebarButton label={'align top'} editCanvas={()=>{alignObjects(keyboardKeys.UP)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-align-top" viewBox="0 0 16 16">
                    <rect width="4" height="12" rx="1" transform="matrix(1 0 0 -1 6 15)"/>
                    <path d="M1.5 2a.5.5 0 0 1 0-1v1zm13-1a.5.5 0 0 1 0 1V1zm-13 0h13v1h-13V1z"/>
                </svg>
            </SidebarButton>
            <SidebarButton label={'align bottom'} editCanvas={()=>{alignObjects(keyboardKeys.DOWN)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-align-bottom" viewBox="0 0 16 16">
                    <rect width="4" height="12" x="6" y="1" rx="1"/>
                    <path d="M1.5 14a.5.5 0 0 0 0 1v-1zm13 1a.5.5 0 0 0 0-1v1zm-13 0h13v-1h-13v1z"/>
                </svg>
            </SidebarButton>
        </div>
    </div>

    <div id="moveButtons" class="w-full flex flex-col justify-center items-center border-b-1 border-gray-200 pt-3">
        <SidebarButton label={'move up'} editCanvas={()=>{moveObject(keyboardKeys.UP)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </SidebarButton>
        <div id="horizButtons" class=" w-full flex flex-row justify-around py-1">
            <SidebarButton label={'move left'} editCanvas={()=>{moveObject(keyboardKeys.LEFT)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </SidebarButton>
            <SidebarButton label={'move right'} editCanvas={()=>{moveObject(keyboardKeys.RIGHT)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </SidebarButton>
        </div>
        <SidebarButton editCanvas={()=>{moveObject(keyboardKeys.DOWN)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </SidebarButton>
    </div>
    {/if}

</div>