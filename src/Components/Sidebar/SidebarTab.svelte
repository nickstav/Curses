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
class="w-full h-12 flex flex-row text-xs border-b border-t border-gray-600"
>
    <button 
    style="background-color: var(--toolsColour); outline: none"
    class="flex flex-1 justify-center items-center border-r border-theme-secondary-dark"
    on:click={showToolsSideBar}
    >
        <img src={'./images/buttons/toolbar.png'} alt="toolbar" class="h-9 w-9">
    </button>

    <button 
    style="background-color: var(--exportColour); outline: none"
    class="flex flex-1 justify-center items-center" 
    on:click={showExportSideBar}
    >
        <img src={'./images/buttons/export.png'} alt="export" class="h-9 w-9">
    </button>
    
</div>