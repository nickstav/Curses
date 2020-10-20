<script>
    import { onMount } from 'svelte';
    import { cursesCanvas } from '../JS/store.js';
    import { handleMouseMove, handleMouseDown, handleMouseRelease } from '../JS/eventHandling.js'
    
    let canvas;
    onMount(()=> cursesCanvas.createCanvas(canvas));

</script>

<div id="canvasHolder" class="w-full flex-1" style="background-image: url('./grid.png')">
    <canvas 
        bind:this={canvas}
        id="cursesCanvas" 
        width="full"
        height="full"
        on:mousemove={handleMouseMove}
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseRelease}
        >
    </canvas>
</div>
