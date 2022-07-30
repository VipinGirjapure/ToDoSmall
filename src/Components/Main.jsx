import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Todo";

const Main = () => {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem("Tasks"));
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState(dataFromLocalStorage);
  const handleInput = (event) => {
    setTodo(event.target.value);
    // console.log(todo)
  };
  const addTodo = () => {
    if (todo !== "") {
      setAllTodos([...allTodos, todo]);
    }
    setTodo("");
  };

  const deleteTodo = (id) => {
    const filteredItems = allTodos.filter((todoItem, index) => {
      return index !== id;
    });
    setAllTodos(filteredItems);
  };

  const updateTodo = (id) => {
    const filteredItems = allTodos.filter((todoItem, index) => {
      return index === id;
    });
    setTodo(filteredItems);
    deleteTodo(id);
  };
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(allTodos));
  }, [allTodos]);

  return (
    <>
      {" "}
      <div className="container mt-4">
        <h1 className="text-success mb-4"> TO DO LIST APP</h1>
        <input
          type="text"
          name="add-todo"
          className="shadow-none text-capitalize text-center mt-2"
          placeholder="Enter New task"
          value={todo}
          onChange={handleInput}
        />

        <button className="btn btn-warning ms-2" onClick={addTodo}>
          Add
        </button>
        <ul className="list-group">
          {allTodos.map((todoItem, index) => {
            return (
              <Todo
                todoItem={todoItem}
                key={index}
                id={index}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Main;
