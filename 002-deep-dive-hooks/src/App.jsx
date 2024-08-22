import { useState } from "react";
import "./App.css";
import Header, { SearchNav } from "./layout/Header";
import Avatar from "./layout/Avatar";
import Tooltip from "./layout/Tooltip";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import TodoApp from "./pages/TodoApp";
import FruitSearchApp from "./pages/FruitSearchApp";
import TaskApp from "./pages/TaskApp";
import TablePage from "./pages/table-page/TablePage";
import ShoppingCartPage from "./pages/shopping-cart/ShoppingCartPage";

const MENUS_DATA = [
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
  const [menus, setMenus] = useState(MENUS_DATA);
  const [curRoute, setCurRoute] = useState("Home");

  const handleNavigate = (item) => {
    console.log(item);
    setCurRoute(item.key);
    // window.location.href = item.path;
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setMenus(MENUS_DATA);
      return;
    }
    const filters = MENUS_DATA.filter((item) =>
      item.key.includes(value.toLowerCase())
    );
    setMenus(filters);
  };
  return (
    <Router>
      <div className="bg-blue-200 p-10">
        <SearchNav onSearchChange={handleSearchChange}>
          <Header
            items={menus}
            menuClick={handleNavigate}
            selected={curRoute}
          />
          <Tooltip tooltip={<div>This is a tooltip</div>}>
            <Avatar username={"Admin"} />
          </Tooltip>
        </SearchNav>
      </div>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/todo">TODO App</Link>
        <Link to="/search-fruit">search fruit</Link>
        <Link to="/task">Task App</Link>
        <Link to="/table">Table</Link>
        <Link to="/shopping-cart">Shopping Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage curRoute={curRoute} />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/search-fruit" element={<FruitSearchApp />} />
        <Route path="/task" element={<TaskApp />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
