<script>

  import { onMount } from 'svelte';
  import Tailwindcss from './Tailwindcss.svelte'
  import Filters from './Filters.svelte'
  import Table from './Table.svelte'
  import Grid from './Grid.svelte'

  import { defaultTableData } from './data.js'

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
    rows = defaultTableData
  }

  onMount(() => {
    rows = defaultTableData
  })
</script>

<main class="table-container">
  <header>
    <h1>Periodic Table</h1>
    <Filters filtered={filtered} allRows={defaultTableData} filterRows={(filteredRows) => {
      rows = filteredRows}} />
  </header>
  <Grid />
  <Table updateAtom={updateAtom} rows={rows} atom={atom} />
</main>


<style type="text/postcss">


  header {
    height: 3em;
    margin-bottom: 4em;
  }


  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
    display: inline-block;
    @apply align-middle;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>


<Tailwindcss />
