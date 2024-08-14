import { useEffect, useState } from "react";
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    let localTodos = localStorage.getItem("todos");

    if (localTodos) {
      localTodos = JSON.parse(localTodos);
      setTodos(localTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo({ label: "", checked: false });
  };
  const toggleTodo = (todo) => {
    console.log(todo);
    setTodos(
      todos.map((item) => {
        if (item.label === todo.label) {
          item.checked = !item.checked;
        }
        return item;
      })
    );
  };
  const deleteTodo = (todo) => {
    const res = todos.filter((item) => item.label != todo.label);
    setTodos(res);
  };

  return (
    <div className="max-w-xl p-8 bg-blue-300">
      <h1 className="text-center font-bold text-2xl">TODO List</h1>
      <div className="mt-5 text-center rounded-full overflow-hidden flex bg-blue-400">
        <input
          className="flex-1 rounded-l-full py-2 px-4"
          type="text"
          value={newTodo.label}
          onChange={(e) => {
            const val = {
              label: e.target.value,
              checked: false,
            };
            setNewTodo(val);
          }}
        />
        <button className="px-4 py-2" onClick={addTodo}>
          Add TODO
        </button>
      </div>

      <div className="flex flex-col mt-4 gap-2">
        {todos.map((todo) => (
          <div
            className="flex items-center justify-between border-b-2 border-b-indigo-100"
            key={todo.label}
          >
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => {
                  toggleTodo(todo);
                }}
              />
              <span>{todo.label}</span>
            </div>
            <button
              className="bg-blue-400 py-1 px-2 rounded-full"
              onClick={() => {
                deleteTodo(todo);
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
