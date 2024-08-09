import "./App.css";
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
  const handleNavigate = (item) => {
    window.location.href = item.path;
  };
  return (
    <>
      <Header items={menus} menuClick={handleNavigate} />
    </>
  );
}

export default App;
