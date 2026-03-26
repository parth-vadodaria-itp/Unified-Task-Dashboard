import { deleteTask, toggleTaskStatus } from '../services/taskService.js'

const TaskList = ({ taskList, setIsTaskModalOpen, setEditTask }) => {
    const onCheckboxClick = (taskId) => toggleTaskStatus(taskId)

    const onDeleteClick = (taskId) => deleteTask(taskId)

    const onEditClick = (task) => {
        setEditTask(task)
        setIsTaskModalOpen(true)
    }

    return (
        <>
            {taskList.map((task) => (
                <label key={task.id} className="hover:cursor-pointer">
                    <section className="px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-xl bg-items flex justify-between items-center">
                        <div className="w-9/10 flex gap-2 text-base font-normal">
                            <input
                                type="checkbox"
                                className="peer hover:cursor-pointer"
                                onChange={() => onCheckboxClick(task.id)}
                                checked={task.isCompleted}
                            />
                            <div className="peer-checked:line-through max-md:text-sm">
                                <div>{task.title}</div>
                                {!task.dueDate || (
                                    <div className="text-xs">
                                        Due:{' '}
                                        {new Date(
                                            task.dueDate
                                        ).toLocaleString()}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-1 md:gap-4 text-sm md:text-xl text-border">
                            <div
                                className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs font-medium text-white`}
                                style={{ backgroundColor: task.category.color }}
                            >
                                {task.category.title}
                            </div>
                            <div
                                className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs font-medium text-white bg-${task.priority.color}`}
                            >
                                {task.priority.title}
                            </div>
                            <button
                                aria-label="edit"
                                onClick={() => onEditClick(task)}
                            >
                                {!task.isCompleted && (
                                    <i className="ri-pencil-line p-0.5 rounded-lg hover:bg-yellow hover:text-white" />
                                )}
                            </button>
                            <button
                                aria-label="delete"
                                onClick={() => onDeleteClick(task.id)}
                            >
                                <i className="ri-delete-bin-line p-0.5 rounded-lg hover:bg-red hover:text-white" />
                            </button>
                        </div>
                    </section>
                </label>
            ))}
        </>
    )
}

export default TaskList
