<script>
    import TextOptions from './TextOptions.svelte';
    import ProgressOptions from './ProgressOptions.svelte';
    import SelectOptions from './SelectOptions.svelte';
    import Shortcuts from './Shortcuts.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>


{#if $cursesCanvas.tool === tools.TEXT}
    <div id="sidebar" class="bg-gray-200 w-20 h-full text-xs flex flex-col justify-center items-center">
        <TextOptions/>
    </div>
{:else if $cursesCanvas.tool === tools.PROGRESS}
    <div id="sidebar" class="bg-gray-200 w-20 h-full text-xs flex flex-col justify-center items-center">
        <ProgressOptions/>
    </div>
{:else if $cursesCanvas.tool === tools.DRAG}
    <div id="sidebar" class="bg-gray-200 w-20 h-full text-xs flex flex-col justify-center items-center">
        <SelectOptions/>
    </div>
{/if}