<script>
      import { cursesCanvas } from '../JS/stores/store.js'; 
</script>

<form>
    <label for="width" class="text-xs">Canvas Width:</label>
    <input type="text" id="width" size="4" maxlength="4" class="text-xs" bind:value={$cursesCanvas.canvasWidth}>
    <label for="height" class="text-xs">Canvas Height:</label>
    <input type="text" id="height" size="4" maxlength="4" class="text-xs" bind:value={$cursesCanvas.canvasHeight}>
</form>