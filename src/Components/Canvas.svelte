<script>
    import { onMount } from 'svelte';
    import { cursesCanvas } from '../JS/store.js';
    import { handleMouseClick, handleMouseMove, handleMouseDown, handleMouseRelease } from '../JS/eventHandling.js';
    import { gridAxis } from '../JS/grid.js';
    
    let canvas;
    onMount(()=> cursesCanvas.createCanvas(canvas));

</script>

<div id="canvasHolder" class="w-full flex-1 flex items-center justify-center" style="--canvasW: {$gridAxis.x}px;--canvasH: {$gridAxis.y}px; --squareW: {$cursesCanvas.gridDimension.x}px; --squareH: {$cursesCanvas.gridDimension.y}px">
    <div id="canvasBackground" style="width: var(--canvasW); height: var(--canvasH); background-image: url(./grid_square.png); background-size: var(--squareW) var(--squareH);">
        <canvas 
        bind:this={canvas}
        id="cursesCanvas" 
        width={$gridAxis.x}
        height={$gridAxis.y}
        on:click={handleMouseClick}
        on:mousemove={handleMouseMove}
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseRelease}
        >
    </canvas>
    </div>
</div>
