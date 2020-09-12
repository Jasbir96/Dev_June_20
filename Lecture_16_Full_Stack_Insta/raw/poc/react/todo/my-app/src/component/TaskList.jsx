// imr
// sfc
import React from 'react';
const TaskList = (props) => {
    let { tasksfApp, handleTask } = props;
    return (
        <React.Fragment>
            {/* tasklist */}
            <div className="container">
                {tasksfApp.map((task) => {
                    return (< div key={task.id} >
                        <p className="d-inline mr-4">  {task.name}</p>
                        <button className="btn btn-danger"
                            onClick={() => { handleTask(task.id) }}
                        >x</button>
                    </div>)
                })}
            </div>
        </React.Fragment>
    );
}

export default TaskList;