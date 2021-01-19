<script>
    import { cursesCanvas } from '../../JS/stores/project.js';
    export let img, label, editCanvas;

</script>

<button
    id="sidebarButton"
    title={label}
    class="h-6 w-6 bg-cover text-xs opacity-80 hover:opacity-100 rounded-md"
    style="outline: none"
    on:click={editCanvas} 
    >
        <img src={img}>
</button>
