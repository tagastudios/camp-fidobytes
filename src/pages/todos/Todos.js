import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import AddTodo from "../../components/addTodo/AddTodo";
import TodoItem from "../../components/todoItem/TodoItem";

function Todos() {
  const { displayName, uid } = useSelector((state) => state.firebase.auth);

  console.log(useSelector((state) => state.firebase));

  useFirestoreConnect({
    collection: `users/${uid}/todos`,
    storeAs: "todos",
  });

  const todos = useSelector((state) => state.firestore.data.todos);
  console.log(todos);

  return (
    <div>
      <h1>Hello {displayName}</h1>
      <h2>Todos</h2>
      <AddTodo />
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        {todos &&
          Object.values(todos).map((todo) => (
            <li key={`L${todo.todoID}`}>
              <TodoItem
                title={todo.title}
                isDone={todo.isDone}
                todoID={todo.todoID}
                key={todo.todoID}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Todos;
