import { useMemo, useState } from "react";
// import { debounce } from "lodash";
import { useDebounce } from "./utils/useDebounce";

const fruits = [
  "apple",
  "banana",
  "blackberries",
  "blueberries",
  "strawberry",
  "pineapple",
];

// const customDebounce = (fn, time) => {
//   let timer;

//   return (...args) => {
//     clearTimeout(timer);
//     setTimeout(() => {
//       fn.apply(this, args);
//     }, time);
//   };
// };

function FruitSearchApp() {
  const [text, setText] = useState("");
  // const [query, setQuery] = useState("");
  const query = useDebounce(text, 300);

  // each type in input, this will run again.
  // const matched = fruits.filter((item) => {
  //   console.log("do filter");
  //   return item.includes(query);
  // });
  const matched = useMemo(() => {
    console.log("do filter");

    return fruits.filter((item) => item.includes(query));
  }, [query]);

  // const callInDebounce = debounce((t) => {
  //   setQuery(t);
  // }, 300);

  // const callInDebounce = useMemo(() => {
  //   return customDebounce((t) => {
  //     // return debounce((t) => {
  //     setQuery(t);
  //   }, 300);
  // }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    // callInDebounce(value);
  };

  return (
    <>
      <input type="text" value={text} onChange={handleChange} />
      <hr />
      {matched.join(",")}
    </>
  );
}

export default FruitSearchApp;
