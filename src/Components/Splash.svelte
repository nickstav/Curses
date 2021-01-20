
<script>
    import { cursesCanvas } from '../JS/stores/project.js';
</script>

<div id="overlay" class="w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 flex items-center justify-center align-center">

    <div 
    id="splashHolder" 
    class="flex flex-col w-3/4 rounded-md text-left text-sm bg-theme-secondary border-2 border-theme-secondary-dark pt-4 px-4" 
    >
        <h2 class="text-lg text-center font-bold">Welcome to Orison!</h2>

        <br>

        <p> 
            Orison is an app that allows you to create a [UI / GUI / progress screen / whatever you want*] 
            for command-line interpreters such as cmd.exe quickly and efficiently using a canvas tool.
        </p>

        <br>

        <p>
            Once finished with your design, hit the save button to download a Python script that uses the Curses
            library to build [whatever you just did] when run using the usual "python** script.py" command in
            your command prompt shell.
        </p>

        <br>

        <p>
            Thanks for visiting this app, please get in touch with any suggestions*** as future versions will be upcoming!
        </p>

        <br>

        <p>
            👍
        </p>

        <br>

        <p>(* - "whatever you want" here means "whatever you want that you can do in the app")</p>
        <p>(** - or python3 or whatever personalised command you have chosen as your own)</p>
        <p>(*** - criticisms are also welcome)</p>

        <br>

        <div id="buttonHolder" class="flex justify-center py-2">
            <button 
            on:click={()=>{cursesCanvas.hideSplash()}}
            class="h-8 w-24 text-xs bg-gray-200 hover:bg-transparent text-black font-semibold hover:text-black border-black border 2"
            >
                Get started!
            </button>
            </div>
        
    </div>

</div>