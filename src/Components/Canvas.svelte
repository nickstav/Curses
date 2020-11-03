<script>
    import { onMount } from 'svelte';
    import { cursesCanvas } from '../JS/stores/project.js';
    import { gridAxis } from '../JS/stores/grid.js';
    import { gridDimension } from '../JS/constants/canvasSize.js';

    import { handleMouseClick, handleMouseMove, handleMouseDown, handleMouseRelease, handleMouseOut, handleKeyDown } from '../JS/draw/eventHandling.js';
  
    let canvas;
    onMount(()=> cursesCanvas.createCanvas(canvas));
</script>

<svelte:window on:keydown={handleKeyDown}/>

<div id="canvasHolder" class="w-full flex justify-center items-center flex-1" style="--canvasW: {$gridAxis.x}px;--canvasH: {$gridAxis.y}px; --squareW: {gridDimension.x}px; --squareH: {gridDimension.y}px">
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
        on:mouseout={handleMouseOut}
        >
    </canvas>
    </div>
</div>
