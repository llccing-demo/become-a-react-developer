import { createContext } from 'react';
const ShoppingCartContext = createContext({
  products: [],
  cartList: [] 
})

export default ShoppingCartContext