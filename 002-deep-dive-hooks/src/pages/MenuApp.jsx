import { useEffect, useRef, useState } from "react";

function MenuApp() {
  const [menuOpen, setMenuOpen] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const listen = (e) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", listen);

    return () => {
      window.removeEventListener("mousedown", listen);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        Toggle Menu
      </button>

      {menuOpen && (
        <div ref={ref}>
          <ul>
            <li>Menu 1</li>
            <li>Menu 2</li>
            <li>Menu 3</li>
            <li>Menu 4</li>
            <li>Menu 5</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default MenuApp;
