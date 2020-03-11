<!------------------------------------------->
<!----------------JS------------------------->
<!------------------------------------------->
<script>

  import { onMount } from 'svelte';
  import Tailwindcss from './Tailwindcss.svelte'
  import Filters from './Filters.svelte'
  import Table from './Table.svelte'
  import Grid from './Grid.svelte'
  import Atom from './Atom.svelte'
  import ShowWhen from './responsive/ShowWhen.svelte'

  import { pt } from './data.js'

  // State
  let rows = []
  let filtered = false
  let filteredByNobleGases = false
  let atom = null
  let h = null
  const filters = []

  const updateAtom = (el) => {
    atom = null
    setTimeout(() => atom = el, 10)
  }


  const all = () => {
    atom = null
    rows = []
    filtered = false
    rows = pt
  }

  onMount(() => {
    rows = pt
    h = rows[4][8]
  })
</script>
<!------------------------------------------->
<!----------------MARKUP--------------------->
<!------------------------------------------->
<main>
  <header>
    <h1>Periodic Table</h1>
    <Filters filtered={filtered} allRows={pt} filterRows={(filteredRows) => {
      rows = filteredRows}} />
  </header>
  {#if h}
    <Atom size="300" atom={h}></Atom>
    {/if}
  <div class="table-container">
    <ShowWhen screen="mobile">
      <Grid variant='mobile' updateAtom={updateAtom} rows={rows} atom={atom} />
    </ShowWhen>
    <ShowWhen screen="tablet">
      <Grid variant='tablet' updateAtom={updateAtom} rows={rows} atom={atom} />
    </ShowWhen>

    <ShowWhen screen="laptop">
      <Grid updateAtom={updateAtom} rows={rows} atom={atom} />
    </ShowWhen>
  </div>

</main>

<!------------------------------------------->
<!----------------STYLES--------------------->
<!------------------------------------------->
<style type="text/postcss">
  header {
    margin: 0 2rem 3rem;
    position: relative;
    z-index: 100;
    @apply rounded
  }


  h1 {
    display: inline-block;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
    @apply mb-3 align-middle;
  }


  .table-container {
    overflow-y: scroll
  }

</style>


<Tailwindcss />
