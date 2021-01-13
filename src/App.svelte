<script>
	import "./index.css"

	import {cursesCanvas} from './JS/stores/project.js';

	import Toolbar from './Components/Toolbar.svelte';
	import Canvas from './Components/Canvas.svelte';
	import Sidebar from './Components/Sidebar.svelte';
	import Shortcuts from './Components/Shortcuts.svelte';
	import PythonScript from './Components/PythonScript.svelte';
	import DonateLink from './Components/DonateLink.svelte';
	import Splash from './Components/Splash.svelte';
</script>

<main class="font-sans w-full h-full flex flex-col items-center text-center">

	<Toolbar/>

	<Shortcuts/>

	<div id="mainWindow" class="w-full flex flex-1 flex-row items-center">
		<Canvas/>
		<Sidebar/>
	</div>

	<DonateLink/>
	
	{#if $cursesCanvas.showPythonScript}
		<PythonScript/>
	{/if}

	{#if $cursesCanvas.showSplash}
		<Splash/>
	{/if}
	
</main>