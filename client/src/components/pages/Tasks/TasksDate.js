import React from 'react';
import TaskNav from './sub/TasksNav'

export default function TasksDate() {
    return (
        <div className="tasks">
            <div className="tasksHeader" >
                <h1 className="PageHeaderText">Tasks By Date</h1>
                <TaskNav active="Date"/>
            </div>

        </div>
    )
}
