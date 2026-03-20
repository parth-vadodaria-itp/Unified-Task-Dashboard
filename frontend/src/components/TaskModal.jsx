import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addTask, updateTask } from '../services/taskService.js'
import { fetchAllPriorities } from '../services/priorityService.js'
import { fetchAllCategories } from '../services/categoryService.js'

const TaskModal = ({
    editTask = null,
    setEditTask,
    setIsTaskModalOpen = [],
}) => {
    const [priorityOptions, setPriorityOptions] = useState([])
    const [taskCategories, setTaskCategories] = useState([])

    const [taskPriority, setTaskPriority] = useState(
        editTask === null ? '' : editTask.priority.title
    )
    const [selectedDateTime, setSelectedDateTime] = useState(
        editTask === null || editTask.dueDate === null
            ? null
            : new Date(editTask.dueDate)
    )
    const [taskCategory, setTaskCategory] = useState(
        editTask === null ? '' : editTask.category.title
    )

    const onTaskSubmission = (e) => {
        e.preventDefault()

        const title = document.getElementById('title').value
        const priority = priorityOptions.find(
            (option) => taskPriority === option.title
        )
        const category = taskCategories.find(
            (category) => taskCategory === category.title
        )
        const dueDate = selectedDateTime

        if (editTask !== null) {
            const updatedTask = { title, priority, category, dueDate }
            updateTask(editTask.id, updatedTask)
        } else {
            addTask(title, priority, category, dueDate)
            setEditTask(null)
        }
        setIsTaskModalOpen(false)
    }

    useEffect(() => {
        fetchAllPriorities().then((priorities) => {
            setPriorityOptions(priorities);
            setTaskPriority(priorities[0].title);
        })
        fetchAllCategories().then(setTaskCategories)
    }, [])

    return (
        <section className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)] flex">
            <form
                className="relative m-auto w-4/5 md:w-3/5 h-fit p-4 md:p-6 rounded-xl bg-white text-txtprimary font-medium grid gap-4"
                onSubmit={onTaskSubmission}
            >
                <header className="flex justify-between text-lg md:text-xl text-black">
                    <div>
                        {editTask === null ? 'Add New Task' : 'Edit Task'}
                    </div>
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => {
                            setEditTask(null)
                            setIsTaskModalOpen(false)
                        }}
                    >
                        <i className="ri-close-large-line"></i>
                    </div>
                </header>
                <div className="grid gap-1">
                    <label htmlFor="title">Task Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        className="bg-primary p-3 md:p-4 rounded-lg md:rounded-xl focus:outline-green"
                        name="title"
                        id="title"
                        defaultValue={editTask === null ? '' : editTask.title}
                        required
                    />
                </div>
                <div className="grid gap-1">
                    <label>Priority <span className="text-red-500">*</span></label>
                    <div className="flex gap-1.5 md:gap-2">
                        {priorityOptions.map((option) => (
                            <div
                                key={option.id}
                                aria-label={option.title}
                                onClick={() => setTaskPriority(option.title)}
                                className={`w-full p-3 md:p-4 rounded-lg md:rounded-xl text-center
                                        ${
                                            taskPriority === option.title
                                                ? `bg-${option.color} text-white`
                                                : 'bg-primary'
                                        }`}
                            >
                                {option.title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid gap-1">
                    <label htmlFor="category">Category <span className="text-red-500">*</span></label>
                    <select
                        className="bg-primary p-3 md:p-4 rounded-lg md:rounded-xl focus:outline-green"
                        name="category"
                        id="category"
                        value={taskCategory}
                        onChange={(e) => setTaskCategory(e.target.value)}
                        required
                    >
                        <option value="" className="max-md:text-sm">
                            Choose Category
                        </option>
                        {taskCategories.map((category) => (
                            <option
                                key={category.id}
                                value={category.title}
                                className="max-md:text-sm"
                            >
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-1">
                    <label>Due Date (Optional)</label>
                    <DatePicker
                        selected={selectedDateTime}
                        onChange={setSelectedDateTime}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        className="w-full bg-primary p-3 md:p-4 rounded-lg md:rounded-xl focus:outline-green"
                        popperPlacement="top-start"
                        placeholderText="Select due date"
                    />
                </div>
                <button
                    type="submit"
                    className="p-3 md:p-4 rounded-lg md:rounded-xl bg-green hover:bg-hovergreen font-semibold text-white text-lg"
                >
                    {editTask === null ? 'Add Task' : 'Save Changes'}
                </button>
            </form>
        </section>
    )
}

export default TaskModal
