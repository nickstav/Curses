
<script>
    import { projectStore } from '../JS/stores/project.js';
    import { clickOutside } from '../JS/eventListeners/clickOutside.js';
</script>

<div id="overlay" class="w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 flex items-center justify-center align-center">

    <div 
    id="splashHolder" 
    class="flex flex-col w-3/5 rounded-sm text-left text-sm bg-sidebar border" 
    use:clickOutside on:click_outside={()=>{projectStore.toggleSplash()}}
    >
        <div id="previewHeader" class="bg-header w-full h-12 text-gray700 flex justify-between items-center border-b border-header-border select-none">
            <h1 class="text-2xl text-header-font font-bold tracking-widest ml-4">ORISON</h1>
        </div>

    <div id="introText" class="flex flex-col justify-between w-full p-3 select-none">

        <h2 id="introTitle" class="text-lg text-center font-bold">Welcome to <span class="tracking-widest">ORISON</span>!</h2>
        <br>
        <div id="introContent" class="flex flex-row flex-1 w-full py-2">
            <p id="what" class="flex-1 px-6 py-2">
                <strong>What is <span class="tracking-widest">ORISON</span>?</strong>
                <br>
                <span class="tracking-widest">ORISON</span> is an app that allows you to create a UI / progress screen / whatever you want 
                for command-line interpreters such as cmd.exe quickly and efficiently using a canvas tool.
                <br>
            </p>
            <p id="how" class="flex-1 px-6 py-2">
                <strong>How to use it</strong>
                <br>
                Add (and edit) lines, rectangles, text and progress bars on a canvas that 
                represents your cmd shell.
                <br>
                <br>
                Once finished with your design, hit the export button to copy or download a Python script that uses the
                <a href="https://docs.python.org/3/library/curses.html#module-curses" rel="noopener" target="_blank" class="font-mono hover:text-header">curses</a>
                library to build your canvas when using the usual "python script.py" command in your command prompt shell.
                <br>
            </p>
        </div>
        <p id="signOff" class="flex justify-center py-6 px-6">
            Thanks for visiting this app, please get in touch with any suggestions/criticisms for future versions!
            👍
            <br>
        </p>

    </div>

        <div id="buttonHolder" class="flex justify-center py-2 select-none">
            <button 
            on:click={()=>{projectStore.toggleSplash()}}
            class="h-8 w-24 text-xs bg-sidebar-lighter hover:text-header hover:border-header font-semibold border-black border 2"
            >
                Close
            </button>
            </div>
        
            <div class="flex h-6 w-full justify-center items-center bg-sidebar-lighter border-t border-sidebar">
                <p 
                class="text-xs font-semibold text-gray-700"
                > 
                    <a href="https://ko-fi.com/nickstav" rel="noopener" target="_blank" class="text-xs underline hover:text-header">
                        ko-fi page
                    </a>
                    |
                    <a href="https://github.com/nickstav" rel="noopener" target="_blank" class="text-xs underline hover:text-header">
                        github profile
                    </a>
                </p>
            </div>

    </div>

</div>