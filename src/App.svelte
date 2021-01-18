<script>
	import "./index.css"

	import {cursesCanvas} from './JS/stores/project.js';

	import Header from './Components/Header.svelte';
	import Canvas from './Components/Canvas.svelte';
	import PythonScript from './Components/PythonScript.svelte';
	import Footer from './Components/Footer.svelte';
	import Splash from './Components/Splash.svelte';
	import Sidebar from './Components/Sidebar/Sidebar.svelte';
</script>

<main class="font-sans w-full h-full flex flex-col items-center text-center">

	<Header/>

	<div id="mainWindow" class="w-full flex flex-1 flex-row items-center">
		<Canvas/>
		<Sidebar/>
	</div>

	<Footer/>

	
	{#if $cursesCanvas.showPythonScript}
		<PythonScript/>
	{/if}

	{#if $cursesCanvas.showSplash}
		<Splash/>
	{/if}
	
</main>