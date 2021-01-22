<script>
    import { cursesCanvas } from '../../JS/stores/project.js';
    export let label, editCanvas;

</script>

<button
    id="sidebarButton"
    aria-label="sidebar button"
    title={label}
    class="h-6 w-6 bg-cover text-xs opacity-80 hover:opacity-100 rounded-md"
    style="outline: none"
    on:click={editCanvas} 
    >
    <slot></slot>
</button>
