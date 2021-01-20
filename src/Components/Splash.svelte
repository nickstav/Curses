
<script>
    import { cursesCanvas } from '../JS/stores/project.js';
    import { clickOutside } from '../JS/eventListeners/clickOutside.js';
</script>

<div id="overlay" class="w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 flex items-center justify-center align-center">

    <div 
    id="splashHolder" 
    class="flex flex-col w-3/4 rounded-md text-left text-sm bg-theme-secondary border-2 border-theme-secondary-dark" 
    use:clickOutside on:click_outside={()=>{cursesCanvas.toggleSplash()}}
    >
        <header id="previewHeader" class="bg-theme-primary w-full h-12 text-gray700 flex justify-between items-center border-b border-theme-primary-dark">
            <h1 class="text-2xl ml-4">O   R   I   S   O   N</h1>
        </header>

    <div id="introText" class="flex flex-col justify-between w-full p-3">

        <h2 id="introTitle" class="text-lg text-center font-bold">Welcome to Orison!</h2>
        <br>
        <p> 
            <strong>What is Orison?</strong>
            <br>
            <br>
            Orison is an app that allows you to create a [UI / GUI / progress screen / whatever you want*] 
            for command-line interpreters such as cmd.exe quickly and efficiently using a canvas tool.
            <br>
            <br>
            <strong>How to use it</strong>
            <br>
            <br>
            Orison allows you to add (and edit) lines, rectangles, text and progress bars on a canvas that 
            represents your cmd shell.
            <br>
            <br>
            Once finished with your design, hit the save button to download a Python script that uses the Curses
            library to build [whatever you just did] when run using the usual "python** script.py" command in
            your command prompt shell.
            <br>
            <br>
            Thanks for visiting this app, please get in touch with any suggestions*** as future versions will be upcoming!
            <br>
            <br>
            👍
            <br>
            <br>
            (* - "whatever you want" here means "whatever you want that you can do in the app")
            <br>
            (** - or python3 or whatever personalised command you have chosen as your own)
            <br>
            (*** - criticisms are also welcome)
        </p>

    </div>

        <div id="buttonHolder" class="flex justify-center py-2">
            <button 
            on:click={()=>{cursesCanvas.toggleSplash()}}
            class="h-8 w-24 text-xs bg-theme-primary-light hover:bg-transparent text-black font-semibold hover:text-black border-black border 2"
            >
                Close
            </button>
            </div>
        
            <footer class="flex h-6 w-full justify-center items-center bg-theme-secondary-light border-t border-theme-secondary-dark">
                <p 
                class="text-xs"
                > 
                    <a href="https://ko-fi.com/nickstav" target="_blank" class="text-xs text-blue-500 underline">
                        ko-fi page
                    </a>
                    |
                    <a href="https://github.com/nickstav" target="_blank" class="text-xs text-blue-500 underline">
                        github profile
                    </a>
                </p>
            </footer>

    </div>

</div>