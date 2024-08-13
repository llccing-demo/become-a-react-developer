import { useState } from "react";
import Proptypes from "prop-types";

function Tooltip({ children, tooltip }) {
  Tooltip.propTypes = {
    children: Proptypes.node,
    tooltip: Proptypes.node,
  };

  const [enter, setEnter] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => {
          setEnter(true);
        }}
        onMouseLeave={() => {
          setEnter(false);
        }}
      >
        {children}

        {enter && <div className="">{tooltip}</div>}
      </div>
    </>
  );
}

export default Tooltip;
