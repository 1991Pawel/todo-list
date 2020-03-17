import React, {  useContext } from "react";
import AppContext from "../../context";

import styles from './TaskCounter.module.scss';





const TaskCounter = () => {
    const { tasks } = useContext(AppContext);

    const doneTaskCounter = () => {
        const doneTasks = tasks.filter((task) => task.isDone)
        return doneTasks.length
    }
    const taskCounter = () => {
        return tasks.length;
    }



    return ( 
        
       
        <div className={styles.wrapper}>
            <div className={styles.counterbox}>
            <div className={styles.number}>{taskCounter()}</div>
            <div className={styles.desc}> Create Task</div>
            </div>

            <div className={styles.counterbox}>
            <div className={styles.number}>{doneTaskCounter()}</div>
            <div className={styles.desc}> Completed Task</div>
            </div>
        </div>

        
     );
}
 
export default TaskCounter;