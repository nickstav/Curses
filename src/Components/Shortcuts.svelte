<script>
    import { keyboardKeys } from '../JS/constants/keyboardKeys.js'; 
    import { cursesCanvas } from '../JS/stores/project.js';

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

<div class="absolute left-4 top-10 w-1/2 text-left">
    <button 
    class="text-xs text-blue-500 underline border-none bg-none cursor-pointer"
    on:click={()=>{cursesCanvas.toggleShortcutMenu()}}
    >
        {instruction} Keyboard Shortcuts
    </button>
</div>

{#if $cursesCanvas.showShortcuts}
<div id="shortcuts" class="absolute left-4 top-20 w-25 bg-gray-200 text-xs text-left border border-black px-1 py-2">
    <ul>
        <li>Erase: <strong>{keyboardKeys.DELETE}</strong></li>
        <li>Text tool: <strong>{keyboardKeys.T}</strong></li>
        <li>Line tool: <strong>{keyboardKeys.L}</strong></li>
        <li>Rectangle tool: <strong>{keyboardKeys.R}</strong></li>
        <li>Progress bar tool: <strong>{keyboardKeys.P}</strong></li>
        <li>Select tool: <strong>{keyboardKeys.V}</strong></li>
        <li>Duplicate: <strong>{keyHeld} + {keyboardKeys.C}</strong></li>
        <li>Move: <strong>arrow keys</strong></li>
        <li>Align: <strong>{keyHeld} + arrow keys</strong></li>
      </ul>
</div>
{/if}
