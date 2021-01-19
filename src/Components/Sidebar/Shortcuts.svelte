<script>
    import DropDown from './DropDown.svelte';
    import { keyboardKeys } from '../../JS/constants/keyboardKeys.js'; 
    import { cursesCanvas } from '../../JS/stores/project.js';

    let keyHeld;
    $: if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        keyHeld = 'cmd';
    } else {
        keyHeld = 'ctrl';
    }
</script>

<div 
id="shortcutsSection" 
class="w-full flex flex-col border-t-1 border-black px-3 py-3"
>

    <div id="header" class="w-full flex flex-row pb-1">
        <h1 class="w-full text-left font-semibold">KEYBOARD SHORTCUTS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showShortcuts} toggleSubMenu={()=>{cursesCanvas.toggleShortcutMenu()}}/>
    </div>

    {#if $cursesCanvas.showShortcuts}

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
        <div id="keyList" class="flex flex-1 flex-col pl-1 text-xs text-left">
            <ul>
                <li class="flex items-start pb-1.5"><strong>{keyboardKeys.DELETE}</strong></li>
                <li class="flex items-start pb-1.5"><strong>{keyboardKeys.T}</strong></li>
                <li class="flex items-start pb-1.5"><strong>{keyboardKeys.L}</strong></li>
                <li class="flex items-start pb-1.5"><strong>{keyboardKeys.R}</strong></li>
                <li class="flex items-start pb-1.5"><strong>{keyboardKeys.P}</strong></li>
                <li class="flex items-start pb-1.5"><strong>{keyboardKeys.V}</strong></li>
                <li class="flex items-start pb-1.5"><strong>hold shift</strong></li>
                <li class="flex items-start pb-1.5"><strong>{keyHeld} + {keyboardKeys.C}</strong></li>
                <li class="flex items-start pb-1.5"><strong>🡑,🡒,🡓,🡐</strong></li>
                <li class="flex items-start pb-1.5"><strong>{keyHeld} + 🡑,🡒,🡓,🡐</strong></li>
            </ul>
        </div>
    </div>
    
    {/if}

</div>
