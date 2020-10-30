<script>
    import { checkUserInput } from '../JS/stores/grid.js';
    import { cursesCanvas } from '../JS/stores/project.js';
    import { minDimensions, maxDimensions } from '../JS/constants/canvasSize.js';
</script>


{#if $checkUserInput.belowMin}
    <p id="minSizingNote" class="text-xs">
        Note: minimum canvas size is {minDimensions.width}x{minDimensions.height}
    </p>
{/if}
{#if $checkUserInput.aboveMax}
    <p id="maxSizingNote" class="text-xs">
        Note: maximum canvas size is {maxDimensions.width}x{maxDimensions.height}
    </p>
{/if}
