<script>
    import TextOptions from './TextOptions.svelte';
    import ProgressOptions from './ProgressOptions.svelte';
    import SelectOptions from './SelectOptions.svelte';

    import { cursesCanvas } from '../JS/stores/project.js';
    import { tools } from '../JS/constants/toolsList.js';
</script>

{#if $cursesCanvas.tool === tools.TEXT}
    <TextOptions/>
{:else if $cursesCanvas.tool === tools.PROGRESS}
    <ProgressOptions/>
{:else if $cursesCanvas.tool === tools.DRAG}
    <SelectOptions/>
{/if}