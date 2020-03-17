import React from 'react';
import AppContext from '../../context';
import Task from './Task'


const TasksList = () => (
  
    <AppContext.Consumer>
      {({tasks}) => 
      (
        <ul >
          {tasks.map((task) => <Task  key={task.id} {...task}/>)}
        </ul>
      )
      }
    </AppContext.Consumer>

    

)
    
export default TasksList;
