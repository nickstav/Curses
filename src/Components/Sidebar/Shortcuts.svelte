<script>
    import DropDown from './DropDown.svelte';
    import { keyboardKeys } from '../../JS/constants/keyboardKeys.js'; 
    import { projectStore } from '../../JS/stores/project.js';

    let keyHeld;
    $: if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        keyHeld = 'cmd';
    } else {
        keyHeld = 'ctrl';
    }
</script>

<div 
id="shortcutsSection" 
class="w-full flex flex-col border-t-1 border-black px-3 py-3 select-none font-semibold text-gray-700"
>

    <div id="header" class="w-full flex flex-row pb-1">
        <h1 on:click={()=>{projectStore.toggleShortcutMenu()}} class="w-full text-left font-semibold cursor-pointer select-none">KEYBOARD SHORTCUTS</h1>
        <DropDown menuDisplayed={$projectStore.showShortcuts} toggleSubMenu={()=>{projectStore.toggleShortcutMenu()}}/>
    </div>

    {#if $projectStore.showShortcuts}

    <div id="shortcuts" class="flex flex-row py-1">
        <div id="toolList" class="flex flex-col items-start w-18">
            <ul>
                <li class="flex items-start pb-1.5">erase</li>
                <li class="flex items-start pb-1.5">text tool</li>
                <li class="flex items-start pb-1.5">line tool</li>
                <li class="flex items-start pb-1.5">rectangle tool</li>
                <li class="flex items-start pb-1.5">progress bar tool</li>
                <li class="flex items-start pb-1.5">select tool</li>
                <li class="flex items-start pb-1.5">select multiple</li>
                <li class="flex items-start pb-1.5">duplicate</li>
                <li class="flex items-start pb-1.5">move</li>
                <li class="flex items-start pb-1.5">align objects</li>
            </ul>
        </div>
        <div id="keyList" class="flex flex-1 flex-col pr-1 text-xs">
            <ul>
                <li class="flex justify-end pb-1.5"><strong>{keyboardKeys.DELETE}</strong></li>
                <li class="flex justify-end pb-1.5"><strong>{keyboardKeys.T}</strong></li>
                <li class="flex justify-end pb-1.5"><strong>{keyboardKeys.L}</strong></li>
                <li class="flex justify-end pb-1.5"><strong>{keyboardKeys.R}</strong></li>
                <li class="flex justify-end pb-1.5"><strong>{keyboardKeys.P}</strong></li>
                <li class="flex justify-end pb-1.5"><strong>{keyboardKeys.V}</strong></li>
                <li class="flex justify-end pb-1.5"><strong>hold shift</strong></li>
                <li class="flex justify-end pb-1.5"><strong>{keyHeld} + {keyboardKeys.C}</strong></li>
                <li class="flex justify-end pb-1.5"><strong>arrow keys</strong></li>
                <li class="flex justify-end text-right pb-1.5"><strong>{keyHeld} + arrow keys</strong></li>
            </ul>
        </div>
    </div>
    
    {/if}

</div>
