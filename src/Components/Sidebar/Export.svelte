<script>
        import { showScript } from '../../JS/python/export.js';
        import { downloadPyFile } from '../../JS/python/download.js';
        import { copyTextToClipboard } from '../../JS/python/copyText.js';
</script>

<div id="buttonsHolder" class="h-full flex flex-col justify-center">

    <button 
    id="download" 
    on:click={showScript}
    class=" my-6 h-8 text-xs bg-white hover:bg-transparent text-black font-semibold hover:text-black border-black border 2 p-2"
    >
        preview python script
    </button>

    <button 
    id="download" 
    on:click={downloadPyFile}
    class="my-6 h-8 text-xs bg-white hover:bg-transparent text-black font-semibold hover:text-black border-black border 2 p-2"
    >
        download .py file
    </button>

    <button 
    id="copy" 
    on:click={copyTextToClipboard}
    class="my-6 h-8 text-xs bg-white hover:bg-transparent text-black font-semibold hover:text-black border-black border 2 p-2"
    >
        copy script to clipboard
    </button>
</div>