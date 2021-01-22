<script>
    import { cursesCanvas } from '../../JS/stores/project.js';
    import {sidebarActiveColour, sidebarPassiveColour, iconActiveColour, iconPassiveColour } from '../../JS/constants/colours.js';


    let toolsBGCol = sidebarActiveColour;
    let toolsIconCol = iconActiveColour;
    let exportBGCol = sidebarPassiveColour;
    let exportIconCol = iconPassiveColour;

    function showToolsSideBar() {
        if ($cursesCanvas.showSidebar === false) {
            cursesCanvas.toggleSidebar();
            toolsBGCol = sidebarActiveColour;
            toolsIconCol = iconActiveColour;
            exportBGCol = sidebarPassiveColour;
            exportIconCol = iconPassiveColour;
        }
    }

    function showExportSideBar() {
        if ($cursesCanvas.showSidebar === true) {
            cursesCanvas.toggleSidebar();
            exportBGCol = sidebarActiveColour;
            exportIconCol = iconActiveColour;
            toolsBGCol = sidebarPassiveColour;
            toolsIconCol = iconPassiveColour;
        }
    }
</script>


<div
id="sidebarTab" 
style="--toolsColour: {toolsBGCol}; --exportColour: {exportBGCol}"
class="w-full h-12 flex flex-row text-xs border-l border-header-border"
>
    <button 
    aria-label="tools sidebar button"
    style="background-color: var(--toolsColour); outline: none"
    class="flex flex-1 justify-center items-center"
    on:click={showToolsSideBar}
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="p-3 hover:stroke-current" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke={toolsIconCol}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
    </button>

    <button 
    aria-label="export sidebar button"
    style="background-color: var(--exportColour); outline: none"
    class="flex flex-1 justify-center items-center" 
    on:click={showExportSideBar}
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="p-3 hover:stroke-current" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke={exportIconCol}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
        </svg>
    </button>
    
</div>