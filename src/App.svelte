<script>
	import "./index.css"

	import {cursesCanvas} from './JS/stores/project.js';
	import { tools } from './JS/constants/toolsList.js';

	import Toolbar from './Components/Toolbar.svelte';
	import Canvas from './Components/Canvas.svelte';
	import Sidebar from './Components/Sidebar.svelte';
	import TextOptions from './Components/TextOptions.svelte';
    import ProgressOptions from './Components/ProgressOptions.svelte';
	import Shortcuts from './Components/Shortcuts.svelte';
	import PythonScript from './Components/PythonScript.svelte';
</script>

<main class="w-full h-full flex flex-col items-center text-center">
	{#if $cursesCanvas.showPythonScript}
		<PythonScript/>
	{/if}

	<Toolbar/>

	<Shortcuts/>

	<div id="mainWindow" class="w-full flex flex-1 flex-row items-center">
		<Canvas/>
	</div>
	
	<div id="sidebarHolder" class="absolute right-2 top-20 w-24 h-2/3">
		<Sidebar/>
	</div>

	{#if $cursesCanvas.tool === tools.TEXT}
    	<TextOptions/>
	{:else if $cursesCanvas.tool === tools.PROGRESS}
    	<ProgressOptions/>
	{/if}
</main>