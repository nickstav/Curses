<script>
    export let toggleSubMenu, menuDisplayed;

    let icon;
    $: if (menuDisplayed) {
        icon = '⌵';
    } else {
        icon = '˃';
    }
</script>

<div id="dropDownArrow" class="text-sm w-4 pr-1 cursor-pointer" on:click={toggleSubMenu}>
    {#if menuDisplayed}
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    {:else}
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
    {/if}
</div>