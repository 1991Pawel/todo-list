import React from "react";
import AppContext from "../../context";
import uuid from "react-uuid";
import styles from "./Root.module.scss";
import Form from "../Form/Form";
import TaskList from "../TasksList/TasksList";
import TaskCounter from "../TaskCounter/TaskCounter";
import DataPanel from "../DatePanel/DatePanel";

class Root extends React.Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    if(localStorageTasks){
      this.setState({
        tasks: localStorageTasks,
      })
    }else {
      this.setState({
        tasks:[],
      })
    }
  }

  componentDidUpdate(){
    const tasks = JSON.stringify(this.state.tasks);
    localStorage.setItem('tasks', tasks);
  }


  // remove Task
  removeTaskHandler = id => {
    const { tasks } = this.state;
    const filterTasks = tasks.filter(item => item.id !== id);
    this.setState({
      tasks: filterTasks
    });
  };

  // mark Done Task
  doneTaskHandler = id => {
    const { tasks } = this.state;
    const filterTasks = tasks.map(item => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }

      return item;
    });

    this.setState({
      tasks: filterTasks
    });
  };

  editTaskHandler = editedTask => {
    const newTasks = this.state.tasks.map(task => {
      if (task.id === editedTask.id) return editedTask;
      else return task;
    });

    this.setState({
      tasks: newTasks
    });
  };

  //  Add Task
  addTaskHandler = task => {
    const newItem = {
      title: task,
      id: uuid(),
      isDone: false
    };

    this.setState(prevState => ({
      tasks: [...prevState.tasks, newItem]
    }));
 
  };

  render() {
    const contextElements = {
      ...this.state,
      removeTaskFn: this.removeTaskHandler,
      editTaskFn: this.editTaskHandler,
      doneTaskFn: this.doneTaskHandler,
      addTaskFn: this.addTaskHandler
    };
    return (
      <AppContext.Provider value={contextElements}>
        <div className={styles.wrapper}>
          <DataPanel />
          <TaskCounter />
          <Form />
          <TaskList />
        </div>
      </AppContext.Provider>
    );
  }
}

export default Root;
