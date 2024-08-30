import { createContext, useState, useMemo, useContext } from "react";

const ColorContext = createContext();

const useColorPalette = () => {
  const [colors, setColors] = useState(["#ff5733", "#33ff57", "#5733ff"]);
  const [selectedColor, setSelectedColor] = useState(null);

  const addColor = (color) => {
    setColors([...colors, color]);
  };

  const removeColor = (index) => {
    colors.splice(index, 1);
    setColors([...colors]);
  };

  const selectColor = (index) => {
    const choose = colors[index];
    setSelectedColor(choose);
  };

  const contextValue = useMemo(
    () => ({
      colors,
      selectedColor,
      addColor,
      removeColor,
      selectColor,
    }),
    [colors, selectedColor]
  );

  return contextValue;
};

const ColorPalette = () => {
  const { colors, selectedColor, selectColor, removeColor } =
    useContext(ColorContext);

  return (
    <div className="flex gap-4 flex-wrap">
      {/* mapping over colors to render color boxes. */}
      {colors.map((color, index) => (
        <div
          className={`p-4 relative w-[150px] h-[150px] rounded-md`}
          style={{
            backgroundColor: color,
            transform: selectedColor == color ? "scale(1.08)" : "none",
            transition: "all 200ms",
          }}
          key={index}
          onClick={() => selectColor(index)}
        >
          <div className="absolute bottom-0 right-0">
            <button
              className="bg-white px-2 py-1 rounded-md rounded-tr-none rounded-bl-none"
              onClick={() => removeColor(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// is a control to add new color to the palette.
const ColorControls = () => {
  const { addColor } = useContext(ColorContext);
  const HandleAddColor = () => {
    const randomColor = getRandomColor();
    addColor(randomColor);
  };

  return (
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
      onClick={HandleAddColor}
    >
      Add Color
    </button>
  );
};

export const ColorPaletteApp = () => {
  const value = useColorPalette();

  return (
    <div className="flex flex-col items-center mt-5">
      <ColorContext.Provider value={value}>
        <ColorPalette />
        <ColorControls />
      </ColorContext.Provider>
    </div>
  );
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
