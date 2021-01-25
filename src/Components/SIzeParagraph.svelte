<script>
    import { checkUserInput } from '../JS/stores/grid.js';
    import { projectStore } from '../JS/stores/project.js';
    import { minDimensions, maxDimensions } from '../JS/constants/canvasSize.js';
</script>


{#if $checkUserInput.belowMin}
    <div id="minSizingHolder" class="w-full h-10">
        <p id="minSizingNote" class="text-xs font-bold text-gray-700">
            Note: minimum canvas size is {minDimensions.width}x{minDimensions.height}
        </p>
    </div>
{/if}
{#if $checkUserInput.aboveMax}
    <div id="maxSizingHolder" class="w-full h-10">
        <p id="maxSizingNote" class="text-xs font-bold text-gray-700">
            Note: maximum canvas size is {maxDimensions.width}x{maxDimensions.height}
        </p>
    </div>
{/if}
