<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { hideScript } from '../JS/python/minimise.js';
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
    <div id="textHolder" class="h-3/4 w-3/4 text-left font-mono text-sm bg-gray-600 p-4" style="height: 75%">
        <textarea class="w-full h-full bg-gray-200">
            {$cursesCanvas.pythonScript}
        </textarea>
    </div>
</div>