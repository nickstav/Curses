<script>
	import "./index.css"
	import {projectStore} from './JS/stores/project.js';

	import Header from './Components/Header.svelte';
	import Canvas from './Components/Canvas.svelte';
	import Toolbar from './Components/Toolbar.svelte';
	import PythonScript from './Components/PythonScript.svelte';
	import Footer from './Components/Footer.svelte';
	import Splash from './Components/Splash.svelte';
	import Sidebar from './Components/Sidebar/Sidebar.svelte';
</script>

<main class="w-full h-full flex flex-row text-center bg-gray-100">

	<div id="mainWindow" class="w-full h-full flex flex-col overflow-hidden bg-theme-mainBackground">
		<Header/>
		<div id="toolBarAndCanvasHolder" class=" bg-gray-100 w-full h-full flex flex-row justify-between flex-1 overflow-hidden">
			<Toolbar/>
			<Canvas/>
		</div>
		<Footer/>
	</div>

	<Sidebar/>
	

	
	{#if $projectStore.showPythonScript}
		<PythonScript/>
	{/if}

	{#if $projectStore.showSplash}
		<Splash/>
	{/if}
	
</main>