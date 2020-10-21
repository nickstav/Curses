<script>
    import { onMount } from 'svelte';
    import { cursesCanvas } from '../JS/store.js';
    import { handleMouseMove, handleMouseDown, handleMouseRelease } from '../JS/eventHandling.js'
    
    let canvas;
    onMount(()=> cursesCanvas.createCanvas(canvas));

</script>

<div id="canvasHolder" class="w-full flex-1 flex items-center justify-center" style="--canvasW: {$cursesCanvas.canvasWidth*11}px;--canvasH: {$cursesCanvas.canvasHeight*24}px">
    <div id="canvasBackground" style="width: var(--canvasW); height: var(--canvasH); background-image: url(./grid_square.png); background-size: 11px 24px;">
        <canvas 
        bind:this={canvas}
        id="cursesCanvas" 
        width={$cursesCanvas.canvasWidth*11}
        height={$cursesCanvas.canvasHeight*24}
        on:mousemove={handleMouseMove}
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseRelease}
        >
    </canvas>
    </div>
</div>
