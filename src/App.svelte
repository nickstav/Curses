<script>
	import "./index.css"

	import {cursesCanvas} from './JS/stores/project.js';

	import Toolbar from './Components/Toolbar.svelte';
	import Canvas from './Components/Canvas.svelte';
	import Sidebar from './Components/Sidebar.svelte';
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
		<div id="sidebarHolder" class="w-24 h-full">
			<Sidebar/>
		</div>
	</div>
	
</main>