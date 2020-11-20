<script>
    import { saveCanvas } from '../JS/export.js';
</script>

<div style="--imgSource: url('./button_images/export.png')" class="px-6">
    <button
        class="h-8 w-8 bg-cover text-xs border border-black hover:bg-gray-400 font-bold py-1 px-3 active:border-dashed"
        style="background-image: var(--imgSource)"
        on:click={saveCanvas}
        >
    </button>
</div>