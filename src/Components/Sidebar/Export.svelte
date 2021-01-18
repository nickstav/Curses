<script>
        import { showScript } from '../../JS/python/export.js';
        import { downloadPyFile } from '../../JS/python/download.js';
        import { copyTextToClipboard } from '../../JS/python/copyText.js';
</script>

<div id="buttonsHolder" class="h-full flex flex-col justify-start">

    <button 
    id="download" 
    on:click={showScript}
    class="my-6 h-8 w-40 text-xs font-semibold border border-gray-600 rounded-md mx-2 hover:bg-gray-400"
    >
        preview python script
    </button>

    <button 
    id="download" 
    on:click={downloadPyFile}
    class="my-6 h-8 w-40 text-xs font-semibold border border-gray-600 rounded-md mx-2 hover:bg-gray-400"
    >
        download .py file
    </button>

    <button 
    id="copy" 
    on:click={copyTextToClipboard}
    class="my-6 h-8 w-40 text-xs font-semibold border border-gray-600 rounded-md mx-2 hover:bg-gray-400"
    >
        copy script to clipboard
    </button>
</div>