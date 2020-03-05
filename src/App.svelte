<!------------------------------------------->
<!----------------JS------------------------->
<!------------------------------------------->
<script>

  import { onMount } from 'svelte';
  import Tailwindcss from './Tailwindcss.svelte'
  import Filters from './Filters.svelte'
  import Table from './Table.svelte'
  import Grid from './Grid.svelte'
  import ShowWhen from './responsive/ShowWhen.svelte'

  import { pt } from './data.js'

  // State
  let rows = []
  let filtered = false
  let filteredByNobleGases = false
  let atom = null
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

  .hero-bg {
    position: absolute;
    width: 100%;
    height: 14vh;
    top: 0;
    left: 0;
    background-image: url(https://wallpaperaccess.com/download/cool-minimalist-345806);
    background-size: 25%;
    background-repeat: no-repeat;
    background-position: -100px 0;
    background-color: black;
    z-index: 0
  }
  .table-container {
    overflow-y: scroll
  }

</style>


<Tailwindcss />
