import { createContext } from 'react';
const TableContext = createContext({
  rows: [],
  cols: [],
  row: {}
})

export default TableContext