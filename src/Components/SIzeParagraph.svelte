<script>
    import { checkUserInput } from '../JS/stores/grid.js';
    import { cursesCanvas } from '../JS/stores/store.js';
</script>


{#if $checkUserInput.belowMin}
    <p id="minSizingNote" class="text-xs">
        Note: minimum canvas size is {$cursesCanvas.minDimensions.width}x{$cursesCanvas.minDimensions.height}
    </p>
{/if}
{#if $checkUserInput.aboveMax}
    <p id="maxSizingNote" class="text-xs">
        Note: maximum canvas size is {$cursesCanvas.maxDimensions.width}x{$cursesCanvas.maxDimensions.height}
    </p>
{/if}
