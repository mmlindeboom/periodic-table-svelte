<!------------------------------------------->
<!----------------JS------------------------->
<!------------------------------------------->
<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { fly, slide } from 'svelte/transition'
  import { CloseIcon, FilterIcon } from './icons'
  import { CloseBtn } from './ui'

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
  let activeFiltersIds = []

  const toggleActiveFilter = (filter) => {
    if (!filter) {
      resetFilters()
      handleFilter()

      return
    }

    if (activeFiltersIds.includes(filter)) {
      activeFiltersIds.splice(activeFiltersIds.indexOf(filter), 1)
    } else {
      activeFiltersIds.push(filter)
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

    const filteredList = activeFiltersIds.reduce((list, filter) => {
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

    filterItems.forEach((item) => {
      const {el, active} = item

      if (active) {
        el.click()
      }
    })

  }

  export let filterRows
  export let allRows


  let showFilterMenu = false

  let AM
  let amIsFiltered = false
  let AEM
  let aemIsFiltered = false
  let TM
  let tmIsFiltered = false
  let NB
  let nbIsFiltered = false

  let filterItems

  $: filterStates = [[AM, amIsFiltered], [AEM, aemIsFiltered], [TM, tmIsFiltered], [NB, nbIsFiltered]]


  onMount(() => {
    filterItems = [
    {el: AM, active: amIsFiltered, title: 'Alkali Metals', event: 'ALKALI_METALS'},
    {el: AEM, active: aemIsFiltered, title: 'Alkaline Earth Metals', event: 'EARTH_METALS'},
    {el: TM, active: tmIsFiltered, title: 'Transition Metals', event: 'TRANSITION_METALS'},
    {el: NB, active: nbIsFiltered, title: 'Noble Gases', event: 'NOBLE_GASES'}
  ]
  })


</script>


<!------------------------------------------->
<!----------------MARKUP--------------------->
<!------------------------------------------->
<div class="filters-container">
  <button class="text-black hover:underline flex items-center text-base"
        on:click={() => showFilterMenu ? showFilterMenu = false : showFilterMenu = true}>


      <FilterIcon size="4" className="mr-1" />
      <span>Search</span>
  </button>
  {#if showFilterMenu }
    <div
      in:fly={{y: -10}}
      out:fly={{y: -10}}
      class="filters-menu">
      <CloseBtn handleClick={() => showFilterMenu = false} className="bg-gray-200" />
      <div class="filters">
        <ul class="flex flex-wrap justify-center">
          {#each filterItems as filter}
            <li class="filter-item">
              <div class:active={filter.active} class="filter-pill">
                <label class="filter-label">
                    {filter.title}
                  <input class="hidden" type="checkbox" bind:checked={filter.active} bind:this={filter.el} on:change={() => dispatchFilter(filter.event)} />
                </label>
              </div>
            </li>
          {/each}
          <li>
            <button class="pl-2 text-sm text-red-700 hover:underline" on:click={resetFilters}><CloseIcon size="2" className="mr-1" />Clear Filters</button>
          </li>
        </ul>
      </div>

    </div>
  {/if}

</div>



<!-- <ShowWhen screen="> mobile">
  <div class="filters max-w-lg my-4 mobile:max-w-xs">
    <ul class="flex flex-wrap justify-center">
      {#each filterItems as filter}
        <li class="filter-item">
          <div class:active={filter.active} class="filter-pill">
            <label class="filter-label">
                {filter.title}
              <input class="hidden" type="checkbox" bind:checked={filter.active} bind:this={filter.el} on:change={() => dispatchFilter(filter.event)} />
            </label>
          </div>
        </li>
      {/each}
      <li>
        <button class="pl-2 text-sm text-red-700 hover:underline" on:click={() => dispatchFilter()}><CloseIcon size="2" className="mr-1" />Clear Filters</button>
      </li>
    </ul>
  </div>
</ShowWhen> -->


<!------------------------------------------->
<!----------------STYLES--------------------->
<!------------------------------------------->
<style>
  .filters-container {
    display: inline-block;
    @apply ml-10;
  }
  .filters {
    display: block;
    margin: 2rem auto;
    position: relative;
    text-align: center;
    padding-bottom: 1rem;
    z-index: 100
  }

  .filters div {
    transition: all 0.2s;
    @apply text-blue-500;
  }

  .filters div:hover {
    @apply text-blue-700 border-blue-700;
  }

  .filters div label:hover {
    cursor: pointer;
  }

  .filters .active {
    @apply bg-blue-500 text-white;
  }

  .filters .active:hover {
    @apply bg-blue-700 text-white;
  }


  .filter-item {
    @apply mr-2 mb-2 flex-initial;
  }

  .filter-pill {
    @apply border border-blue-500 rounded-full;
  }

  .filter-label {
    font-weight: 400;
    white-space:nowrap;
    @apply px-2 text-xs leading-tight;
  }

  .filters-menu {
    position: fixed;
    height: 15vh;
    width: 100%;
    left: 0;
    top: 0;
    border: 0;
    transition: all 0.6s;
    z-index: 100;
    @apply bg-gray-200 shadow-md
  }
</style>