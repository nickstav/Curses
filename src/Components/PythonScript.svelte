<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    '<div id="closeOverlay" class="absolute top-5 left-5 font-xs cursor-pointer">X</div>'
    ''
</script>

<div id="overlay" class="w-full h-full fixed top-0 left-0 flex items-center justify-center align-center">
    <div id="textHolder" class="h-3/4 w-3/4 text-left font-mono text-sm bg-gray-600 p-4" style="height: 75%">
        <textarea class="w-full h-full bg-gray-200">
            {$cursesCanvas.pythonScript}
        </textarea>
    </div>
</div>