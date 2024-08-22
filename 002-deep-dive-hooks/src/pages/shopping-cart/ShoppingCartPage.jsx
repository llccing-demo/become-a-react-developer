import { useContext, useState } from "react";
import ShoppingCartContext from "./ShoppingCartContext";
import Proptypes from "prop-types";

const DefaultProducts = [
  { name: "Apple", price: "10" },
  { name: "Orange", price: "15" },
  { name: "Pineapple", price: "20" },
];

const Button = ({ children, onClick, cls }) => {
  Button.propTypes = {
    children: Proptypes.node,
    onClick: Proptypes.func,
    cls: Proptypes.string,
  };

  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${cls}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ProductList = ({ setCartList }) => {
  ProductList.propTypes = {
    setCartList: Proptypes.func,
    setProducts: Proptypes.func,
  };

  const { products, cartList } = useContext(ShoppingCartContext);

  const handleAddtoCart = (product) => {
    const existItem = cartList.find((item) => item.name === product.name);
    if (existItem) {
      const res = cartList.filter((item) => item.name !== product.name);
      existItem.count++;
      setCartList([...res, existItem]);
    } else {
      const obj = {
        ...product,
        count: 1,
      };
      setCartList([...cartList, obj]);
    }
  };

  return (
    <div className="min-w-[500px] p-5 bg-white rounded-2xl">
      <h2 className="text-blue-600 font-bold text-2xl">Product List</h2>

      <div className="flex flex-col gap-2">
        {products.map((item) => (
          <div
            key={item.name}
            className="flex justify-between bg-blue-100 items-center p-4 rounded-xl"
          >
            <span>{item.name}</span>
            <span>{item.price}</span>
            <Button
              onClick={() => {
                handleAddtoCart(item);
              }}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShoppingCart = ({ setCartList }) => {
  ShoppingCart.propTypes = {
    setCartList: Proptypes.func,
    setProducts: Proptypes.func,
  };

  const { cartList } = useContext(ShoppingCartContext);

  const handleRemove = (product) => {
    const newCart = cartList.filter((item) => item.name !== product.name);
    setCartList(newCart);
  };

  const handleNumberChange = (type, product) => {
    let res = [];
    if (type === "add") {
      res = cartList.map((item) => {
        if (item.name === product.name) {
          item.count++;
        }
        return item;
      });
    } else if (product.count <= 1) {
      return;
    } else {
      res = cartList.map((item) => {
        if (item.name === product.name) {
          item.count--;
        }
        return item;
      });
    }
    setCartList(res);
  };

  const handleCearCart = () => {
    setCartList([]);
  };

  return (
    <div className="min-w-[500px] p-5 bg-white rounded-2xl">
      <h2 className="text-blue-600 font-bold text-2xl">Shopping Cart</h2>

      <div className="flex flex-col gap-2">
        {cartList.map((item) => (
          <div
            key={item.name}
            className="flex justify-between bg-blue-100 items-center p-4 rounded-xl"
          >
            <span>{item.name}</span>
            <span>{item.name}</span>
            <span>
              {item.price} (Quantity: {item.count})
            </span>
            <Button
              onClick={() => {
                handleNumberChange("add", item);
              }}
            >
              +
            </Button>
            <Button
              onClick={() => {
                handleNumberChange("minus", item);
              }}
            >
              -
            </Button>
            <Button
              onClick={() => {
                handleRemove(item);
              }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {cartList.length > 0 && (
        <div className="mt-4">
          <Button cls="bg-red-500 hover:bg-red-600" onClick={handleCearCart}>
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
};

function ShoppingCartPage() {
  const [products, setProducts] = useState(DefaultProducts);
  const [cartList, setCartList] = useState([]);
  const shoppingCart = useContext(ShoppingCartContext);
  const value = { ...shoppingCart, products, cartList };

  return (
    <ShoppingCartContext.Provider value={value}>
      <div className=" flex gap-4 bg-gradient-to-r from-purple-100 to-green-300 p-10">
        <ProductList setCartList={setCartList} setProducts={setProducts} />
        <ShoppingCart setCartList={setCartList} setProducts={setProducts} />
      </div>
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartPage;
