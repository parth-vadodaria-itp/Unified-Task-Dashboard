import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import TaskModal from './TaskModal'
import TaskList from './TaskList'
import { fetchAllTasks } from '../services/taskService.js'

const Tasks = () => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const [editTask, setEditTask] = useState(null)

    const taskList = useLiveQuery(fetchAllTasks)

    return (
        <>
            <section
                id="task-component"
                className="p-3 md:p-4 bg-section rounded-xl md:rounded-2xl shadow-[6px_6px_100px_rgba(0,0,0,0.1)]"
            >
                <header className="flex justify-between items-center">
                    <div className="text-xl md:text-2xl font-semibold">
                        <i className="ri-task-line text-green" />
                        <span> Tasks</span>
                    </div>
                    <button
                        className="p-2 md:p-3 rounded-lg md:rounded-xl bg-green hover:bg-hovergreen font-semibold text-white text-sm md:text-lg"
                        onClick={() => setIsTaskModalOpen(true)}
                    >
                        + Add Task
                    </button>
                </header>
                <main className="mt-8 grid gap-4">
                    <TaskList
                        taskList={!taskList ? [] : taskList}
                        setIsTaskModalOpen={setIsTaskModalOpen}
                        setEditTask={setEditTask}
                    />
                </main>
            </section>

            {isTaskModalOpen && (
                <TaskModal
                    editTask={editTask}
                    setEditTask={setEditTask}
                    setIsTaskModalOpen={setIsTaskModalOpen}
                />
            )}
        </>
    )
}

export default Tasks
