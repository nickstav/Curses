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
class="w-full flex flex-row justify-between text-xs border-b border-black px-3 py-4"
>
    <button 
    style="background-color: var(--toolsColour); outline: none"
    class="w-14 border border-gray-600 rounded-md mx-2 hover:shadow-lg"
    on:click={showToolsSideBar}
    >
        tools
    </button>
    <button 
    style="background-color: var(--exportColour); outline: none"
    class="w-14 border border-gray-600 rounded-md mx-2 hover:shadow-lg" 
    on:click={showExportSideBar}
    >
        export
    </button>
</div>