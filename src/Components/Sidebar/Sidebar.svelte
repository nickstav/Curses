<script>
    import Button from '../Button.svelte';
    import Edit from './Edit.svelte';
    import Export from './Export.svelte'
    import TextOptions from './TextOptions.svelte';
    import ProgressOptions from './ProgressOptions.svelte';
    import CanvasProperties from './CanvasProperties.svelte';
    import Shortcuts from './Shortcuts.svelte';

    import { cursesCanvas } from '../../JS/stores/project.js';
    import { updateCanvas } from '../../JS/draw/updateCanvas.js';

    function showToolsSideBar() {
        if ($cursesCanvas.showSidebar === false) {
            cursesCanvas.toggleSidebar();
        }
    }

    function showExportSideBar() {
        if ($cursesCanvas.showSidebar === true) {
            cursesCanvas.toggleSidebar();
        }
    }
</script>

<div id="sidebarButtons" class="absolute top-3 right-4 text-sm">
    <button class="w-14 border border-black rounded-md mx-2" on:click={showToolsSideBar}>Tools</button>
    <button class="w-14 border border-black rounded-md mx-2" on:click={showExportSideBar}>Export</button>
</div>

<div id="sidebar" 
class="bg-gray-300 w-44 h-full text-xs flex flex-col justify-start items-center"
on:click={()=>{updateCanvas()}}
>
    {#if $cursesCanvas.showSidebar}
        <CanvasProperties/>
        <Edit/>
        <TextOptions/>
        <ProgressOptions/>
        <Shortcuts/>
    {:else}
        <Export/>
    {/if}
</div>

