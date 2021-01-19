<script>
    import { cursesCanvas } from '../../JS/stores/project.js';
    import {activeColour, passiveColour } from '../../JS/constants/colours.js';


    let toolsBGCol = activeColour;
    let exportBGCol = passiveColour;

    function showToolsSideBar() {
        if ($cursesCanvas.showSidebar === false) {
            cursesCanvas.toggleSidebar();
            toolsBGCol = activeColour;
            exportBGCol = passiveColour;
        }
    }

    function showExportSideBar() {
        if ($cursesCanvas.showSidebar === true) {
            cursesCanvas.toggleSidebar();
            exportBGCol = activeColour;
            toolsBGCol = passiveColour;
        }
    }
</script>


<div
id="sidebarTab" 
style="--toolsColour: {toolsBGCol}; --exportColour: {exportBGCol}"
class="w-full flex flex-row text-xs border-b border-gray-600"
>
    <button 
    style="background-color: var(--toolsColour); outline: none"
    class="flex-1 h-12 border-r border-gray-500"
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