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
    <p>{icon}</p>
</div>