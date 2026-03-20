import { db } from '../database/db'

const fetchAllPriorities = async () => {
    const priorities = await db.priorities.toArray()
    return priorities
}

export { fetchAllPriorities }
