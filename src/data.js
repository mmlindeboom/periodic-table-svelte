import { v4 as uuidv4 } from 'uuid';
import Elements from "@chemistry/elements";
const { ChemElements, ChemElementData } = Elements;

const emptyElTemplate = () => {
  return {
    uuid: uuidv4(),
    visible: false,
    titleColumn: false,
    titleRow: false,
    title: null
  }
}

const isRowHeader = (row, col) => {
  return col === 0 && row > 0 && row < 8
}
const isColumnHeader = (row, col) => {
  if (row === 0 && col === 1) return true
  if (row === 1 && col === 2) return true
  if (row === 0 && col === 18) return true
  if (row === 3 && col > 2 && col < 13) return true
  if (row === 1 && col >= 13 && col < 18) return true
}

export const gridData = [...Array(11)].map((_, rowIdx) => {
  const columns = [...Array(19)].map((_, colIdx) => {
    const obj = emptyElTemplate()
    if (isColumnHeader(rowIdx, colIdx)) {
      obj.titleColumn = true
      obj.title = colIdx
      obj.visible = true
    } else if (colIdx === 0 && rowIdx === 0) {
      obj.titleRow = true
      obj.visible = true
    }

    if (isRowHeader(rowIdx, colIdx)) {
      obj.titleRow = true
      obj.title = rowIdx
      obj.visible = true
    }

    return obj
  })

  return columns
})

console.log(gridData)

export const defaultTableData = ChemElementData.reduce((table, el) => {
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

export const pt = ChemElementData.reduce((table, element) => {
  if (element.name === "Dummy" || element.symbol === "D") return table;
  let x = element.posX
  let y = element.posY
  if (!table[x]) {
    return table
  }
  table[x][y].visible = true
  table[x][y] = Object.assign(element, table[x][y])

  return table
}, gridData);