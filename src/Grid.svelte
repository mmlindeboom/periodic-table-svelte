<script>
  import { gridData } from './data.js'
  import { gridCellStyle } from './styles'
</script>



<div class="grid-container">
  {#each gridData as row}
    {#each row as cell}
      <div class="grid-cell" class:title-row={cell.titleRow} class:title-column={cell.titleColumn}>
      {#if cell.value}
        {cell.value}
      {/if}
      </div>
    {/each}
  {/each}
</div>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 2rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 20px 98px 98px 98px 98px 98px 98px 98px 98px 98px;
    grid-row-gap: 8px;
    top: 119px;
    left: 0;
    position: absolute;
    width: 100%;
    padding-right: 2rem;
    align-self: center
  }


  .grid-cell {
    text-align:center;
    align-self: center;
    font-size: 0.75em;
    color: #999;
    @apply font-body;
  }

  .title-column {
    align-self: end;
  }
  /* .title-row.first-cell {
    height: 0
  } */

</style>