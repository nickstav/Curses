<script>
    import SidebarTab from './SidebarTab.svelte';
    import Edit from './Edit.svelte';
    import Export from './Export.svelte'
    import TextOptions from './TextOptions.svelte';
    import ProgressOptions from './ProgressOptions.svelte';
    import CanvasProperties from './CanvasProperties.svelte';
    import Shortcuts from './Shortcuts.svelte';

    import { projectStore } from '../../JS/stores/project.js';
    import { updateCanvas } from '../../JS/draw/updateCanvas.js';

</script>


<aside
class="bg-sidebar w-64 h-full text-xs flex flex-col justify-start items-center"
on:click={()=>{updateCanvas()}}
>
    <SidebarTab/>

    <div id="sidebarBody" class="w-full h-full border-l border-sidebar-border overflow-auto">
        {#if $projectStore.showSidebar}
        <div id="toolsSidebar" class="w-full h-full">
            <CanvasProperties/>
            <Edit/>
            <TextOptions/>
            <ProgressOptions/>
            <Shortcuts/>
    </div>   
    {:else}
        <Export/>
    {/if}
    </div>
    
</aside>

