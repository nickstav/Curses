<script>
    import DropDown from '../DropDown.svelte';

    import { keyboardKeys } from '../../JS/constants/keyboardKeys.js'; 
    import { cursesCanvas } from '../../JS/stores/project.js';

    let instruction;
    $: if ($cursesCanvas.showShortcuts) {
        instruction = 'Hide';
    } else {
        instruction = 'Show';
    }

    let keyHeld;
    $: if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        keyHeld = 'cmd';
    } else {
        keyHeld = 'ctrl';
    }
</script>

<div id="shortcutsSection" class="w-full flex flex-col border-t border-b border-black overflow-auto">

    <div id="header" class="w-full flex flex-row pb-1">
        <h1 class="w-full text-left pl-1 font-semibold">KEYBOARD SHORTCUTS</h1>
        <DropDown menuDisplayed={$cursesCanvas.showShortcuts} toggleSubMenu={()=>{cursesCanvas.toggleShortcutMenu()}}/>
    </div>

    {#if $cursesCanvas.showShortcuts}
    <div id="shortcuts" class="flex flex-col py-1">
        <ul>
            <li class="flex items-start pl-1">erase: <strong>{keyboardKeys.DELETE}</strong></li>
            <li class="flex items-start pl-1">text tool: <strong>{keyboardKeys.T}</strong></li>
            <li class="flex items-start pl-1">line tool: <strong>{keyboardKeys.L}</strong></li>
            <li class="flex items-start pl-1">rectangle tool: <strong>{keyboardKeys.R}</strong></li>
            <li class="flex items-start pl-1">progress bar tool: <strong>{keyboardKeys.P}</strong></li>
            <li class="flex items-start pl-1">select tool: <strong>{keyboardKeys.V}</strong></li>
            <li class="flex items-start pl-1">sel. multiple: <strong>hold shift</strong></li>
            <li class="flex items-start pl-1">duplicate: <strong>{keyHeld} + {keyboardKeys.C}</strong></li>
            <li class="flex items-start pl-1">move: <strong>arrow keys</strong></li>
            <li class="flex items-start pl-1">align: <strong>{keyHeld} + arrow keys</strong></li>
        </ul>
    </div>
    {/if}
</div>
