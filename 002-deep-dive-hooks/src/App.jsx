import { useState } from "react";
import "./App.css";
import Proptypes from "prop-types";
import Header from "./layout/Header";

const menus = [
  { key: "home", label: "Home", path: "/" },
  {
    key: "product",
    label: "Product",
    path: "/product",
    children: [
      { key: "course", label: "Course", path: "/course" },
      { key: "plan", label: "Plan", path: "/plan" },
      { key: "paths", label: "Paths", path: "/paths" },
    ],
  },
  {
    key: "about",
    label: "About",
    path: "/about",
    children: [
      { key: "history", label: "History", path: "/history" },
      { key: "team", label: "Team", path: "/team" },
    ],
  },
  { key: "secure", label: "Secure", path: "/secure", disabled: true },
];

function App() {
  const [curRoute, setCurRoute] = useState("Home");

  const handleNavigate = (item) => {
    console.log(item);
    setCurRoute(item.key);
    // window.location.href = item.path;
  };

  const Counter = ({ value, onAddClick }) => {
    Counter.propTypes = {
      value: Proptypes.number,
      onAddClick: Proptypes.func,
    };
    return (
      <>
        <p>current value {value}</p>
        <button onClick={onAddClick}>Add</button>
      </>
    );
  };

  const AboutCounter = () => {
    const [value, setValue] = useState(0);
    const handleAddClick = () => {
      setValue(value + 1);
    };
    return (
      <>
        <h1>This is Page About</h1>
        <Counter value={value} onAddClick={handleAddClick} />
      </>
    );
  };
  const HomeCounter = () => {
    const [value, setValue] = useState(0);
    const handleAddClick = () => {
      setValue(value + 1);
    };
    return (
      <>
        <h1>This is Page Home</h1>
        <Counter value={value} onAddClick={handleAddClick} />
      </>
    );
  };

  return (
    <>
      <div className="bg-blue-200 p-10">
        <Header items={menus} menuClick={handleNavigate} selected={curRoute} />

        {curRoute === "home" ? <HomeCounter /> : false}
        {curRoute === "about" ? <AboutCounter /> : false}
      </div>
    </>
  );
}

export default App;
