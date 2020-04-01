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

  function handleClickOutside(e) {
    if (isEditing && editingTitle.trim()) {
      editTaskFn({
        title: editingTitle,
        id,
        isDone
      });
    }

    if (e.target.parentNode !== document.activeElement) {
      setIsEditing(false);
    }
    console.log(e.target);
    console.log(document.activeElement);
  }

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  });

  const editInputHandler = e => {
    setEditingTitle(e.target.value);
  };

  const keyUpHandler = e => {
    if (e.key === "Enter" && editingTitle.trim()) {
      editTaskFn({
        title: editingTitle,
        id,
        isDone
      });
      setIsEditing(false);
    }
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
          required
          maxLength="100"
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
