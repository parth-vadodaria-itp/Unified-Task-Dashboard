import { db } from '../database/db.js'

const addTask = async (title, priority, category, dueDate) => {
    await db.tasks.add({
        title,
        priority,
        category,
        dueDate,
        isCompleted: false,
        createdAt: new Date(),
    })
}

const updateTask = async (id, updatedTask) => {
    await db.tasks.update(id, updatedTask)
}

const deleteTask = async (id) => {
    await db.tasks.delete(id)
}

const toggleTaskStatus = async (id) => {
    const task = await db.tasks.get(id)
    await db.tasks.update(id, { isCompleted: !task.isCompleted })
}

const fetchAllTasks = async () => {
    const tasks = await db.tasks.toArray()
    return tasks
}

export { addTask, updateTask, deleteTask, toggleTaskStatus, fetchAllTasks }
