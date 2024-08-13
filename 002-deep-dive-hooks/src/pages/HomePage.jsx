import { useState } from "react";
import Proptypes from "prop-types";
function HomePage({ curRoute }) {
  HomePage.propTypes = {
    curRoute: Proptypes.string,
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

  return <>{curRoute === "home" ? <HomeCounter /> : <AboutCounter />}</>;
}
export default HomePage;
