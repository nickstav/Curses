<script>
    import SizeParagraph from './SizeParagraph.svelte';

    import { onMount } from 'svelte';
    import { cursesCanvas } from '../JS/stores/project.js';
    import { gridAxis } from '../JS/stores/grid.js';
    import { gridDimension } from '../JS/constants/canvasSize.js';

    import { handleMouseClick, handleMouseMove, handleMouseDown, handleMouseRelease, handleMouseOut, handleMouseEnter, handleKeyDown } from '../JS/draw/eventHandling.js';
  
    let canvas;
    onMount(()=> cursesCanvas.createCanvas(canvas));

    let gridImage;
    $: if ($cursesCanvas.appearance === 'light') {
        gridImage = 'url(./images/greySquare.png)';
    } else {
        gridImage = 'url(./images/blackSquare.png)';
    }
    
</script>

<svelte:window on:keydown={handleKeyDown}/>

<div id="canvasHolder" class="w-full h-full flex flex-col justify-center items-center flex-1 overflow-auto" style="--canvasW: {$gridAxis.x}px;--canvasH: {$gridAxis.y}px; --squareW: {gridDimension.x}px; --squareH: {gridDimension.y}px; --grid: {gridImage}">

    <SizeParagraph/>

    <div id="canvasBackground" style="width: var(--canvasW); height: var(--canvasH); background-image: var(--grid); background-size: var(--squareW) var(--squareH);" class="rounded-sm">
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
        on:mouseenter={handleMouseEnter}
        >
    </canvas>
    </div>
</div>
