<script>
    import Button from '../Button.svelte';
    import SidebarButtons from './SidebarButtons.svelte';
    import Edit from './Edit.svelte';
    import Export from './Export.svelte'
    import TextOptions from './TextOptions.svelte';
    import ProgressOptions from './ProgressOptions.svelte';
    import CanvasProperties from './CanvasProperties.svelte';
    import Shortcuts from './Shortcuts.svelte';

    import { cursesCanvas } from '../../JS/stores/project.js';
    import { updateCanvas } from '../../JS/draw/updateCanvas.js';

</script>


<aside
class="bg-gray-300 w-48 h-full text-xs flex flex-col justify-start items-center border-l-1 border-gray-500 overflow-hidden"
on:click={()=>{updateCanvas()}}
>
    <SidebarButtons/>

    {#if $cursesCanvas.showSidebar}
        <CanvasProperties/>
        <Edit/>
        <TextOptions/>
        <ProgressOptions/>
        <Shortcuts/>
    {:else}
        <Export/>
    {/if}
</aside>

