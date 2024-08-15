import { useMemo, useState } from "react";

const fruits = [
  "apple",
  "banana",
  "blackberries",
  "blueberries",
  "strawberry",
  "pineapple",
];

function FruitSearchApp() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  // each type in input, this will run again.
  // const matched = fruits.filter((item) => {
  //   console.log("do filter");
  //   return item.includes(query);
  // });
  const matched = useMemo(() => {
    console.log("do filter");

    return fruits.filter((item) => item.includes(query));
  }, [query]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    setQuery(text);
  };

  return (
    <>
      <input type="text" onChange={handleChange} />
      <button onClick={handleSubmit}>Query</button>
      <hr />
      {matched.join(",")}
    </>
  );
}

export default FruitSearchApp;
