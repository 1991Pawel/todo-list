import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "./Task.module.scss";
import deleteImg from "../../assets/images/bin.svg";
import editImg from "../../assets/images/edit.svg";
import tick from "../../assets/images/tick.svg";
import AppContext from "../../context";

const Task = ({ id, title, isDone }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);
  const { doneTaskFn, editTaskFn, removeTaskFn } = useContext(AppContext);
  const taskInputRef = useRef();

  function handleClickOutside(event) {
    if (taskInputRef.current && !taskInputRef.current.contains(event.target)) {
      setIsEditing(false);
      editTaskFn({
        title: editingTitle,
        id,
        isDone
      });
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const editInputHandler = e => setEditingTitle(e.target.value);

  const keyUpHandler = e => {
    if (e.key === "Enter") {
      editTaskFn({
        title: editingTitle,
        id,
        isDone
      });
      setIsEditing(false);
    }
    console.log(editingTitle);
  };

  return (
    <li id={id} className={isDone ? styles.wrapper__done : styles.wrapper}>
      {!isEditing && (
        <button onClick={() => doneTaskFn(id)} className={styles.button__check}>
          <img src={tick} alt="delete-icon" />
        </button>
      )}
      {isEditing ? (
        <input
          ref={taskInputRef}
          onKeyUp={keyUpHandler}
          onChange={editInputHandler}
          value={editingTitle}
          className={styles.edit}
          autoFocus
        />
      ) : (
        <span className={styles.title}>{title}</span>
      )}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={styles.button}
      >
        <img src={editImg} alt="edit-icon" />
      </button>
      {!isEditing && (
        <button onClick={() => removeTaskFn(id)} className={styles.button}>
          <img src={deleteImg} alt="delete-icon" />
        </button>
      )}
    </li>
  );
};

export default Task;
