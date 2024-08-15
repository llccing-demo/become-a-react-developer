import { useState, useMemo } from "react";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const [allCount, completedCount, incompletedCount] = useMemo(() => {
    const all = tasks.length;
    const comp = tasks.filter((item) => item.checked).length;
    return [all, comp, all - comp];
  }, [tasks]);

  const handleAddTask = () => {
    const obj = {
      text,
      checked: false,
    };
    setTasks([...tasks, obj]);
  };

  const handleChecked = (task) => {
    const newVal = tasks.map((item) => {
      if (item.text === task.text) {
        item.checked = !item.checked;
      }
      return item;
    });

    setTasks(newVal);
  };

  const handleFilter = (type) => {
    if (type === "all") {
      return tasks;
    } else if (type === "completed") {
      return tasks.filter((item) => item.checked);
    } else {
      return tasks.filter((item) => !item.checked);
    }
  };

  return (
    // bg
    <div className="bg-gradient-to-r from-purple-100 to-green-300 p-10">
      <div className="bg-blue-200 max-w-screen-sm m-auto p-5">
        <h1 className="text-blue-500 font-bold text-2xl text-center">
          Task Manager
        </h1>

        <div className="flex flex-col">
          <p>New Task</p>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button onClick={handleAddTask}>Add Task</button>

          <div className="flex gap-2">
            <button
              onClick={() => {
                handleFilter("all");
              }}
            >
              All
            </button>
            <button
              onClick={() => {
                handleFilter("completed");
              }}
            >
              Completed
            </button>
            <button
              onClick={() => {
                handleFilter("incompleted");
              }}
            >
              Incompleted
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <div key={task.text}>
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => {
                    handleChecked(task);
                  }}
                />
                <span>{task.text}</span>
                <button>delete</button>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <div>Total Tasks: {allCount}</div>
            <div>Completed Tasks: {completedCount}</div>
            <div>Incompleted Tasks: {incompletedCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskApp;
