<!------------------------------------------->
<!----------------JS------------------------->
<!------------------------------------------->
<script>
  import { gridCellStyle } from './styles'

  import Element from "./Element.svelte";
  import ElementDetail from "./ElementDetail.svelte";

  export let rows;
  export let atom;
  export let updateAtom;
  export let variant = 'laptop';

  let selectedEl
  let detailDirection = 'left'

  const toggleDetail = (el, dom, direction) => {
    if (dom) {
      atom = el
      selectedEl = dom.getBoundingClientRect()
      detailDirection = direction
    }
  }
</script>
<!------------------------------------------->
<!----------------MARKUP--------------------->
<!------------------------------------------->

{#if atom}
  <ElementDetail
    selectedEl={selectedEl}
    direction={detailDirection}
    atom={atom}
    fullDetail={true}
    close={() => (atom = null)} />
{/if}
<!-- variant !== 'laptop' -->
<div class="grid-container {variant}-screen">
  {#each rows as row}
    {#each row as cell(cell.uuid)}
      <div class="grid-cell" class:title-row={cell.titleRow} class:title-column={cell.titleColumn}>
        {#if cell.title}
          {cell.title}
        {/if}
        {#if cell.symbol}
          <Element variant={variant} updateAtom={(domEl, direction) => toggleDetail(cell, domEl, direction)}
            count={row.length}
            {...cell} />
        {/if}
      </div>
    {/each}
  {/each}
</div>

<!------------------------------------------->
<!----------------STYLES--------------------->
<!------------------------------------------->

<style>
  .grid-container {
    position: relative;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 2rem repeat(18, [col-start] 1fr);
    grid-template-rows: 20px auto;
    grid-row-gap: 4px;
    width: 100%;
    align-self: center
  }

  .grid-container.tablet-screen {
    grid-row-gap: 2px;
    grid-column-gap: 2px
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