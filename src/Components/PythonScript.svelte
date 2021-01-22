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
    class="flex flex-col items-center w-3/4 h-5/6 rounded-md text-left font-mono text-sm bg-sidebar border border-sidebar-border" 
    use:clickOutside on:click_outside={hideScript}
    >

        <div id="previewHeader" class="bg-header w-full h-12 text-gray700 flex justify-between items-center border-b border-header-border">
            <h1 class="text-2xl text-header-font  tracking-widest ml-4">ORISON</h1>
        </div>    

        <div id="codeHolder" class="w-full flex-1 overflow-auto p-2">
            <Prism language="python" code="{$cursesCanvas.pythonScript}"/>
        </div>

        <div id="buttonsHolder" class="w-1/2 h-10 flex flex-row justify-around mb-1">
            <button 
            id="download" 
            on:click={downloadPyFile}
            class="flex justify-center items-center h-12 w-12 p-2 hover:text-header"
            style="outline: none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </button>

            <button 
            id="copy" 
            on:click={copyTextToClipboard}
            class="flex justify-center items-center h-12 w-12 p-2 hover:text-header"
            style="outline: none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
            </button>
        </div>
        
    </div>
</div>