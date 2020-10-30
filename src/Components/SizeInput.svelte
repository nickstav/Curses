<script>
    import { cursesCanvas } from '../JS/stores/project.js';
      import { updateCanvas } from '../JS/draw/updateCanvas.js';
</script>

<form>
    <label for="width" class="text-xs">Canvas Width:</label>
    <input 
        type="text" 
        id="width" 
        size="4" 
        maxlength="4" 
        class="text-xs" 
        bind:value={$cursesCanvas.canvasWidth}
        on:input={updateCanvas}
    >
    <label for="height" class="text-xs">Canvas Height:</label>
    <input 
        type="text" 
        id="height" 
        size="4" 
        maxlength="4" 
        class="text-xs" 
        bind:value={$cursesCanvas.canvasHeight}
        on:input={updateCanvas}
    >
</form>