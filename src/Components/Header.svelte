<script>
    import { cursesCanvas } from '../JS/stores/project.js';
</script>

<header class="bg-header w-full h-12 text-gray700 flex justify-between items-center border-b border-header-border select-none">
       
    <h1 class="text-2xl text-header-font tracking-widest font-bold ml-4">ORISON</h1>

    <button
    id="infoButton"
    title="app info"
    class="h-10 w-10 bg-cover text-xs rounded-md mr-4"
    style="outline: none"
    on:click={()=>{cursesCanvas.toggleSplash()}} 
    >
        <svg xmlns="http://www.w3.org/2000/svg" class=" p-2 hover:p-1" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="#fafafa">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </button>

</header>
