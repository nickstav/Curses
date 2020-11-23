<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { hideScript } from '../JS/python/minimise.js';
    import { downloadPyFile } from '../JS/python/download.js';
</script>

<div id="overlay" class="w-full h-full fixed top-0 left-0 flex items-center justify-center align-center">
    <div 
    id="closeOverlay" 
    class="absolute text-2xl cursor-pointer font-bold" 
    style="top:50px; right:100px"
    on:click={hideScript}
    >
        X
    </div>
    <div 
    id="textHolder" 
    class="flex flex-col items-center h-3/4 w-3/4 text-left font-mono text-sm bg-gray-600 pt-4 px-4" 
    style="height: 75%"
    >
        <div id="codeHolder" class="w-full flex-1 bg-black overflow-scroll">
            <pre><code class="language-python">{$cursesCanvas.pythonScript}</code></pre>
        </div>
        <button 
        id="download" 
        on:click={downloadPyFile}
        class="h-10 text-xs bg-white hover:bg-transparent text-black font-semibold hover:text-black border-black border 2 p-2"
        >
            Download File
        </button>
    </div>
</div>