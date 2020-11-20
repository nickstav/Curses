<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    '<div id="closeOverlay" class="absolute top-5 left-5 font-xs cursor-pointer">X</div>'
    ''
</script>

<div id="overlay" class="w-full h-full fixed top-0 left-0 flex items-center justify-center align-center">
    <div id="textHolder" class="w-3/4 h-3/4 text-left font-mono text-sm bg-gray-600">
        <textarea class="w-full h-full px-4 py-4 bg-gray-200">
            {$cursesCanvas.pythonScript}
        </textarea>
    </div>
</div>