<script>
    import { cursesCanvas } from '../../JS/stores/project.js';
    export let img, label, editCanvas;

</script>

<div style="--imgSource: {img}" class="flex flex-col items-center">
    <button
        id="sidebarButton"
        title={label}
        class="h-6 w-6 bg-cover text-xs py-1 px-3 opacity-80 hover:opacity-100 rounded-md"
        style="background-image: var(--imgSource); outline: none"
        on:click={editCanvas} 
        >
    </button>
    <label class="text-xs"></label>
</div>