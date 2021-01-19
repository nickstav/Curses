<script>
    import { cursesCanvas } from '../../JS/stores/project.js';

    let toolsBGCol = 'rgba(243, 244, 246)';
    let exportBGCol = 'rgba(209, 213, 219)';

    function showToolsSideBar() {
        if ($cursesCanvas.showSidebar === false) {
            cursesCanvas.toggleSidebar();
            toolsBGCol = 'rgba(243, 244, 246)';
            exportBGCol = 'rgba(209, 213, 219)';
        }
    }

    function showExportSideBar() {
        if ($cursesCanvas.showSidebar === true) {
            cursesCanvas.toggleSidebar();
            exportBGCol = 'rgba(243, 244, 246)';
            toolsBGCol = 'rgba(209, 213, 219)';
        }
    }
</script>


<div
id="sidebarButtons" 
style="--toolsColour: {toolsBGCol}; --exportColour: {exportBGCol}"
class="w-full flex flex-row text-xs border-b border-black"
>
    <button 
    style="background-color: var(--toolsColour); outline: none"
    class="flex-1 h-12"
    on:click={showToolsSideBar}
    >
        tools
    </button>
    <button 
    style="background-color: var(--exportColour); outline: none"
    class="flex-1 h-12" 
    on:click={showExportSideBar}
    >
        export
    </button>
</div>