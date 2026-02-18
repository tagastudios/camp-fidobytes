import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

function TodoItem({ isDone, title, todoID }) {
  const [isTodoItemDone, setTodoItemDone] = useState(isDone);
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleChanges = (event) => {
    if (event.currentTarget.type === "checkbox") {
      setTodoItemDone(!isTodoItemDone);
      firestore
        .collection("users")
        .doc(uid)
        .collection("todos")
        .doc(todoID)
        .update({
          isDone: !isTodoItemDone,
        });
    }
  };

  return (
    <div
      style={{
        textDecoration: isTodoItemDone && "line-through",
        opacity: isTodoItemDone ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        name=""
        id=""
        onChange={handleChanges}
        checked={isTodoItemDone}
      />
      {title}
    </div>
  );
}

export default TodoItem;
