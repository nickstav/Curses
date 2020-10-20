<script>
    import { onMount } from 'svelte';
    import { cursesCanvas } from '../JS/store.js';
    import { handleMouseMove, handleMouseDown, handleMouseRelease } from '../JS/eventHandling.js'
    
    let canvas;
    onMount(()=> cursesCanvas.createCanvas(canvas));

</script>

<div id="canvasHolder" class="w-full flex-1 flex items-center justify-center" style="--canvasW: {$cursesCanvas.canvasWidth}px;--canvasH: {$cursesCanvas.canvasHeight}px">
    <div id="canvasBackground" style="width: var(--canvasW); height: var(--canvasH); background-image: url('./grid.png')">
        <canvas 
        bind:this={canvas}
        id="cursesCanvas" 
        width={$cursesCanvas.canvasWidth}
        height={$cursesCanvas.canvasHeight}
        on:mousemove={handleMouseMove}
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseRelease}
        >
    </canvas>
    </div>
</div>
