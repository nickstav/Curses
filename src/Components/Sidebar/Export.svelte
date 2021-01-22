<script>
        import { showScript } from '../../JS/python/export.js';
        import { downloadPyFile } from '../../JS/python/download.js';
        import { copyTextToClipboard } from '../../JS/python/copyText.js';
</script>

<div id="buttonsHolder" class="h-full flex flex-col justify-start items-left px-3 py-3">

    <div id="preview" class="flex flex-row justify-start align-middle border-b border-gray-500 hover:text-header">
        <button 
        id="preview" 
        on:click={showScript}
        class="flex justify-center items-center my-6 h-10 w-10 p-1"
        style="outline: none"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        <label for="download" on:click={showScript} class="flex flex-1 text-xs font-semibold items-center cursor-pointer">preview Python script</label>
    </div>
    
    <div id="download" class="flex flex-row justify-start align-middle border-b border-gray-500 hover:text-header">
        <button 
        id="download" 
        on:click={downloadPyFile}
        class="flex justify-center items-center my-6 h-10 w-10 p-1"
        style="outline: none"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
        </button>
        <label for="download" on:click={downloadPyFile} class="flex flex-1 text-xs font-semibold items-center cursor-pointer">download .py file</label>
    </div>
    
    <div id="copy" class="flex flex-row justify-start align-middle hover:text-header">
        <button 
        id="copy" 
        on:click={copyTextToClipboard}
        class="flex justify-center items-center my-6 h-10 w-10 p-1 hover:bg-gray-400"
        style="outline: none"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
        </button>
        <label for="download" on:click={copyTextToClipboard} class="flex flex-1 text-xs font-semibold items-center cursor-pointer">copy Python script</label>
    </div>
    
</div>