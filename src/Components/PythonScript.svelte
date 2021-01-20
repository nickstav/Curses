<script>
    import Prism from "./PrismJS.svelte";

    import { clickOutside } from '../JS/eventListeners/clickOutside.js';
    import { cursesCanvas } from '../JS/stores/project.js';
    import { hideScript } from '../JS/python/minimise.js';
    import { downloadPyFile } from '../JS/python/download.js';
    import { copyTextToClipboard } from '../JS/python/copyText.js';
</script>

<div id="overlay" class="w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 flex items-center justify-center align-center">

    <div 
    id="window" 
    class="flex flex-col items-center h-3/4 w-3/4 rounded-md text-left font-mono text-sm bg-theme-secondary border border-theme-secondary-dark pt-4 px-4" 
    use:clickOutside on:click_outside={hideScript}
    >
        <div id="codeHolder" class="w-full flex-1 overflow-auto p-0 m-0">
            <Prism language="python" code="{$cursesCanvas.pythonScript}"/>
        </div>
        <div id="buttonsHolder" class="py-2">
            <button 
            id="download" 
            on:click={downloadPyFile}
            class="h-8 text-xs bg-white hover:bg-transparent text-black font-semibold hover:text-black border-black border 2 p-2"
            >
                Download File
            </button>

            <button 
            id="copy" 
            on:click={copyTextToClipboard}
            class="h-8 text-xs bg-white hover:bg-transparent text-black font-semibold hover:text-black border-black border 2 p-2"
            >
                Copy Text
            </button>
        </div>
        
    </div>
</div>