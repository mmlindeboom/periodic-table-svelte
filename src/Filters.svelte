<script>
  const NOBLE_GASES = [2, 10, 18, 36, 54, 86]
  const ALKALAI_METALS = [3, 4, 5, 6, 7]
  const TRANSITION_METALS = [21, 22, 23, 24, 25, 26, 27, 28, 29, 39, 40, 41, 42, 43, 44, 45, 46, 47, 72, 73, 74, 75, 76, 77, 78, 79, 104, 105, 106, 107, 108]

  const availableFilters = {
    NOBLE_GASES,
    ALKALAI_METALS,
    TRANSITION_METALS
  }
  const activeFilters = []

  const toggleActiveFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      activeFilters.splice(activeFilters.indexOf(filter), 1)
    } else {
      activeFilters.push(filter)
    }
    handleFilter()
  }

  const dispatchFilter = (filter) => {
    switch(filter) {
      case 'NOBLE_GASES':
        toggleActiveFilter('NOBLE_GASES')
      break
      case 'ALKALAI_METALS':
        toggleActiveFilter('ALKALAI_METALS')
      break
      case 'TRANSITION_METALS':
        toggleActiveFilter('TRANSITION_METALS')
      break

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

  export let filterRows
  export let filtered
  export let allRows
</script>



<div class="filters">
  <label>
    Noble Gases
    <input type="checkbox" on:change="{() => dispatchFilter('NOBLE_GASES')}" />
  </label>
  <label>
    Alkalai Metals
    <input type="checkbox" on:change="{() => dispatchFilter('ALKALAI_METALS')}" />
  </label>
  <label>
    Transition Metals
    <input type="checkbox" on:change="{() => dispatchFilter('TRANSITION_METALS')}" />
  </label>
</div>

<style>
  .filters {
    height: 3em;
    display: inline-block;
    border-left: 1px solid gray;
    @apply ml-4 pl-4 align-middle;
  }

  label {
    display: inline-block;
    @apply ml-4 pl-4 align-middle;
  }
</style>