<script>
    import TextOptions from './TextOptions.svelte';
    import ProgressOptions from './ProgressOptions.svelte';
    import SelectOptions from './SelectOptions.svelte';
    import Shortcuts from './Shortcuts.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>

<div id="selectOptions" class="bg-gray-400 w-20 h-full text-xs flex flex-col justify-center items-center">
    {#if $cursesCanvas.tool === tools.TEXT}
        <TextOptions/>
    {:else if $cursesCanvas.tool === tools.PROGRESS}
        <ProgressOptions/>
    {:else if $cursesCanvas.tool === tools.DRAG}
        <SelectOptions/>
    {/if}
</div>