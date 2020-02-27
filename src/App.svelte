<script>
  import { onMount } from 'svelte';
  import Elements from "@chemistry/elements";
  import Element from "./Element.svelte";
  import Atom from './Atom.svelte'
  import { v4 as uuidv4 } from 'uuid';
  import { tableStyle } from "./styles.js";

  const { ChemElements, ChemElementData } = Elements;

  const emptyElTemplate = () => {
     return {
      uuid: uuidv4(),
      visible: false
    }
  }

  let rows = []
  let filtered = false
  let filterName = ''
  let atom = null

  const updateAtom = (el) => {
    atom = el
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



  const nobleGases = () => {
    rows = []
    filtered = true
    filterName = 'Noble Gases'
    const gases = [2, 10, 18, 36, 54, 86]

    rows = [ChemElementData.filter((el) => {
      if (el.name === "Dummy" || el.symbol === "D") return false
      return gases.includes(el.id)
    })]
  }
  const all = () => {
    rows = []
    filtered = false
    rows = allRows
  }
  onMount(() => {
    rows = allRows
  })
</script>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>



<main class={tableStyle}>
  <h1 style="text-align: center">Periodic Table</h1>
  <div style="text-align: center">
    <button on:click="{() => all()}">All</button>
    <button on:click="{() => nobleGases()}">Noble Gases</button>
  </div>
  {#if atom}
    <Atom atom={atom}></Atom>
  {/if}
  <div>
    {#each rows as row}
      {#if row}
        {#each row as el (el.uuid)}
            <Element updateAtom={() => atom = el} count={row.length} {...el} />
        {/each}
      {/if}
    {/each}
  </div>
</main>
