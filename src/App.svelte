<script>
  import Tailwindcss from './Tailwindcss.svelte';
  import { onMount } from 'svelte';

  import { v4 as uuidv4 } from 'uuid';
  import { tableStyle } from "./styles.js";
  import Filters from './Filters.svelte'
  import Table from './Table.svelte'

  import Elements from "@chemistry/elements";
  const { ChemElements, ChemElementData } = Elements;

  // State
  let rows = []
  let filtered = false
  let filteredByNobleGases = false
  let atom = null
  const filters = []

  const emptyElTemplate = () => {
      return {
        uuid: uuidv4(),
        visible: false
      }
    }
  const updateAtom = (el) => {
    atom = null
    setTimeout(() => atom = el, 10)
  }

  const allRows = ChemElementData.reduce((table, el) => {
    if (el.name === "Dummy" || el.symbol === "D") return table;
    el = Object.assign(el, emptyElTemplate())

    const x = el.posX - 1;
    const y = el.posY - 1;

    if (table[x] === undefined) {
      const newRow = new Array(18)
      for (let step = 0; step < 18; step++) {
        newRow[step] = emptyElTemplate()
      }
      table[x] = newRow
    }

    el.visible = true
    table[x][y] = el;

    return table;
  }, new Array(9));

  const all = () => {
    atom = null
    rows = []
    filtered = false
    rows = allRows
  }

  onMount(() => {
    rows = allRows
  })
</script>

<style>
  main {
    overflow: hidden;
  }

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




<main class="table-container {tableStyle}">
  <header>
    <h1>Periodic Table</h1>
    <Filters filtered={filtered} allRows={allRows} filterRows={(filteredRows) => {
      rows = filteredRows}} />
  </header>

  <Table updateAtom={updateAtom} rows={rows} atom={atom} />
</main>
