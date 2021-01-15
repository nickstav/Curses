<script>
    export let img, label, editCanvas;
</script>

<div style="--imgSource: {img}" class="flex flex-col items-center">
    <button
        class="h-6 w-6 bg-cover text-xs hover:bg-gray-400 font-bold py-1 px-3 active:border-dashed"
        style="background-image: var(--imgSource)"
        on:click={editCanvas} 
        >
    </button>
    <label class="text-xs">{label}</label>
</div>