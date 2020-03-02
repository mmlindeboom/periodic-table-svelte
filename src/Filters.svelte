<script>
  import { onMount, createEventDispatcher } from 'svelte'
  const NOBLE_GASES = [2, 10, 18, 36, 54, 86]
  const ALKALI_METALS = [3, 11, 19, 37, 55, 87]
  const EARTH_METALS = [4, 12, 20, 38, 56, 88]
  const TRANSITION_METALS = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 72, 73, 74, 75, 76, 77, 78, 79, 80, 104, 105, 106, 107, 108, 109, 110, 111, 112]

  const availableFilters = {
    ALKALI_METALS,
    EARTH_METALS,
    NOBLE_GASES,
    TRANSITION_METALS
  }
  let activeFilters = []

  const toggleActiveFilter = (filter) => {
    if (!filter) {
      resetFilters()
      handleFilter()

      return
    }

    if (activeFilters.includes(filter)) {
      activeFilters.splice(activeFilters.indexOf(filter), 1)
    } else {
      activeFilters.push(filter)
    }
    handleFilter()
  }

  const dispatchFilter = (filter) => {
    switch(filter) {
      case 'ALKALI_METALS':
        toggleActiveFilter('ALKALI_METALS')
      break
      case 'EARTH_METALS':
        toggleActiveFilter('EARTH_METALS')
      break
       case 'NOBLE_GASES':
        toggleActiveFilter('NOBLE_GASES')
      break
      case 'TRANSITION_METALS':
        toggleActiveFilter('TRANSITION_METALS')
      break
      default:
        toggleActiveFilter()

    }
  }
  const handleFilter = () => {

    const filteredList = activeFilters.reduce((list, filter) => {
      return list.concat(availableFilters[filter])
    }, [])

    if (filteredList.length < 1) return filterRows(allRows)

    const deepClone = JSON.parse(JSON.stringify(allRows))

    const newRows = deepClone.map((row) => {
      if (!row) return
      row.map((el) => {
        if (!filteredList.includes(el.id)) {
          el.inactive = true
        } else {
          el.inactive = false
        }
        return el
      })

      return row
    })

    filterRows(newRows)

    // rows = [ChemElementData.filter((el) => {
    //   if (el.name === "Dummy" || el.symbol === "D") return false
    //   return gases.includes(el.id)
    // })]
  }


  const resetFilters = () => {
    activeFilters = []
    filterStates.forEach((state) => state.checked = false)
  }

  export let filterRows
  export let filtered
  export let allRows

  let AM
  let AEM
  let TM
  let NB

  let filterStates = []

  onMount(() => {
    filterStates = [AM, AEM, TM, NB]
  })
</script>



<div class="filters">

  <label>
    Alkali Metals
    <input type="checkbox" bind:this={AM} on:change="{() => dispatchFilter('ALKALI_METALS')}" />
  </label>
  <label>
    Alkaline Earth Metals
    <input type="checkbox" bind:this={AEM} on:change="{() => dispatchFilter('EARTH_METALS')}" />
  </label>
  <label>
    Transition Metals
    <input type="checkbox" bind:this={TM} on:change="{() => dispatchFilter('TRANSITION_METALS')}" />
  </label>
  <label>
    Noble Gases
    <input type="checkbox" bind:this={NB} on:change="{() => dispatchFilter('NOBLE_GASES')}" />
  </label>
  <button on:click={() => dispatchFilter()}>Clear Filters</button>
</div>

<style>
  .filters {
    display: flex;
    height: 3em;
    display: inline-block;
    border-left: 1px solid gray;
    align-items: center;
    @apply ml-4 pl-4 align-middle;
  }

  label, button {
    line-height: 3rem;
    font-size: 1em;
    @apply ml-4 pl-4 align-middle;
  }
</style>