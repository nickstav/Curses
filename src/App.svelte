<script>
	import Toolbar from './Components/Toolbar.svelte';
	import Canvas from './Components/Canvas.svelte';
	import Sidebar from './Components/Sidebar.svelte';
</script>

<main class="w-full h-full flex flex-row items-center text-center">
	<div id="mainWindow" class="h-full flex flex-1 flex-col items-center text-center">
		<Toolbar/>
		<Canvas/>
	</div>
	<Sidebar/>
</main>