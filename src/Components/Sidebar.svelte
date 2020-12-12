<script>
    import SelectOptions from './SelectOptions.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>



{#if $cursesCanvas.tool === tools.DRAG}
    <div id="sidebar" class="bg-gray-200 w-20 h-full text-xs flex flex-col justify-center items-center">
        <SelectOptions/>
    </div>
{/if}