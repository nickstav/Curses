<script>
	import {cursesCanvas} from './JS/stores/project.js';

	import Toolbar from './Components/Toolbar.svelte';
	import Canvas from './Components/Canvas.svelte';
	import Sidebar from './Components/Sidebar.svelte';
	import PythonScript from './Components/PythonScript.svelte';
</script>

<main class="w-full h-full flex flex-row items-center text-center">
	<div id="mainWindow" class="h-full flex flex-1 flex-col items-center text-center">
		{#if $cursesCanvas.showPythonScript}
			<PythonScript/>
		{/if}
		<Toolbar/>
		<Canvas/>
	</div>
	<Sidebar/>
</main>